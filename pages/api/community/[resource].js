import { communityClient, verifiedUser } from '../../../src/lib/community-server';
import { validateTheory, validateGig, textField, isUuid } from '../../../src/lib/community-validation';
import { limitCommunityWrite } from '../../../src/lib/write-limit';

export const config = { api: { bodyParser: { sizeLimit: '64kb' } } };

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const resource = req.query.resource;
  if (!['theories', 'gigs', 'bookmarks', 'collections', 'contact'].includes(resource)) return res.status(404).json({ error: 'Not found.' });
  if (!['GET', 'POST', 'PATCH', 'DELETE'].includes(req.method)) {
    res.setHeader('Allow', 'GET, POST, PATCH, DELETE');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  const client = communityClient(req);
  if (!client) return res.status(503).json({ error: 'Community services are not connected yet. Account and publishing features will be available after setup.', code: 'NOT_CONFIGURED' });
  try {
    const user = await verifiedUser(client, req);
    const privateRequest = req.method !== 'GET' || ['bookmarks', 'collections', 'contact'].includes(resource) || req.query.mine === 'true';
    if (privateRequest && !user) return res.status(401).json({ error: 'Sign in to continue.' });
    if (req.method !== 'GET') {
      const retryAfter = limitCommunityWrite(user.id);
      if (retryAfter) {
        res.setHeader('Retry-After', String(retryAfter));
        return res.status(429).json({ error: 'Too many changes in a short time. Please wait a minute and try again.' });
      }
    }
    const id = req.query.id;
    if (id && !isUuid(id)) return res.status(400).json({ error: 'Invalid item ID.' });
    const table = `ark_${resource}`;
    if (req.method === 'GET') {
      if (resource === 'contact') return res.status(405).json({ error: 'Messages cannot be read here.' });
      if (resource === 'bookmarks') {
        const { data, error } = await client.from(table).select('theory_id, collection_id, created_at, theory:ark_theories(*)').eq('user_id', user.id).order('created_at', { ascending: false });
        if (error) throw error;
        return res.json({ items: data, total: data.length });
      }
      if (resource === 'collections') {
        const { data, error } = await client.from(table).select('*').eq('user_id', user.id).order('created_at', { ascending: false });
        if (error) throw error;
        return res.json({ items: data, total: data.length });
      }
      let query = client.from(table).select('*', { count: 'exact' });
      if (id) query = query.eq('id', id);
      if (req.query.mine === 'true') query = query.eq('user_id', user.id);
      else query = query.eq('status', resource === 'theories' ? 'published' : 'open');
      // Draft detail is only readable by its author via the mine query and RLS.
      if (typeof req.query.search === 'string' && req.query.search.trim()) query = query.ilike('title', `%${req.query.search.trim().slice(0, 100).replace(/[%_]/g, '')}%`);
      if (resource === 'theories' && req.query.series) query = query.eq('series', req.query.series);
      const page = Math.max(1, Math.min(1000, Math.floor(Number(req.query.page) || 1)));
      const { data, error, count } = await query.order('created_at', { ascending: false }).range((page - 1) * 12, page * 12 - 1);
      if (error) throw error;
      if (id && !data.length) return res.status(404).json({ error: 'This item is not available.' });
      return res.json({ items: data, total: count });
    }
    const body = req.body || {};
    if (resource === 'collections') {
      if (req.method === 'DELETE') {
        if (!id) return res.status(400).json({ error: 'Collection ID is required.' });
        const { data, error } = await client.from(table).delete().eq('id', id).eq('user_id', user.id).select('id');
        if (error) throw error;
        if (!data.length) return res.status(404).json({ error: 'Collection not found.' });
        return res.json({ deleted: true });
      }
      let title;
      try { title = textField(body.title, 'Collection name', 2, 80); } catch (error) { return res.status(400).json({ error: error.message }); }
      if (req.method === 'PATCH' && !id) return res.status(400).json({ error: 'Collection ID is required.' });
      const query = req.method === 'POST' ? client.from(table).insert({ title, user_id: user.id }) : client.from(table).update({ title }).eq('id', id).eq('user_id', user.id);
      const { data, error } = await query.select('*').maybeSingle();
      if (error) throw error;
      if (!data) return res.status(404).json({ error: 'Collection not found.' });
      return res.status(req.method === 'POST' ? 201 : 200).json({ item: data });
    }
    if (resource === 'bookmarks') {
      if (!isUuid(body.theory_id)) return res.status(400).json({ error: 'Choose a valid theory.' });
      if (body.collection_id != null && !isUuid(body.collection_id)) return res.status(400).json({ error: 'Choose a valid collection.' });
      if (req.method === 'PATCH') {
        const { data, error } = await client.from(table).update({ collection_id: body.collection_id || null }).eq('user_id', user.id).eq('theory_id', body.theory_id).select('theory_id');
        if (error) throw error;
        if (!data.length) return res.status(404).json({ error: 'Saved theory not found.' });
        return res.json({ saved: true });
      }
      const query = req.method === 'POST'
        ? client.from(table).upsert({ user_id: user.id, theory_id: body.theory_id }, { onConflict: 'user_id,theory_id' })
        : client.from(table).delete().eq('user_id', user.id).eq('theory_id', body.theory_id);
      const { error } = await query;
      if (error) throw error;
      return res.json({ saved: req.method === 'POST' });
    }
    if (resource === 'contact') {
      if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });
      let fields;
      try { fields = { subject: textField(body.subject, 'Subject', 5, 140), message: textField(body.message, 'Message', 20, 5000) }; }
      catch (error) { return res.status(400).json({ error: error.message }); }
      const { error } = await client.from(table).insert({ ...fields, user_id: user.id, email: user.email });
      if (error) throw error;
      return res.status(201).json({ saved: true });
    }
    if (req.method === 'DELETE') {
      if (!id) return res.status(400).json({ error: 'Item ID is required.' });
      const { data, error } = await client.from(table).delete().eq('id', id).eq('user_id', user.id).select('id');
      if (error) throw error;
      if (!data.length) return res.status(404).json({ error: 'Item not found or not owned by you.' });
      return res.json({ deleted: true });
    }
    let fields;
    try {
      fields = resource === 'theories' ? validateTheory(body) : validateGig(body);
      if (resource === 'gigs') fields.status = body.status === 'closed' ? 'closed' : 'open';
    } catch (error) { return res.status(400).json({ error: error.message }); }
    if (req.method === 'PATCH' && !id) return res.status(400).json({ error: 'Item ID is required.' });
    const query = req.method === 'POST'
      ? client.from(table).insert({ ...fields, user_id: user.id, author_name: String(user.user_metadata?.username || 'Ark member').slice(0, 40) })
      : client.from(table).update({ ...fields, updated_at: new Date().toISOString() }).eq('id', id).eq('user_id', user.id);
    const { data, error } = await query.select('*').maybeSingle();
    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Item not found or not owned by you.' });
    return res.status(req.method === 'POST' ? 201 : 200).json({ item: data });
  } catch {
    return res.status(503).json({ error: 'The community service could not complete this request. Please try again. If this continues, the database setup needs attention.' });
  }
}
