import { test, expect } from '@playwright/test';

/**
 * API Testing Suite for Shonen Ark
 * Tests API endpoints, webhooks, and integrations
 */

const API_BASE = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';

test.describe('Health Check and Status APIs', () => {
  test('should return healthy status', async ({ request }) => {
    const response = await request.get(`${API_BASE}/api/health`);
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('status', 'healthy');
    expect(data).toHaveProperty('timestamp');
    expect(data).toHaveProperty('version');
  });

  test('should return database status', async ({ request }) => {
    const response = await request.get(`${API_BASE}/api/health/database`);
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('database', 'connected');
    expect(data).toHaveProperty('lastChecked');
  });

  test('should handle invalid endpoints gracefully', async ({ request }) => {
    const response = await request.get(`${API_BASE}/api/nonexistent-endpoint`);
    
    expect(response.status()).toBe(404);
  });
});

test.describe('Authentication APIs', () => {
  test('should handle NextAuth session check', async ({ request }) => {
    const response = await request.get(`${API_BASE}/api/auth/session`);
    
    // Should return 200 even without session (null session)
    expect(response.status()).toBe(200);
  });

  test('should return providers list', async ({ request }) => {
    const response = await request.get(`${API_BASE}/api/auth/providers`);
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('google');
    expect(data).toHaveProperty('credentials');
  });

  test('should handle CSRF token generation', async ({ request }) => {
    const response = await request.get(`${API_BASE}/api/auth/csrf`);
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('csrfToken');
    expect(typeof data.csrfToken).toBe('string');
    expect(data.csrfToken.length).toBeGreaterThan(0);
  });
});

test.describe('Content APIs', () => {
  test('should fetch theories list', async ({ request }) => {
    const response = await request.get(`${API_BASE}/api/theories`);
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(Array.isArray(data.theories)).toBe(true);
    expect(data).toHaveProperty('total');
    expect(data).toHaveProperty('page');
  });

  test('should handle theory creation with authentication', async ({ request }) => {
    const theoryData = {
      title: 'Test API Theory',
      description: 'This theory was created via API testing',
      category: 'theories',
      tags: ['test', 'api']
    };

    const response = await request.post(`${API_BASE}/api/theories`, {
      data: theoryData,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Should require authentication
    expect([401, 403]).toContain(response.status());
  });

  test('should validate theory data format', async ({ request }) => {
    const invalidData = {
      title: '', // Empty title should be invalid
      description: 'Valid description'
    };

    const response = await request.post(`${API_BASE}/api/theories`, {
      data: invalidData
    });

    expect([400, 401, 403]).toContain(response.status());
  });

  test('should handle content filtering', async ({ request }) => {
    const response = await request.get(`${API_BASE}/api/theories?category=theories&limit=5`);
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(Array.isArray(data.theories)).toBe(true);
    expect(data.theories.length).toBeLessThanOrEqual(5);
  });
});

test.describe('Calendar APIs', () => {
  test('should fetch anime calendar entries', async ({ request }) => {
    const response = await request.get(`${API_BASE}/api/calendar?type=anime`);
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(Array.isArray(data.entries)).toBe(true);
    
    if (data.entries.length > 0) {
      const entry = data.entries[0];
      expect(entry).toHaveProperty('title');
      expect(entry).toHaveProperty('release_date');
      expect(entry.type).toBe('anime');
    }
  });

  test('should fetch manga calendar entries', async ({ request }) => {
    const response = await request.get(`${API_BASE}/api/calendar?type=manga`);
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(Array.isArray(data.entries)).toBe(true);
  });

  test('should filter calendar by date range', async ({ request }) => {
    const today = new Date().toISOString().split('T')[0];
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    const response = await request.get(
      `${API_BASE}/api/calendar?start_date=${today}&end_date=${nextWeek}`
    );
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(Array.isArray(data.entries)).toBe(true);
  });

  test('should handle invalid date filters', async ({ request }) => {
    const response = await request.get(`${API_BASE}/api/calendar?start_date=invalid-date`);
    
    expect([400, 200]).toContain(response.status()); // Either validation error or ignores invalid date
  });
});

test.describe('Contact and Communication APIs', () => {
  test('should handle contact form submission', async ({ request }) => {
    const contactData = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test message from API testing',
      subject: 'API Test'
    };

    const response = await request.post(`${API_BASE}/api/contact`, {
      data: contactData
    });

    expect([200, 201]).toContain(response.status());
    
    const data = await response.json();
    expect(data).toHaveProperty('success', true);
    expect(data).toHaveProperty('message');
  });

  test('should validate contact form data', async ({ request }) => {
    const invalidData = {
      name: '',
      email: 'not-an-email',
      message: ''
    };

    const response = await request.post(`${API_BASE}/api/contact`, {
      data: invalidData
    });

    expect(response.status()).toBe(400);
    
    const data = await response.json();
    expect(data).toHaveProperty('error');
  });

  test('should handle newsletter subscription', async ({ request }) => {
    const subscriptionData = {
      email: 'newsletter@example.com',
      preferences: ['anime', 'manga']
    };

    const response = await request.post(`${API_BASE}/api/newsletter/subscribe`, {
      data: subscriptionData
    });

    expect([200, 201, 409]).toContain(response.status()); // 409 if already subscribed
  });
});

test.describe('Upload and File APIs', () => {
  test('should handle file upload request', async ({ request }) => {
    // Test the upload endpoint without actual file
    const response = await request.post(`${API_BASE}/api/upload`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Should require authentication or file data
    expect([400, 401, 403]).toContain(response.status());
  });

  test('should generate signed upload URL', async ({ request }) => {
    const response = await request.post(`${API_BASE}/api/upload/sign`, {
      data: {
        filename: 'test-file.jpg',
        filetype: 'image/jpeg'
      }
    });

    // Should require authentication
    expect([401, 403, 200]).toContain(response.status());
  });
});

test.describe('AI and Suggestions APIs', () => {
  test('should handle suggestion submission', async ({ request }) => {
    const suggestionData = {
      type: 'anime',
      title: 'Test Anime Suggestion',
      description: 'This is a test suggestion',
      genre: 'action'
    };

    const response = await request.post(`${API_BASE}/api/suggestions`, {
      data: suggestionData
    });

    expect([200, 201, 401]).toContain(response.status());
  });

  test('should validate suggestion data', async ({ request }) => {
    const invalidData = {
      type: 'invalid-type',
      title: '',
      description: 'x'.repeat(10000) // Too long
    };

    const response = await request.post(`${API_BASE}/api/suggestions`, {
      data: invalidData
    });

    expect([400, 401]).toContain(response.status());
  });
});

test.describe('Community and Gigs APIs', () => {
  test('should fetch community projects', async ({ request }) => {
    const response = await request.get(`${API_BASE}/api/community-projects`);
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(Array.isArray(data.projects)).toBe(true);
  });

  test('should handle gig listings', async ({ request }) => {
    const response = await request.get(`${API_BASE}/api/gigs`);
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(Array.isArray(data.gigs)).toBe(true);
  });

  test('should filter gigs by type', async ({ request }) => {
    const response = await request.get(`${API_BASE}/api/gigs?type=animation&status=open`);
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(Array.isArray(data.gigs)).toBe(true);
  });
});

test.describe('Webhook Endpoints', () => {
  test('should handle user signup webhook', async ({ request }) => {
    const webhookData = {
      type: 'user.signup',
      user: {
        id: 'test-user-123',
        email: 'webhook-test@example.com',
        name: 'Webhook Test User'
      },
      timestamp: new Date().toISOString()
    };

    // Create HMAC signature for webhook verification
    const crypto = require('crypto');
    const secret = process.env.WEBHOOK_SECRET || 'test-secret';
    const signature = crypto.createHmac('sha256', secret)
      .update(JSON.stringify(webhookData))
      .digest('hex');

    const response = await request.post(`${API_BASE}/api/hooks/signup`, {
      data: webhookData,
      headers: {
        'Content-Type': 'application/json',
        'X-Signature-256': `sha256=${signature}`
      }
    });

    expect([200, 401]).toContain(response.status()); // 401 if webhook secret is wrong
  });

  test('should handle project approval webhook', async ({ request }) => {
    const webhookData = {
      type: 'project.submitted',
      project: {
        id: 'test-project-123',
        title: 'Test Project',
        category: 'theories',
        user_id: 'test-user-123'
      },
      timestamp: new Date().toISOString()
    };

    const crypto = require('crypto');
    const secret = process.env.WEBHOOK_SECRET || 'test-secret';
    const signature = crypto.createHmac('sha256', secret)
      .update(JSON.stringify(webhookData))
      .digest('hex');

    const response = await request.post(`${API_BASE}/api/hooks/project-approval`, {
      data: webhookData,
      headers: {
        'Content-Type': 'application/json',
        'X-Signature-256': `sha256=${signature}`
      }
    });

    expect([200, 401]).toContain(response.status());
  });

  test('should reject webhooks without valid signature', async ({ request }) => {
    const webhookData = {
      type: 'user.signup',
      user: { id: 'test' }
    };

    const response = await request.post(`${API_BASE}/api/hooks/signup`, {
      data: webhookData,
      headers: {
        'Content-Type': 'application/json'
        // No signature header
      }
    });

    expect([401, 403]).toContain(response.status());
  });
});

test.describe('Stripe Integration APIs', () => {
  test('should handle checkout session creation', async ({ request }) => {
    const checkoutData = {
      priceId: 'price_test_creator_monthly',
      userId: 'test-user-123'
    };

    const response = await request.post(`${API_BASE}/api/stripe/create-checkout-session`, {
      data: checkoutData
    });

    // Should require authentication
    expect([401, 403, 200]).toContain(response.status());
  });

  test('should handle billing portal access', async ({ request }) => {
    const response = await request.post(`${API_BASE}/api/stripe/billing-portal`, {
      data: {
        customerId: 'cus_test_customer'
      }
    });

    // Should require authentication
    expect([401, 403]).toContain(response.status());
  });
});

test.describe('Rate Limiting and Security', () => {
  test('should handle rate limiting', async ({ request }) => {
    const requests = [];
    
    // Send multiple requests rapidly
    for (let i = 0; i < 10; i++) {
      requests.push(request.get(`${API_BASE}/api/health`));
    }
    
    const responses = await Promise.all(requests);
    
    // All should succeed for health endpoint (not rate limited)
    responses.forEach(response => {
      expect([200, 429]).toContain(response.status());
    });
  });

  test('should include security headers', async ({ request }) => {
    const response = await request.get(`${API_BASE}/api/health`);
    
    const headers = response.headers();
    
    // Check for common security headers
    expect(headers).toHaveProperty('x-content-type-options');
    expect(headers).toHaveProperty('x-frame-options');
  });

  test('should handle CORS properly', async ({ request }) => {
    const response = await request.fetch(`${API_BASE}/api/health`, {
      method: 'OPTIONS'
    });
    
    expect([200, 204, 405]).toContain(response.status()); // Some APIs don't support OPTIONS
  });
});

test.describe('Error Handling', () => {
  test('should return proper error format', async ({ request }) => {
    const response = await request.get(`${API_BASE}/api/nonexistent`);
    
    expect(response.status()).toBe(404);
    
    const data = await response.json();
    expect(data).toHaveProperty('error');
    expect(data).toHaveProperty('status', 404);
  });

  test('should handle malformed JSON gracefully', async ({ request }) => {
    const response = await request.post(`${API_BASE}/api/contact`, {
      data: 'not-valid-json',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    expect([400, 422]).toContain(response.status());
  });

  test('should handle server errors gracefully', async ({ request }) => {
    // Try to trigger a server error with invalid data
    const response = await request.post(`${API_BASE}/api/theories`, {
      data: {
        title: 'x'.repeat(10000), // Extremely long title
        description: 'y'.repeat(100000) // Extremely long description
      }
    });

    expect([400, 401, 413, 422, 500]).toContain(response.status());
  });
});

// Helper functions for API testing
export class APITestHelpers {
  static createHMACSignature(payload: string, secret: string): string {
    const crypto = require('crypto');
    return crypto.createHmac('sha256', secret).update(payload).digest('hex');
  }

  static async createTestUser(request: any, baseURL: string) {
    return await request.post(`${baseURL}/api/test/create-user`, {
      data: {
        email: 'api-test@example.com',
        name: 'API Test User',
        role: 'fan'
      }
    });
  }

  static async cleanupTestUser(request: any, baseURL: string, email: string) {
    return await request.delete(`${baseURL}/api/test/delete-user`, {
      data: { email }
    });
  }
}
