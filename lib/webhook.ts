import crypto from 'crypto';

export interface WebhookConfig {
  secret: string;
  signatureHeader?: string;
  timestampHeader?: string;
  timestampTolerance?: number;
}

export class WebhookUtils {
  private config: WebhookConfig;

  constructor(config: WebhookConfig) {
    this.config = {
      signatureHeader: 'x-signature',
      timestampHeader: 'x-timestamp',
      timestampTolerance: 300, // 5 minutes
      ...config
    };
  }

  /**
   * Generate HMAC signature for webhook payload
   */
  generateSignature(payload: string, timestamp?: string): string {
    const data = timestamp ? `${timestamp}.${payload}` : payload;
    return crypto
      .createHmac('sha256', this.config.secret)
      .update(data, 'utf8')
      .digest('hex');
  }

  /**
   * Verify webhook signature and timestamp
   */
  verifySignature(
    payload: string,
    signature: string,
    timestamp?: string
  ): boolean {
    try {
      // Remove 'sha256=' prefix if present
      const cleanSignature = signature.replace('sha256=', '');
      
      // Generate expected signature
      const expectedSignature = this.generateSignature(payload, timestamp);
      
      // Compare signatures using timing-safe comparison
      if (!this.timingSafeEqual(cleanSignature, expectedSignature)) {
        console.warn('Webhook signature mismatch');
        return false;
      }

      // Verify timestamp if provided
      if (timestamp && this.config.timestampTolerance) {
        const timestampNum = parseInt(timestamp, 10);
        const currentTime = Math.floor(Date.now() / 1000);
        
        if (Math.abs(currentTime - timestampNum) > this.config.timestampTolerance) {
          console.warn('Webhook timestamp outside tolerance');
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error('Webhook verification error:', error);
      return false;
    }
  }

  /**
   * Extract signature and timestamp from headers
   */
  extractHeaders(headers: { [key: string]: string | string[] | undefined }) {
    const signature = this.getHeader(headers, this.config.signatureHeader!);
    const timestamp = this.getHeader(headers, this.config.timestampHeader!);
    
    return { signature, timestamp };
  }

  /**
   * Validate webhook request
   */
  validateWebhook(
    payload: string,
    headers: { [key: string]: string | string[] | undefined }
  ): { valid: boolean; error?: string } {
    const { signature, timestamp } = this.extractHeaders(headers);
    
    if (!signature) {
      return { valid: false, error: 'Missing signature header' };
    }

    const isValid = this.verifySignature(payload, signature, timestamp);
    
    return {
      valid: isValid,
      error: isValid ? undefined : 'Invalid signature or timestamp'
    };
  }

  /**
   * Forward webhook to n8n
   */
  async forwardToN8n(
    workflowUrl: string,
    payload: any,
    headers: { [key: string]: string } = {}
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const response = await fetch(workflowUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Shonen-Ark-Webhook',
          ...headers
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        return {
          success: false,
          error: `n8n request failed: ${response.status} ${response.statusText}`
        };
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private getHeader(
    headers: { [key: string]: string | string[] | undefined },
    key: string
  ): string | undefined {
    const value = headers[key] || headers[key.toLowerCase()];
    return Array.isArray(value) ? value[0] : value;
  }

  private timingSafeEqual(a: string, b: string): boolean {
    if (a.length !== b.length) {
      return false;
    }

    let result = 0;
    for (let i = 0; i < a.length; i++) {
      result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }

    return result === 0;
  }
}

// Default webhook utility instance
export const webhookUtils = new WebhookUtils({
  secret: process.env.WEBHOOK_SECRET || 'default-secret-change-in-production'
});

// Helper functions for common use cases
export const verifyWebhookSignature = (
  payload: string,
  signature: string,
  timestamp?: string
) => webhookUtils.verifySignature(payload, signature, timestamp);

export const validateIncomingWebhook = (
  payload: string,
  headers: { [key: string]: string | string[] | undefined }
) => webhookUtils.validateWebhook(payload, headers);

export const forwardToN8nWorkflow = (
  workflowUrl: string,
  payload: any,
  headers?: { [key: string]: string }
) => webhookUtils.forwardToN8n(workflowUrl, payload, headers);
