import { useState } from 'react';
import { Screen, Notice, Empty, SignInNotice, TheoryCard } from '../../components/CommunityUI';
import { useAuth } from '../../src/lib/hooks/useAuth';
import { useResource } from '../../src/lib/hooks/useResource';
import { communityRequest } from '../../src/lib/community-client';

export default function Saved() {
  const { user, isLoading } = useAuth();
  const data = useResource('bookmarks', !!user);
  const collections = useResource('collections', !!user);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [filter, setFilter] = useState('all');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const current = collections.items.find(item => item.id === filter);
  async function act(resource, options) {
    setBusy(true); setError('');
    try { await communityRequest(resource, options); data.reload(); collections.reload(); return true; }
    catch (error) { setError(error.message); return false; } finally { setBusy(false); }
  }
  const items = data.items.filter(item => filter === 'all' || (filter === 'unfiled' ? !item.collection_id : item.collection_id === filter));
  return <Screen title="Your saved theories." intro="Keep theories together by series, question or reading mood. Your collections are private.">
    {error && <Notice error>{error}</Notice>}
    {isLoading ? <Notice>Restoring your session…</Notice> : !user ? <SignInNotice /> : <>
      <form className="ark-toolbar" onSubmit={async event => { event.preventDefault(); const form = event.currentTarget; const title = new FormData(form).get('title'); if (await act('collections', { method: 'POST', body: { title } })) form.reset(); }}><label className="grow">New collection<input name="title" placeholder="e.g. One Piece mysteries" minLength={2} maxLength={80} required /></label><button disabled={busy} className="ark-button">Create collection</button></form>
      <div className="ark-toolbar"><label className="grow">View collection<select value={filter} onChange={event => { setFilter(event.target.value); setConfirmDelete(false); }}><option value="all">All saved theories</option><option value="unfiled">Unfiled</option>{collections.items.map(collection => <option key={collection.id} value={collection.id}>{collection.title}</option>)}</select></label>{current && <button className="ark-danger" disabled={busy} onClick={() => setConfirmDelete(true)}>Delete collection</button>}</div>
      {confirmDelete && current && <Notice>Delete “{current.title}”? Theories will remain saved as unfiled.<button disabled={busy} onClick={async () => { if (await act(`collections?id=${current.id}`, { method: 'DELETE' })) { setFilter('all'); setConfirmDelete(false); } }}>Confirm deletion</button><button onClick={() => setConfirmDelete(false)}>Cancel</button></Notice>}
      {collections.error && <Notice error>{collections.error}<button onClick={collections.reload}>Reload collections</button></Notice>}
      {data.loading ? <Notice>Loading your saved theories…</Notice> : data.error ? <Notice error>{data.error}<button onClick={data.reload}>Try again</button></Notice> : items.length ? <div className="ark-grid">{items.map(item => <div key={item.theory_id}>{item.theory ? <TheoryCard theory={item.theory} /> : <Empty title="Theory unavailable.">The author may have made it private.</Empty>}<label className="block text-xs mt-4">Collection for {item.theory?.title || 'unavailable theory'}<select className="mt-2" value={item.collection_id || ''} disabled={busy || collections.loading || !!collections.error} onChange={event => act('bookmarks', { method: 'PATCH', body: { theory_id: item.theory_id, collection_id: event.target.value || null } })}><option value="">Unfiled</option>{collections.items.map(collection => <option key={collection.id} value={collection.id}>{collection.title}</option>)}</select></label><button className="text-sm mt-3 text-brand-secondary" disabled={busy} onClick={() => act('bookmarks', { method: 'DELETE', body: { theory_id: item.theory_id } })}>Remove from saved</button></div>)}</div> : <Empty title="No saved theories in this collection.">Open a theory and select Save theory, then organize it in a collection here.</Empty>}
    </>}
  </Screen>;
}
