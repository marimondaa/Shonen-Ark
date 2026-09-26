import { createMocks } from 'node-mocks-http';
import handler from '../pages/api/community/[resource]';
import { communityClient, verifiedUser } from '../src/lib/community-server';
import { limitCommunityWrite } from '../src/lib/write-limit';

jest.mock('../src/lib/community-server', () => ({ communityClient: jest.fn(), verifiedUser: jest.fn() }));
jest.mock('../src/lib/write-limit', () => ({ limitCommunityWrite: jest.fn() }));
const userId = '11111111-1111-4111-8111-111111111111';
const itemId = '22222222-2222-4222-8222-222222222222';
let chain;
let result;
let from;
beforeEach(() => {
  limitCommunityWrite.mockReturnValue(0);
  result = { data: [{ id: itemId }], error: null, count: 1 };
  chain = Object.fromEntries(['select', 'eq', 'insert', 'update', 'upsert', 'delete', 'order', 'range', 'ilike', 'maybeSingle'].map(method => [method, jest.fn(() => chain)]));
  chain.then = (resolve, reject) => Promise.resolve(result).then(resolve, reject);
  from = jest.fn(() => chain);
  communityClient.mockReturnValue({ from });
  verifiedUser.mockResolvedValue({ id: userId, email: 'fan@example.test', user_metadata: { username: 'Fan' } });
});
function call(method = 'GET', resource = 'theories', body = {}, query = {}) {
  const { req, res } = createMocks({ method, query: { resource, ...query }, body });
  return handler(req, res).then(() => res);
}
test('unconfigured community never returns pretend success', async () => {
  communityClient.mockReturnValue(null);
  const response = await call('POST');
  expect(response.statusCode).toBe(503); expect(from).not.toHaveBeenCalled();
});
test.each(['POST', 'PATCH', 'DELETE'])('anonymous %s is denied before accessing data', async method => {
  verifiedUser.mockResolvedValue(null);
  const response = await call(method);
  expect(response.statusCode).toBe(401); expect(from).not.toHaveBeenCalled();
});
test.each(['bookmarks', 'collections', 'contact'])('anonymous cannot read private %s', async resource => {
  verifiedUser.mockResolvedValue(null);
  expect((await call('GET', resource)).statusCode).toBe(401); expect(from).not.toHaveBeenCalled();
});
test('public theories only query published rows', async () => {
  verifiedUser.mockResolvedValue(null);
  expect((await call()).statusCode).toBe(200);
  expect(chain.eq).toHaveBeenCalledWith('status', 'published');
});
test('private draft listing always restricts to verified owner', async () => {
  await call('GET', 'theories', {}, { mine: 'true' });
  expect(chain.eq).toHaveBeenCalledWith('user_id', userId);
});
test('clients cannot impersonate another author during publication', async () => {
  result.data = { id: itemId };
  const response = await call('POST', 'theories', { user_id: itemId, author_name: 'Administrator', title: 'A new theory', summary: 'A thoughtful summary', content: 'Evidence. '.repeat(10), series: 'One Piece', status: 'draft' });
  expect(response.statusCode).toBe(201);
  expect(chain.insert).toHaveBeenCalledWith(expect.objectContaining({ user_id: userId, author_name: 'Fan' }));
});
test('deletion is owner-scoped and missing records report 404', async () => {
  result.data = [];
  expect((await call('DELETE', 'theories', {}, { id: itemId })).statusCode).toBe(404);
  expect(chain.eq).toHaveBeenCalledWith('user_id', userId);
});
test('database failures never return saved success', async () => {
  result.error = { message: 'private diagnostic' };
  const response = await call();
  expect(response.statusCode).toBe(503); expect(response._getData()).not.toContain('private diagnostic');
});
test('malformed IDs and invalid theory content are rejected', async () => {
  expect((await call('DELETE', 'theories', {}, { id: 'bad' })).statusCode).toBe(400);
  expect((await call('POST', 'theories', {})).statusCode).toBe(400);
});
test('contact messages have no read endpoint even for authenticated users', async () => {
  expect((await call('GET', 'contact')).statusCode).toBe(405);
});

test('rate-limited writes return retry information before accessing data', async () => {
  limitCommunityWrite.mockReturnValue(45);
  const response = await call('POST');
  expect(response.statusCode).toBe(429);
  expect(response.getHeader('Retry-After')).toBe('45');
  expect(limitCommunityWrite).toHaveBeenCalledWith(userId);
  expect(from).not.toHaveBeenCalled();
});
