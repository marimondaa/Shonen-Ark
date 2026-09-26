import { catalogSource } from '../../src/lib/catalog-source';
const fields = 'id title { english romaji } genres format averageScore seasonYear siteUrl';
export default async function handler(req, res) {
  // Searches can reveal interests. Do not store query responses in shared browser/CDN caches.
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') { res.setHeader('Allow', 'GET'); return res.status(405).json({ error: 'Method not allowed.' }); }
  if (req.query.kind === 'calendar') return res.status(410).json({error:'The daily endpoint has been retired. Use the bounded weekly /api/schedule endpoint.'});
  const kind = ['anime', 'manga', 'characters', 'calendar'].includes(req.query.kind) ? req.query.kind : 'anime';
  const search = typeof req.query.search === 'string' ? req.query.search.trim().slice(0, 100) : '';
  const page = Math.max(1, Math.min(500, Math.floor(Number(req.query.page) || 1)));
  const sort = ['TRENDING_DESC', 'POPULARITY_DESC', 'SCORE_DESC'].includes(req.query.sort) ? req.query.sort : 'TRENDING_DESC';
  const date = typeof req.query.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(req.query.date) ? req.query.date : new Date().toISOString().slice(0, 10);
  const key = search ? null : JSON.stringify([kind, page, sort, kind === 'calendar' ? date : '']);
  let query, variables, listKey;
  if (kind === 'characters') {
    query = 'query($search:String,$page:Int){Page(page:$page,perPage:12){pageInfo{hasNextPage} characters(search:$search,sort:FAVOURITES_DESC){id name{full} siteUrl}}}';
    variables = { search: search || undefined, page }; listKey = 'characters';
  } else if (kind === 'calendar') {
    const start = Math.floor(Date.parse(`${date}T00:00:00Z`) / 1000);
    if (!Number.isFinite(start) || new Date(start * 1000).toISOString().slice(0, 10) !== date) return res.status(400).json({ error: 'Choose a valid date.' });
    query = `query($from:Int,$to:Int,$page:Int){Page(page:$page,perPage:50){pageInfo{hasNextPage} airingSchedules(airingAt_greater:$from,airingAt_lesser:$to,sort:TIME){id episode airingAt media{${fields} isAdult}}}}`;
    variables = { from: start - 1, to: start + 86400, page }; listKey = 'airingSchedules';
  } else {
    query = `query($search:String,$type:MediaType,$sort:[MediaSort],$page:Int){Page(page:$page,perPage:12){pageInfo{hasNextPage} media(search:$search,type:$type,sort:$sort,isAdult:false){${fields}}}}`;
    variables = { search: search || undefined, type: kind.toUpperCase(), sort: [sort], page }; listKey = 'media';
  }
  try {
    const upstream = await catalogSource(query, variables, key, kind === 'calendar' ? 60000 : 300000);
    if (!upstream.ok) return res.status(upstream.status === 429 ? 429 : 502).json({ error: upstream.status === 429 ? 'AniList is busy. Please wait a minute before trying again.' : 'AniList is temporarily unavailable. Please try again.' });
    const json = upstream.json;
    if (json.errors || !json.data?.Page) throw new Error('Invalid catalog response');
    let items = json.data.Page[listKey];
    if (kind === 'calendar') items = items.filter(item => !item.media.isAdult);
    const value = { items, hasNextPage: json.data.Page.pageInfo.hasNextPage, source: 'AniList' };
    return res.json(value);
  } catch { return res.status(502).json({ error: 'Could not reach AniList. Check your connection and try again.' }); }
}
