import { NextApiRequest, NextApiResponse } from 'next';
import { validateIncomingWebhook, forwardToN8nWorkflow } from '../../../src/lib/webhook';

export interface UserSignupPayload {
  userId: string;
  email: string;
  username: string;
  accountType: 'fan' | 'creator';
  timestamp: number;
  source: 'web' | 'mobile';
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get raw payload as string for signature validation
    const rawPayload = JSON.stringify(req.body);
    
    // Validate webhook signature
    const validation = validateIncomingWebhook(rawPayload, req.headers);
    if (!validation.valid) {
      console.warn('User signup webhook validation failed:', validation.error);
      return res.status(401).json({ error: 'Invalid webhook signature' });
    }

    const payload: UserSignupPayload = req.body;

    // Basic payload validation
    if (!payload.userId || !payload.email || !payload.username) {
      return res.status(400).json({ 
        error: 'Missing required fields: userId, email, username' 
      });
    }

    // Log the signup event
    console.log('User signup webhook received:', {
      userId: payload.userId,
      email: payload.email,
      accountType: payload.accountType,
      source: payload.source
    });

    // Construct n8n webhook URL
    const n8nBaseUrl = process.env.N8N_URL;
    if (!n8nBaseUrl) {
      throw new Error('N8N_URL environment variable not set');
    }

    const workflowUrl = `${n8nBaseUrl}/webhook/user-signup`;

    // Forward to n8n workflow
    const n8nResult = await forwardToN8nWorkflow(workflowUrl, {
      ...payload,
      webhookSource: 'shonen-ark-api',
      processedAt: new Date().toISOString()
    });

    if (!n8nResult.success) {
      console.error('Failed to forward to n8n:', n8nResult.error);
      return res.status(500).json({ 
        error: 'Failed to process signup workflow',
        details: n8nResult.error 
      });
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: 'User signup processed successfully',
      userId: payload.userId,
      workflowTriggered: true,
      processedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('User signup webhook error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
