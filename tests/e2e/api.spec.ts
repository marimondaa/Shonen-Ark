import { test, expect } from '@playwright/test';

test('health distinguishes configuration from verified connectivity', async ({ request }) => {
  const response = await request.get('/api/health');
  expect(response.status()).toBe(200);
  expect((await response.json()).app).toBe('ok');
});
for (const resource of ['theories', 'gigs', 'bookmarks', 'collections', 'contact']) {
  test(`anonymous writes cannot succeed: ${resource}`, async ({ request }) => {
    const response = await request.post(`/api/community/${resource}`, { data: { title: 'Do not create', content: 'Unauthenticated' } });
    expect([401, 503]).toContain(response.status());
    expect((await response.json()).error).toBeTruthy();
  });
}
test('legacy fake-login and publication APIs are unavailable', async ({ request }) => {
  for (const path of ['/api/auth/login', '/api/auth/register', '/api/theories', '/api/gigs', '/api/stripe/create-checkout-session']) {
    const response = await request.post(path, { data: {} });
    expect(response.status()).toBe(503);
    expect((await response.json()).code).toBe('INTEGRATION_UNAVAILABLE');
  }
});
test('catalog rejects writes', async ({ request }) => {
  expect((await request.post('/api/catalog', { data: {} })).status()).toBe(405);
});
test('unknown community resource has no access to arbitrary tables', async ({ request }) => {
  expect((await request.get('/api/community/users')).status()).toBe(404);
});

test('security headers protect HTML and private API responses', async ({ request }) => {
  for (const route of ['/', '/privacy', '/api/community/bookmarks']) {
    const response = await request.get(route);
    expect(response.headers()['x-content-type-options']).toBe('nosniff');
    expect(response.headers()['referrer-policy']).toBe('no-referrer');
    expect(response.headers()['content-security-policy']).toContain("frame-ancestors 'none'");
  }
});

test('catalog errors and private data are not cacheable', async ({ request }) => {
  for (const route of ['/api/catalog?kind=calendar&date=2026-02-31', '/api/community/bookmarks']) {
    const response = await request.get(route);
    expect(response.headers()['cache-control']).toContain('no-store');
  }
});

test('pilot has no remote fonts, cover images, or cursor canvas', async ({ request }) => {
  for (const route of ['/', '/discovery']) {
    const html = await (await request.get(route)).text();
    expect(html).not.toMatch(/fonts\.googleapis|fonts\.gstatic|<img[^>]+https:|particle-cursor-canvas/);
  }
});
