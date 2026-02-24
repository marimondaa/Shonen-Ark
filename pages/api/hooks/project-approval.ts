import { NextApiRequest, NextApiResponse } from 'next';
import { validateIncomingWebhook, forwardToN8nWorkflow } from '../../../src/lib/webhook';
import { allowMethods, getRawBody, sendSuccess, sendError, Logger } from '../../../src/lib/api-helpers';

export const config = {
  api: {
    bodyParser: false,
  },
};

export interface ProjectApprovalPayload {
  projectId: string;
  creatorId: string;
  userId: string;
  title: string;
  projectTitle: string;
  description: string;
  category: 'fan-fights' | 'audio-fx' | 'character-designs' | 'theories';
  projectType: string;
  fileUrl?: string;
  thumbnailUrl?: string;
  metadata?: {
    duration?: number;
    fileSize?: number;
    mimeType?: string;
    tags?: string[];
    animeReference?: string;
  };
  timestamp: string;
  submittedAt: string;
  moderationFlags?: string[];
  action: 'submit' | 'approve' | 'reject';
  moderatorId?: string;
  moderatorNotes?: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse, context: { logger: Logger; cid: string }) {
  try {
    // Get raw payload for signature validation
    const rawBody = await getRawBody(req);
    const rawPayload = rawBody.toString('utf8');

    // Validate webhook signature
    const validation = validateIncomingWebhook(rawPayload, req.headers);
    if (!validation.valid) {
      context.logger.error('Project approval signature verification failed', undefined, {
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
    const payload: ProjectApprovalPayload = JSON.parse(rawPayload);

    // Basic payload validation
    if (!payload.projectId || !payload.userId || !payload.projectTitle || !payload.action) {
      context.logger.warn('Project approval received with missing fields', { payload });
      return res.status(400).json({
        success: false,
        error: {
          code: 'BAD_REQUEST',
          message: 'Missing required fields: projectId, userId, projectTitle, action'
        },
        cid: context.cid
      });
    }

    context.logger.info('Project approval webhook received', {
      projectId: payload.projectId,
      userId: payload.userId,
      action: payload.action
    });

    // Forward to n8n workflow
    const n8nUrl = process.env.N8N_URL;
    if (!n8nUrl) {
      context.logger.error('N8N_URL is missing in environment');
      return sendError(res, new Error('Back-office integration not configured'), context.cid);
    }

    const workflowUrl = `${n8nUrl}/webhook/project-approval`;

    // Enrich payload with processing metadata
    const enrichedPayload = {
      ...payload,
      webhookSource: 'shonen-ark-api',
      correlationId: context.cid,
      processedAt: new Date().toISOString(),
      requiresModeration: !!(payload.moderationFlags && payload.moderationFlags.length > 0),
      priority: payload.projectType === 'video' ? 'high' : 'normal'
    };

    const n8nResult = await forwardToN8nWorkflow(workflowUrl, enrichedPayload);

    if (!n8nResult.success) {
      context.logger.error('Failed to forward project approval to n8n', new Error(n8nResult.error), {
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

    // Determine response message based on action
    let message = 'Project approval processed successfully';
    switch (payload.action) {
      case 'submit': message = 'Project submitted for review'; break;
      case 'approve': message = 'Project approved and published'; break;
      case 'reject': message = 'Project rejected'; break;
    }

    return sendSuccess(res, {
      message,
      projectId: payload.projectId,
      action: payload.action
    }, 200, context.cid);

  } catch (error) {
    return sendError(res, error, context.cid);
  }
}

export default allowMethods(['POST'], handler);
