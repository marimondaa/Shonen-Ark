// Short-lived public-page reuse, not a catalog mirror. Search responses are never retained.
const pages = new Map();
const pending = new Map();
// Share the budget across separately bundled API handlers in one Node process.
const budgetKey = Symbol.for('shonen-ark.anilist-budget');
const budget = globalThis[budgetKey] || (globalThis[budgetKey] = { requests:[], pausedUntil:0 });
export async function catalogSource(query, variables, key, ttl) {
  const now = Date.now();
  for (const [id, item] of pages) if (item.until <= now) pages.delete(id);
  if (key && pages.has(key)) return pages.get(key).value;
  if (key && pending.has(key)) return pending.get(key);
  budget.requests = budget.requests.filter(time => time > now - 60000 && time <= now);
  if (now < budget.pausedUntil || budget.requests.length >= 20) return { ok:false, status:429, json:null, retryAfter:Math.max(1, Math.ceil((Math.max(budget.pausedUntil, budget.requests.length >= 20 ? budget.requests[0] + 60000 : now) - now) / 1000)) };
  budget.requests.push(now);
  const request = (async () => {
    const response = await fetch('https://graphql.anilist.co', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ query, variables }), signal: AbortSignal.timeout(12000) });
    const retry = Number(response.headers?.get('Retry-After'));
    const reset = Number(response.headers?.get('X-RateLimit-Reset')) * 1000;
    if (response.status === 429 || response.headers?.get('X-RateLimit-Remaining') === '0') budget.pausedUntil = Math.max(Date.now() + (retry > 0 ? retry : 60) * 1000, reset || 0);
    const value = { ok: response.ok, status: response.status, json: response.ok ? await response.json() : null, retryAfter: response.status === 429 ? Math.max(1, Math.ceil((budget.pausedUntil-Date.now())/1000)) : null };
    if (key && value.ok && !value.json.errors && value.json.data?.Page) {
      if (pages.size >= 100) pages.delete(pages.keys().next().value);
      pages.set(key, { value, until: Date.now() + ttl });
    }
    return value;
  })();
  if (key) pending.set(key, request);
  try { return await request; } finally { if (key) pending.delete(key); }
}
