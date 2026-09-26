import { createMocks } from 'node-mocks-http';
import crypto from 'crypto';
import signup from '../pages/api/hooks/signup';
import approval from '../pages/api/hooks/project-approval';

jest.mock('../src/lib/supabase', () => ({ supabase: { from: jest.fn(() => ({ insert: jest.fn().mockResolvedValue({ error: null }), update: jest.fn(() => ({ eq: jest.fn().mockResolvedValue({ error: null }) })) })) } }));

function request(body: any, signature: string | null = 'valid', method = 'POST') {
  const raw = JSON.stringify(body);
  const headers: Record<string,string> = {};
  if (signature) headers['x-signature'] = signature === 'valid' ? `sha256=${crypto.createHmac('sha256', process.env.WEBHOOK_SECRET!).update(raw).digest('hex')}` : signature;
  const { req, res } = createMocks({ method: method as any, headers });
  // These handlers disable bodyParser and consume the raw request stream.
  (req as any)[Symbol.asyncIterator] = async function* () { yield Buffer.from(raw); };
  return { req: req as any, res: res as any };
}

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true }) });
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});
afterEach(() => jest.restoreAllMocks());

const user = { userId: 'test-user', email: 'fan@example.test', name: 'Fan', provider: 'email' };
const project = { projectId: 'project', userId: 'test-user', projectTitle: 'Theory', action: 'submit' };

describe.each([['signup', signup, user], ['project approval', approval, project]] as const)('%s webhook', (_name, handler, payload) => {
  test('rejects unsupported methods', async () => {
    const { req, res } = request({}, null, 'GET'); await handler(req, res);
    expect(res.statusCode).toBe(405); expect(res._getJSONData().error.code).toBe('METHOD_NOT_ALLOWED');
  });
  test.each([null, 'sha256=invalid'])('rejects missing or invalid signature: %s', async signature => {
    const { req, res } = request(payload, signature); await handler(req, res);
    expect(res.statusCode).toBe(401); expect(global.fetch).not.toHaveBeenCalled();
  });
  test('rejects signed but incomplete payload', async () => {
    const { req, res } = request({}); await handler(req, res); expect(res.statusCode).toBe(400);
  });
  test('accepts a signed valid payload and forwards it', async () => {
    const { req, res } = request(payload); await handler(req, res);
    expect(res.statusCode).toBe(200); expect(res._getJSONData().success).toBe(true); expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
test('signup validates email', async () => {
  const { req, res } = request({ ...user, email: 'invalid' }); await signup(req, res); expect(res.statusCode).toBe(400);
});
test('approval rejects unknown actions', async () => {
  const { req, res } = request({ ...project, action: 'erase' }); await approval(req, res); expect(res.statusCode).toBe(400);
});
test('approval reports upstream failure instead of success', async () => {
  (global.fetch as jest.Mock).mockResolvedValue({ ok: false, status: 503, text: async () => 'Unavailable' });
  const { req, res } = request(project); await approval(req, res); expect(res.statusCode).toBe(502);
});
test('signup reports forwarding failure in its response', async () => {
  (global.fetch as jest.Mock).mockResolvedValue({ ok: false, status: 503, text: async () => 'Unavailable' });
  const { req, res } = request(user); await signup(req, res);
  expect(res._getJSONData().data.details.n8nForwarded).toBe(false);
});
