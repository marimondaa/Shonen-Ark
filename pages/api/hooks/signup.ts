import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import { supabase } from '../../../lib/supabase.js';

/**
 * User Signup Webhook Handler
 * Validates HMAC signature and forwards to n8n workflow
 * Triggered when new users register via NextAuth
 */

interface SignupPayload {
  userId: string;
  email: string;
  name: string;
  provider: string;
  timestamp: string;
  metadata?: {
    accountType?: 'fan' | 'creator';
    referralCode?: string;
    source?: string;
  };
}

/**
 * Verify HMAC signature for webhook security
 */
function verifySignature(payload: string, signature: string, secret: string): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload, 'utf8')
    .digest('hex');
  
  const providedSignature = signature.replace('sha256=', '');
  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature, 'hex'),
    Buffer.from(providedSignature, 'hex')
  );
}

/**
 * Forward signup data to n8n workflow
 */
async function forwardToN8N(payload: SignupPayload): Promise<boolean> {
  try {
    const response = await fetch(process.env.N8N_SIGNUP_WEBHOOK_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.N8N_API_KEY}`,
        'X-Source': 'shonen-ark-api'
      },
      body: JSON.stringify({
        event: 'user.signup',
        data: payload,
        timestamp: new Date().toISOString()
      })
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to forward to n8n:', error);
    return false;
  }
}

/**
 * Log signup event for analytics
 */
async function logSignupEvent(payload: SignupPayload) {
  try {
    await supabase
      .from('user_activity')
      .insert({
        user_id: payload.userId,
        activity_type: 'signup',
        metadata: {
          provider: payload.provider,
          source: payload.metadata?.source || 'direct',
          timestamp: payload.timestamp
        }
      });
  } catch (error) {
    console.error('Failed to log signup event:', error);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only POST requests are accepted' 
    });
  }

  try {
    // Get raw body for signature verification
    const rawBody = JSON.stringify(req.body);
    const signature = req.headers['x-signature'] as string;
    
    if (!signature) {
      return res.status(401).json({ 
        error: 'Missing signature',
        message: 'X-Signature header is required' 
      });
    }

    // Verify webhook signature
    const webhookSecret = process.env.WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('WEBHOOK_SECRET not configured');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    if (!verifySignature(rawBody, signature, webhookSecret)) {
      return res.status(401).json({ 
        error: 'Invalid signature',
        message: 'Webhook signature verification failed' 
      });
    }

    // Parse and validate payload
    const payload: SignupPayload = req.body;
    
    // Basic validation
    if (!payload.userId || !payload.email || !payload.name) {
      return res.status(400).json({ 
        error: 'Invalid payload',
        message: 'userId, email, and name are required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email)) {
      return res.status(400).json({ 
        error: 'Invalid email format',
        message: 'Please provide a valid email address' 
      });
    }

    // Log the signup event
    await logSignupEvent(payload);

    // Forward to n8n workflow
    const n8nSuccess = await forwardToN8N(payload);
    
    if (!n8nSuccess) {
      // Log error but don't fail the request
      console.error('n8n forwarding failed, but signup will continue');
    }

    // Update user record with signup completion
    const { error: updateError } = await supabase
      .from('users')
      .update({ 
        signup_completed_at: new Date().toISOString(),
        last_activity_at: new Date().toISOString()
      })
      .eq('id', payload.userId);

    if (updateError) {
      console.error('Failed to update user record:', updateError);
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Signup processed successfully',
      data: {
        userId: payload.userId,
        n8nForwarded: n8nSuccess,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Signup webhook error:', error);
    
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to process signup webhook',
      ...(process.env.NODE_ENV === 'development' && { 
        details: error instanceof Error ? error.message : 'Unknown error' 
      })
    });
  }
}
