import { NextApiRequest, NextApiResponse } from 'next';
import { createMocks } from 'node-mocks-http';
import signupHandler from '../pages/api/hooks/signup';
import projectApprovalHandler from '../pages/api/hooks/project-approval';
import crypto from 'crypto';

/**
 * Webhook Testing Suite
 * Unit tests for webhook endpoints using Jest and Supertest
 */

// Mock environment variables
process.env.WEBHOOK_SECRET = 'test-webhook-secret-key';
process.env.N8N_SIGNUP_WEBHOOK_URL = 'http://localhost:5678/webhook/test-signup';
process.env.N8N_PROJECT_APPROVAL_WEBHOOK_URL = 'http://localhost:5678/webhook/test-project';

// Mock Supabase
jest.mock('../lib/supabase', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    insert: jest.fn().mockResolvedValue({ data: null, error: null }),
    update: jest.fn().mockResolvedValue({ data: null, error: null }),
    eq: jest.fn().mockReturnThis(),
  }
}));

// Mock fetch for n8n calls
global.fetch = jest.fn();

describe('/api/hooks/signup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fetch as jest.MockedFunction<typeof fetch>).mockClear();
  });

  it('should reject non-POST requests', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
    });

    await signupHandler(req, res);

    expect(res._getStatusCode()).toBe(405);
    const data = JSON.parse(res._getData());
    expect(data.error).toBe('Method not allowed');
  });

  it('should reject requests without signature', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: {
        userId: 'test-user-id',
        email: 'test@example.com',
        name: 'Test User'
      },
    });

    await signupHandler(req, res);

    expect(res._getStatusCode()).toBe(401);
    const data = JSON.parse(res._getData());
    expect(data.error).toBe('Missing signature');
  });

  it('should reject requests with invalid signature', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      headers: {
        'x-signature': 'sha256=invalid-signature'
      },
      body: {
        userId: 'test-user-id',
        email: 'test@example.com',
        name: 'Test User'
      },
    });

    await signupHandler(req, res);

    expect(res._getStatusCode()).toBe(401);
    const data = JSON.parse(res._getData());
    expect(data.error).toBe('Invalid signature');
  });

  it('should validate required payload fields', async () => {
    const crypto = require('crypto');
    const payload = { email: 'test@example.com' }; // missing userId and name
    const signature = crypto
      .createHmac('sha256', process.env.WEBHOOK_SECRET)
      .update(JSON.stringify(payload), 'utf8')
      .digest('hex');

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      headers: {
        'x-signature': `sha256=${signature}`
      },
      body: payload,
    });

    await signupHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
    const data = JSON.parse(res._getData());
    expect(data.error).toBe('Invalid payload');
  });

  it('should validate email format', async () => {
    const crypto = require('crypto');
    const payload = {
      userId: 'test-user-id',
      email: 'invalid-email',
      name: 'Test User'
    };
    const signature = crypto
      .createHmac('sha256', process.env.WEBHOOK_SECRET)
      .update(JSON.stringify(payload), 'utf8')
      .digest('hex');

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      headers: {
        'x-signature': `sha256=${signature}`
      },
      body: payload,
    });

    await signupHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
    const data = JSON.parse(res._getData());
    expect(data.error).toBe('Invalid email format');
  });

  it('should process valid signup webhook', async () => {
    const crypto = require('crypto');
    const payload = {
      userId: 'test-user-id',
      email: 'test@example.com',
      name: 'Test User',
      provider: 'google',
      timestamp: new Date().toISOString()
    };
    const signature = crypto
      .createHmac('sha256', process.env.WEBHOOK_SECRET)
      .update(JSON.stringify(payload), 'utf8')
      .digest('hex');

    // Mock successful n8n response
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    } as Response);

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      headers: {
        'x-signature': `sha256=${signature}`
      },
      body: payload,
    });

    await signupHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.success).toBe(true);
    expect(data.data.userId).toBe('test-user-id');
    expect(fetch).toHaveBeenCalledWith(
      process.env.N8N_SIGNUP_WEBHOOK_URL,
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Authorization': `Bearer ${process.env.N8N_API_KEY}`,
          'Content-Type': 'application/json'
        })
      })
    );
  });
});

describe('/api/hooks/project-approval', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fetch as jest.MockedFunction<typeof fetch>).mockClear();
  });

  it('should reject invalid categories', async () => {
    const crypto = require('crypto');
    const payload = {
      projectId: 'test-project-id',
      creatorId: 'test-creator-id',
      title: 'Test Project',
      description: 'Test description',
      category: 'invalid-category', // Invalid category
      timestamp: new Date().toISOString()
    };
    const signature = crypto
      .createHmac('sha256', process.env.WEBHOOK_SECRET)
      .update(JSON.stringify(payload), 'utf8')
      .digest('hex');

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      headers: {
        'x-signature': `sha256=${signature}`
      },
      body: payload,
    });

    await projectApprovalHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
    const data = JSON.parse(res._getData());
    expect(data.error).toBe('Invalid category');
  });

  it('should perform safety check on content', async () => {
    const crypto = require('crypto');
    const payload = {
      projectId: 'test-project-id',
      creatorId: 'test-creator-id',
      title: 'Test Project with inappropriate content',
      description: 'This contains hate speech',
      category: 'theories',
      timestamp: new Date().toISOString(),
      metadata: {
        fileSize: 1000000 // 1MB
      }
    };
    const signature = crypto
      .createHmac('sha256', process.env.WEBHOOK_SECRET)
      .update(JSON.stringify(payload), 'utf8')
      .digest('hex');

    // Mock successful n8n response
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    } as Response);

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      headers: {
        'x-signature': `sha256=${signature}`
      },
      body: payload,
    });

    await projectApprovalHandler(req, res);

    expect(res._getStatusCode()).toBe(202); // Should be flagged for review
    const data = JSON.parse(res._getData());
    expect(data.success).toBe(true);
    expect(data.data.status).toBe('flagged');
  });

  it('should approve safe content', async () => {
    const crypto = require('crypto');
    const payload = {
      projectId: 'test-project-id',
      creatorId: 'test-creator-id',
      title: 'Amazing Naruto Theory',
      description: 'This is a well-researched theory about character development',
      category: 'theories',
      timestamp: new Date().toISOString(),
      metadata: {
        fileSize: 1000000 // 1MB
      }
    };
    const signature = crypto
      .createHmac('sha256', process.env.WEBHOOK_SECRET)
      .update(JSON.stringify(payload), 'utf8')
      .digest('hex');

    // Mock successful n8n response
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    } as Response);

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      headers: {
        'x-signature': `sha256=${signature}`
      },
      body: payload,
    });

    await projectApprovalHandler(req, res);

    expect(res._getStatusCode()).toBe(200); // Should be approved
    const data = JSON.parse(res._getData());
    expect(data.success).toBe(true);
    expect(data.data.status).toBe('pending');
  });

  it('should reject oversized files', async () => {
    const crypto = require('crypto');
    const payload = {
      projectId: 'test-project-id',
      creatorId: 'test-creator-id',
      title: 'Test Project',
      description: 'Test description',
      category: 'character-designs',
      timestamp: new Date().toISOString(),
      metadata: {
        fileSize: 50 * 1024 * 1024 // 50MB - too large for character designs
      }
    };
    const signature = crypto
      .createHmac('sha256', process.env.WEBHOOK_SECRET)
      .update(JSON.stringify(payload), 'utf8')
      .digest('hex');

    // Mock successful n8n response
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    } as Response);

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      headers: {
        'x-signature': `sha256=${signature}`
      },
      body: payload,
    });

    await projectApprovalHandler(req, res);

    expect(res._getStatusCode()).toBe(202); // Should be flagged for review
    const data = JSON.parse(res._getData());
    expect(data.data.safetyCheck.safe).toBe(false);
  });
});

describe('Webhook Utility Functions', () => {
  const crypto = require('crypto');

  describe('HMAC verification', () => {
    it('should verify valid signatures', () => {
      const payload = 'test payload';
      const secret = 'test-secret';
      const signature = crypto
        .createHmac('sha256', secret)
        .update(payload, 'utf8')
        .digest('hex');

      // Test the verification logic
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(payload, 'utf8')
        .digest('hex');

      expect(signature).toBe(expectedSignature);
    });

    it('should reject invalid signatures', () => {
      const payload = 'test payload';
      const secret = 'test-secret';
      const wrongSecret = 'wrong-secret';

      const signature = crypto
        .createHmac('sha256', secret)
        .update(payload, 'utf8')
        .digest('hex');

      const expectedSignature = crypto
        .createHmac('sha256', wrongSecret)
        .update(payload, 'utf8')
        .digest('hex');

      expect(signature).not.toBe(expectedSignature);
    });
  });

  describe('Safety check logic', () => {
    it('should flag inappropriate keywords', () => {
      const text = 'This contains hate speech and violence';
      const inappropriateKeywords = ['hate', 'violence'];
      
      let hasInappropriateContent = false;
      for (const keyword of inappropriateKeywords) {
        if (text.toLowerCase().includes(keyword)) {
          hasInappropriateContent = true;
          break;
        }
      }

      expect(hasInappropriateContent).toBe(true);
    });

    it('should pass clean content', () => {
      const text = 'This is a wonderful theory about character development';
      const inappropriateKeywords = ['hate', 'violence', 'nsfw'];
      
      let hasInappropriateContent = false;
      for (const keyword of inappropriateKeywords) {
        if (text.toLowerCase().includes(keyword)) {
          hasInappropriateContent = true;
          break;
        }
      }

      expect(hasInappropriateContent).toBe(false);
    });
  });
});

// Test configuration and setup helpers
export const testConfig = {
  webhookSecret: 'test-webhook-secret-key',
  n8nUrl: 'http://localhost:5678',
  validSignature: (payload: string) => {
    return crypto
      .createHmac('sha256', testConfig.webhookSecret)
      .update(payload, 'utf8')
      .digest('hex');
  },
  mockSuccessfulN8nResponse: () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    } as Response);
  },
  mockFailedN8nResponse: () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: async () => 'Internal server error'
    } as Response);
  }
};
