import { NextApiRequest, NextApiResponse } from 'next';
import { validateIncomingWebhook, forwardToN8nWorkflow } from '../../../src/lib/webhook';
import { allowMethods, getRawBody, sendSuccess, sendError, Logger } from '../../../src/lib/api-helpers';
import { supabase } from '../../../src/lib/supabase';

export const config = {
  api: {
    bodyParser: false,
  },
};

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

async function logSignupEvent(payload: SignupPayload, logger: Logger) {
  try {
    const { error } = await supabase
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
    if (error) throw error;
  } catch (error) {
    logger.error('Failed to log signup event to database', error);
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse, context: { logger: Logger; cid: string }) {
  try {
    // Get raw payload for signature validation
    const rawBody = await getRawBody(req);
    const rawPayload = rawBody.toString('utf8');

    // Validate webhook signature
    const validation = validateIncomingWebhook(rawPayload, req.headers);
    if (!validation.valid) {
      context.logger.error('Signup signature verification failed', undefined, {
        error: validation.error,
        headers: req.headers
      });
      return res.status(401).json({
        success: false,
        error: {
          code: 'WEBHOOK_VERIFICATION_FAILED',
          message: 'Invalid webhook signature'
        },
        cid: context.cid
      });
    }

    // Parse body manually since bodyParser is disabled
    const payload: SignupPayload = JSON.parse(rawPayload);

    // Detailed payload validation
    if (!payload.userId || !payload.email || !payload.name) {
      context.logger.warn('Signup received with missing fields', { payload });
      return res.status(400).json({
        success: false,
        error: {
          code: 'BAD_REQUEST',
          message: 'userId, email, and name are required'
        },
        cid: context.cid
      });
    }

    // Log the signup event to database
    await logSignupEvent(payload, context.logger);

    // Forward to n8n workflow
    const n8nUrl = process.env.N8N_SIGNUP_WEBHOOK_URL || (process.env.N8N_URL ? `${process.env.N8N_URL}/webhook/user-signup` : null);

    let n8nSuccess = false;
    if (n8nUrl) {
      const n8nResult = await forwardToN8nWorkflow(n8nUrl, {
        event: 'user.signup',
        data: payload,
        correlationId: context.cid,
        timestamp: new Date().toISOString()
      });
      n8nSuccess = n8nResult.success;

      if (!n8nSuccess) {
        context.logger.warn('n8n signup workflow failed', { error: n8nResult.error });
      }
    } else {
      context.logger.warn('n8n signup URL not configured');
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
      context.logger.error('Failed to update user record on signup', updateError);
    }

    return sendSuccess(res, {
      message: 'Signup processed successfully',
      details: { n8nForwarded: n8nSuccess }
    }, 200, context.cid);

  } catch (error) {
    return sendError(res, error, context.cid);
  }
}

export default allowMethods(['POST'], handler);
