import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import { supabase } from '../../../src/lib/supabase';
import { WebhookUtils } from '../../../src/lib/webhook';

/**
 * Project Approval Webhook Handler
 * Handles project submissions and forwards to n8n for safety checks and admin notifications
 */

export interface ProjectApprovalPayload {
  projectId: string;
  creatorId: string;
  userId: string; // Added this field
  title: string;
  projectTitle: string; // Added this field
  description: string;
  category: 'fan-fights' | 'audio-fx' | 'character-designs' | 'theories';
  projectType: string; // Added this field
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

/**
 * Validate incoming webhook signature
 */
function validateIncomingWebhook(payload: string, headers: any): { valid: boolean; error?: string } {
  try {
    const webhookUtils = new WebhookUtils({
      secret: process.env.WEBHOOK_SECRET || ''
    });

    const signature = headers['x-signature'] || headers['x-hub-signature-256'];
    if (!signature) {
      return { valid: false, error: 'Missing signature header' };
    }

    const timestamp = headers['x-timestamp'];
    const isValid = webhookUtils.verifySignature(payload, signature, timestamp);
    
    return { valid: isValid, error: isValid ? undefined : 'Invalid signature' };
  } catch (error) {
    return { valid: false, error: `Validation error: ${error.message}` };
  }
}

/**
 * Forward payload to n8n workflow
 */
async function forwardToN8nWorkflow(url: string, payload: any): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.N8N_API_KEY}`,
        'X-Source': 'shonen-ark-api'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { success: false, error: `n8n workflow failed: ${response.status} ${errorText}` };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: `Network error: ${error.message}` };
  }
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
