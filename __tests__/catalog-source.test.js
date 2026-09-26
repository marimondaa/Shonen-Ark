import { catalogSource } from '../src/lib/catalog-source';
const original = global.fetch;
afterEach(() => { global.fetch = original; jest.restoreAllMocks(); });
const response = () => ({ ok: true, status:200, json: async () => ({ data: { Page: { media: [] } } }) });
test('simultaneous public requests share one upstream request and expire', async () => {
  let now = 1000; jest.spyOn(Date, 'now').mockImplementation(() => now);
  global.fetch = jest.fn().mockResolvedValue(response());
  await Promise.all([catalogSource('query', {}, 'public-test', 100), catalogSource('query', {}, 'public-test', 100)]);
  expect(global.fetch).toHaveBeenCalledTimes(1);
  await catalogSource('query', {}, 'public-test', 100); expect(global.fetch).toHaveBeenCalledTimes(1);
  now = 1101; await catalogSource('query', {}, 'public-test', 100); expect(global.fetch).toHaveBeenCalledTimes(2);
});
test('private searches bypass retention and upstream failures are retryable', async () => {
  global.fetch = jest.fn().mockResolvedValue(response());
  await Promise.all([catalogSource('query', {}, null, 100), catalogSource('query', {}, null, 100)]);
  expect(global.fetch).toHaveBeenCalledTimes(2);
  global.fetch.mockRejectedValueOnce(new Error('offline'));
  await expect(catalogSource('query', {}, 'failure-test', 100)).rejects.toThrow('offline');
  await expect(catalogSource('query', {}, 'failure-test', 100)).resolves.toHaveProperty('ok', true);
});

test('upstream Retry-After prevents new calls until the provider reset', async () => {
  let isolated;
  jest.isolateModules(() => { isolated=require('../src/lib/catalog-source').catalogSource; });
  let now=100000; jest.spyOn(Date,'now').mockImplementation(()=>now);
  global.fetch=jest.fn().mockResolvedValue({ok:false,status:429,headers:{get:name=>name==='Retry-After'?'37':null}});
  expect(await isolated('query',{},null,100)).toMatchObject({status:429,retryAfter:37});
  expect(await isolated('query',{},null,100)).toMatchObject({status:429}); expect(global.fetch).toHaveBeenCalledTimes(1);
  now+=61000; global.fetch.mockResolvedValue(response()); await isolated('query',{},null,100); expect(global.fetch).toHaveBeenCalledTimes(2);
});
