import { createMocks } from 'node-mocks-http';
import handler from '../pages/api/catalog';

const originalFetch = global.fetch;
afterEach(() => { global.fetch = originalFetch; });
test('search bypasses cache and does not forward account or browser identity', async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ data: { Page: { media: [], pageInfo: { hasNextPage: false } } } }) });
  for (let i = 0; i < 2; i++) {
    const { req, res } = createMocks({ method: 'GET', query: { search: 'A private search' }, headers: { authorization: 'Bearer not-a-real-session', 'x-forwarded-for': '192.0.2.1' } });
    await handler(req, res);
    expect(res.getHeader('Cache-Control')).toBe('no-store');
    expect(res.statusCode).toBe(200);
  }
  expect(global.fetch).toHaveBeenCalledTimes(2);
  const options = global.fetch.mock.calls[0][1];
  expect(options.headers).not.toHaveProperty('Authorization');
  expect(JSON.stringify(options)).not.toContain('not-a-real-session');
  expect(JSON.stringify(options)).not.toContain('192.0.2.1');
  expect(options.body).not.toContain('coverImage');
});
