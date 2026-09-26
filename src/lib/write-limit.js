// A small per-process brake on accidental/repeated authenticated writes.
// Not a distributed or database-direct abuse boundary. See launch-readiness.md.
export function createWriteLimiter({ limit = 30, windowMs = 60000, maxEntries = 10000 } = {}) {
  const buckets = new Map();
  return (userId, now = Date.now()) => {
    for (const [key, bucket] of buckets) if (bucket.until <= now) buckets.delete(key);
    let bucket = buckets.get(userId);
    if (!bucket) {
      if (buckets.size >= maxEntries) return 60;
      bucket = { count: 0, until: now + windowMs };
      buckets.set(userId, bucket);
    }
    if (bucket.count >= limit) return Math.max(1, Math.ceil((bucket.until - now) / 1000));
    bucket.count += 1;
    return 0;
  };
}
export const limitCommunityWrite = createWriteLimiter();
