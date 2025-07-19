import { NextApiRequest, NextApiResponse } from 'next';
import { validateIncomingWebhook, forwardToN8nWorkflow } from '../../../lib/webhook';

export interface ProjectApprovalPayload {
  projectId: string;
  userId: string;
  userEmail: string;
  projectTitle: string;
  projectType: 'theory' | 'animation' | 'artwork' | 'video';
  contentUrl: string;
  submittedAt: string;
  moderationFlags?: string[];
  action: 'submit' | 'approve' | 'reject';
  moderatorId?: string;
  moderatorNotes?: string;
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
      console.warn('Project approval webhook validation failed:', validation.error);
      return res.status(401).json({ error: 'Invalid webhook signature' });
    }

    const payload: ProjectApprovalPayload = req.body;

    // Basic payload validation
    if (!payload.projectId || !payload.userId || !payload.projectTitle || !payload.action) {
      return res.status(400).json({ 
        error: 'Missing required fields: projectId, userId, projectTitle, action' 
      });
    }

    // Log the project approval event
    console.log('Project approval webhook received:', {
      projectId: payload.projectId,
      userId: payload.userId,
      projectType: payload.projectType,
      action: payload.action,
      moderationFlags: payload.moderationFlags
    });

    // Construct n8n webhook URL
    const n8nBaseUrl = process.env.N8N_URL;
    if (!n8nBaseUrl) {
      throw new Error('N8N_URL environment variable not set');
    }

    const workflowUrl = `${n8nBaseUrl}/webhook/project-approval`;

    // Enrich payload with processing metadata
    const enrichedPayload = {
      ...payload,
      webhookSource: 'shonen-ark-api',
      processedAt: new Date().toISOString(),
      requiresModeration: payload.moderationFlags && payload.moderationFlags.length > 0,
      priority: payload.projectType === 'video' ? 'high' : 'normal'
    };

    // Forward to n8n workflow
    const n8nResult = await forwardToN8nWorkflow(workflowUrl, enrichedPayload);

    if (!n8nResult.success) {
      console.error('Failed to forward project approval to n8n:', n8nResult.error);
      return res.status(500).json({ 
        error: 'Failed to process project approval workflow',
        details: n8nResult.error 
      });
    }

    // Determine response message based on action
    let message = 'Project approval processed successfully';
    switch (payload.action) {
      case 'submit':
        message = 'Project submitted for review';
        break;
      case 'approve':
        message = 'Project approved and published';
        break;
      case 'reject':
        message = 'Project rejected';
        break;
    }

    // Return success response
    res.status(200).json({
      success: true,
      message,
      projectId: payload.projectId,
      action: payload.action,
      workflowTriggered: true,
      requiresModeration: enrichedPayload.requiresModeration,
      processedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Project approval webhook error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
