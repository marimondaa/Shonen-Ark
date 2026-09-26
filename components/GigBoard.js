import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Screen, Notice, Empty, Pagination, SignInNotice } from './CommunityUI';
import { useAuth } from '../src/lib/hooks/useAuth';
import { useResource } from '../src/lib/hooks/useResource';
import { communityRequest } from '../src/lib/community-client';
import { validateGig } from '../src/lib/community-validation';

const blank = { title: '', description: '', budget: '', contact_url: '', status: 'open' };
export default function GigBoard() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const mine = router.query.mine === 'true';
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  useEffect(() => { setEditing(null); setForm(blank); setError(''); setMessage(''); }, [user?.id]);
  const data = useResource(`gigs?${new URLSearchParams({ mine: String(mine), page: String(page), search: query })}`, !mine || !!user);
  useEffect(() => { setPage(1); }, [mine]);
  function change(event) { setForm(previous => ({ ...previous, [event.target.name]: event.target.value })); }
  async function save(event) {
    event.preventDefault(); setBusy(true); setError(''); setMessage('');
    try {
      const fields = { ...validateGig(form), status: form.status };
      await communityRequest(`gigs${editing?.id ? `?id=${editing.id}` : ''}`, { method: editing?.id ? 'PATCH' : 'POST', body: fields });
      setEditing(null); setForm(blank); setMessage('Your gig has been saved.'); data.reload();
    } catch (error) { setError(error.message); } finally { setBusy(false); }
  }
  return <Screen title="Creator gigs." intro="Find collaborators, post an opportunity and connect directly. No payments are processed here." action={user ? <button className="ark-button" onClick={() => { setEditing({}); setForm(blank); setError(''); }}>Post a gig ↗</button> : <Link className="ark-button" href="/login">Sign in to post</Link>}>
    <div className="flex gap-5 mb-5 text-sm"><Link href="/gigs" aria-current={!mine ? 'page' : undefined}>Open opportunities</Link><Link href="/gigs?mine=true" aria-current={mine ? 'page' : undefined}>My gigs</Link></div>
    {error && <Notice error>{error}</Notice>}{message && <Notice>{message}</Notice>}
    {editing && user && <form className="ark-form mb-8" onSubmit={save}><h2 className="text-xl">{editing.id ? 'Edit opportunity' : 'New opportunity'}</h2><label>Title<input name="title" value={form.title} onChange={change} minLength={5} maxLength={140} required /></label><label>Description<textarea name="description" value={form.description} onChange={change} rows={5} minLength={30} maxLength={5000} required /></label><label>Budget and currency<input name="budget" placeholder="e.g. CAD 200 fixed, or unpaid collaboration" value={form.budget} onChange={change} minLength={2} maxLength={80} required /></label><label>HTTPS contact or application URL<input name="contact_url" type="url" placeholder="https://…" value={form.contact_url} onChange={change} maxLength={500} required /><small>Use a public portfolio contact page or application form. This link is public.</small></label><label>Status<select name="status" value={form.status} onChange={change}><option value="open">Open</option><option value="closed">Closed — visible only to you</option></select></label><div className="flex gap-4"><button className="ark-button" disabled={busy}>{busy ? 'Saving…' : 'Save gig'}</button><button type="button" disabled={busy} onClick={() => setEditing(null)}>Cancel</button></div></form>}
    <form className="ark-toolbar" onSubmit={event => { event.preventDefault(); setQuery(search); setPage(1); }}><label className="grow">Search opportunities<input type="search" value={search} onChange={event => setSearch(event.target.value)} maxLength={100} /></label><button className="ark-button">Search</button></form>
    {isLoading || data.loading ? <Notice>Loading gigs…</Notice> : mine && !user ? <SignInNotice /> : data.error ? <Notice error>{data.error}<button onClick={data.reload}>Try again</button></Notice> : data.items.length ? <><div className="ark-grid">{data.items.map(gig => <article className="ark-content-card" key={gig.id}><span className="ark-chip self-start">{gig.status === 'closed' ? 'Closed' : gig.budget}</span><h2>{gig.title}</h2><p className="whitespace-pre-wrap">{gig.description}</p><div className="ark-card-meta"><span>Posted by {gig.author_name}</span></div><a href={gig.contact_url} target="_blank" rel="noopener noreferrer" className="ark-button secondary mt-5">Contact / apply ↗</a>{user?.id === gig.user_id && <button className="mt-4 text-sm text-brand-secondary" onClick={() => { setEditing(gig); setForm(gig); window.scrollTo({ top: 0, behavior: 'auto' }); }}>Edit or close gig</button>}</article>)}</div><Pagination page={page} total={data.total} onChange={setPage} /></> : <Empty title="No matching opportunities.">No opportunities match this view. Try a different search or post your own gig.</Empty>}
  </Screen>;
}
