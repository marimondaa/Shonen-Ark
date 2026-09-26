import { createWriteLimiter } from '../src/lib/write-limit';

test('limits repeated writes, isolates accounts, and expires buckets', () => {
  const consume = createWriteLimiter({ limit: 2, windowMs: 10000 });
  expect(consume('a', 0)).toBe(0);
  expect(consume('a', 1)).toBe(0);
  expect(consume('a', 1000)).toBe(9);
  expect(consume('b', 1000)).toBe(0);
  expect(consume('a', 10000)).toBe(0);
});
test('bounded storage denies new buckets until existing entries expire', () => {
  const consume = createWriteLimiter({ maxEntries: 1, windowMs: 1000 });
  expect(consume('a', 0)).toBe(0);
  expect(consume('b', 1)).toBe(60);
  expect(consume('b', 1000)).toBe(0);
});
