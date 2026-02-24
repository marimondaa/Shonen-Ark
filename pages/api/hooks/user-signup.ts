import { NextApiRequest, NextApiResponse } from 'next';
import { validateIncomingWebhook, forwardToN8nWorkflow } from '../../../src/lib/webhook';
import { allowMethods, getRawBody, sendSuccess, sendError, Logger } from '../../../src/lib/api-helpers';

export const config = {
  api: {
    bodyParser: false,
  },
};

export interface UserSignupPayload {
  userId: string;
  email: string;
  username: string;
  accountType: 'fan' | 'creator';
  timestamp: number;
  source: 'web' | 'mobile';
}

async function handler(req: NextApiRequest, res: NextApiResponse, context: { logger: Logger; cid: string }) {
  try {
    // Get raw payload for signature validation
    const rawBody = await getRawBody(req);
    const rawPayload = rawBody.toString('utf8');

    // Validate webhook signature
    const validation = validateIncomingWebhook(rawPayload, req.headers);
    if (!validation.valid) {
      context.logger.error('User signup signature verification failed', undefined, {
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
    const payload: UserSignupPayload = JSON.parse(rawPayload);

    // Basic payload validation
    if (!payload.userId || !payload.email || !payload.username) {
      context.logger.warn('User signup received with missing fields', { payload });
      return res.status(400).json({
        success: false,
        error: {
          code: 'BAD_REQUEST',
          message: 'Missing required fields: userId, email, username'
        },
        cid: context.cid
      });
    }

    context.logger.info('User signup webhook received', {
      userId: payload.userId,
      email: payload.email,
      accountType: payload.accountType
    });

    // Forward to n8n workflow
    const n8nUrl = process.env.N8N_URL;
    if (!n8nUrl) {
      context.logger.error('N8N_URL is missing in environment');
      return sendError(res, new Error('Back-office integration not configured'), context.cid);
    }

    const workflowUrl = `${n8nUrl}/webhook/user-signup`;

    const n8nResult = await forwardToN8nWorkflow(workflowUrl, {
      ...payload,
      webhookSource: 'shonen-ark-api',
      correlationId: context.cid,
      processedAt: new Date().toISOString()
    });

    if (!n8nResult.success) {
      context.logger.error('Failed to forward user signup to n8n', new Error(n8nResult.error), {
        workflowUrl
      });
      return res.status(502).json({
        success: false,
        error: {
          code: 'INTEGRATION_ERROR',
          message: 'Failed to notify back-office',
          details: n8nResult.error
        },
        cid: context.cid
      });
    }

    return sendSuccess(res, { message: 'User signup processed successfully' }, 200, context.cid);

  } catch (error) {
    return sendError(res, error, context.cid);
  }
}

export default allowMethods(['POST'], handler);
