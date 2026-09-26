import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Screen, Notice, Empty } from '../../components/CommunityUI';
import { useAuth } from '../../src/lib/hooks/useAuth';
import { useResource } from '../../src/lib/hooks/useResource';
import { communityRequest } from '../../src/lib/community-client';

export default function TheoryDetail() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const id = typeof router.query.id === 'string' ? router.query.id : '';
  const mine = router.query.mine === 'true';
  const data = useResource(`theories?id=${id}${mine ? '&mine=true' : ''}`, !!id && !isLoading);
  const bookmarks = useResource('bookmarks', !!user);
  const theory = data.items[0];
  const [revealed, setRevealed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [message, setMessage] = useState('');
  useEffect(() => { setRevealed(false); setConfirmDelete(false); setMessage(''); setError(''); }, [id]);
  const saved = bookmarks.items.some(item => item.theory_id === id);
  async function toggleSave() {
    setBusy(true); setError('');
    try { await communityRequest('bookmarks', { method: saved ? 'DELETE' : 'POST', body: { theory_id: id } }); bookmarks.reload(); setMessage(saved ? 'Removed from your saved theories.' : 'Added to your saved theories.'); }
    catch (error) { setError(error.message); } finally { setBusy(false); }
  }
  async function remove() {
    setBusy(true); setError('');
    try { await communityRequest(`theories?id=${id}`, { method: 'DELETE' }); await router.push('/account/fan'); }
    catch (error) { setError(error.message); setBusy(false); }
  }
  return <Screen title={theory?.title || 'Theory'} intro={theory ? `${theory.series} · By ${theory.author_name} · ${theory.status === 'draft' ? 'Private draft' : 'Published theory'}` : 'Read a fan’s interpretation of the story.'}>
    {data.loading || isLoading ? <Notice>Loading theory…</Notice> : data.error ? <Notice error>{data.error} <Link href="/theories">Back to theories</Link></Notice> : !theory ? <Empty title="Theory unavailable.">It may be private or no longer published.</Empty> : <article className="ark-reading">
      {error && <Notice error>{error}</Notice>}{message && <Notice>{message}</Notice>}
      {theory.spoiler && !revealed ? <div className="ark-empty"><span className="ark-chip spoiler">Spoiler warning</span><h2>This theory contains spoilers.</h2><p>This analysis discusses plot details from {theory.series}.</p><button className="ark-button mt-6" onClick={() => setRevealed(true)}>Reveal theory</button></div> : <><p className="ark-reading-summary">{theory.summary}</p><div className="ark-reading-body">{theory.content}</div></>}
      <div className="flex flex-wrap gap-3 mt-8">{user ? <button className="ark-button" onClick={toggleSave} aria-pressed={saved} disabled={busy || bookmarks.loading || !!bookmarks.error}>{saved ? 'Remove from saved' : 'Save theory'}</button> : <Link className="ark-button" href="/login">Sign in to save</Link>}<Link className="ark-button secondary" href="/theories">All theories</Link>{user?.id === theory.user_id && <><Link className="ark-button secondary" href={`/submit-theory?edit=${id}`}>Edit theory</Link><button className="ark-danger" onClick={() => setConfirmDelete(true)}>Delete theory</button></>}</div>
      {bookmarks.error && <Notice error>{bookmarks.error} <button onClick={bookmarks.reload}>Reload saved state</button></Notice>}
      {confirmDelete && <div className="ark-notice" role="alert"><p>Delete this theory permanently? This also removes it from saved lists.</p><div className="flex gap-4 mt-3"><button className="ark-danger" disabled={busy} onClick={remove}>Confirm deletion</button><button onClick={() => setConfirmDelete(false)}>Keep theory</button></div></div>}
    </article>}
  </Screen>;
}
