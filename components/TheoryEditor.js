import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../src/lib/hooks/useAuth';
import { useResource } from '../src/lib/hooks/useResource';
import { communityRequest } from '../src/lib/community-client';
import { SERIES, validateTheory } from '../src/lib/community-validation';
import { Screen, Notice, SignInNotice } from './CommunityUI';

const blank = { title: '', summary: '', content: '', series: '', spoiler: false, status: 'draft' };
export default function TheoryEditor() {
  const router = useRouter();
  const id = typeof router.query.edit === 'string' ? router.query.edit : '';
  const { user, isLoading } = useAuth();
  const data = useResource(`theories?id=${id}&mine=true`, !!id && !!user);
  const [form, setForm] = useState(blank);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => { setForm(blank); setError(''); }, [user?.id]);
  useEffect(() => { if (data.items[0]) setForm(data.items[0]); }, [data.items]);
  useEffect(() => { if (!id) setForm(blank); }, [id]);
  function change(event) { const { name, value, checked, type } = event.target; setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value })); }
  async function save(event) {
    event.preventDefault(); setError(''); setBusy(true);
    try {
      const fields = validateTheory(form);
      const result = await communityRequest(`theories${id ? `?id=${id}` : ''}`, { method: id ? 'PATCH' : 'POST', body: fields });
      await router.push(`/theories/${result.item.id}${result.item.status === 'draft' ? '?mine=true' : ''}`);
    } catch (error) { setError(error.message); } finally { setBusy(false); }
  }
  return <Screen title={id ? 'Refine your theory.' : 'Write a theory.'} intro="Start with a claim, add your evidence and mark spoilers. Save a private draft or publish when ready.">
    {isLoading ? <Notice>Restoring your session…</Notice> : !user ? <SignInNotice /> : data.loading ? <Notice>Loading your draft…</Notice> : data.error ? <Notice error>{data.error}</Notice> : <div className="max-w-3xl mx-auto">{error && <Notice error>{error} Your text has been kept in this form.</Notice>}<form className="ark-form" onSubmit={save}>
      <label>Title<input name="title" value={form.title} onChange={change} minLength={5} maxLength={140} required /></label>
      <label>Series<select name="series" value={form.series} onChange={change} required><option value="">Choose a series</option>{SERIES.map(series => <option key={series}>{series}</option>)}</select></label>
      <label>Summary<textarea name="summary" value={form.summary} onChange={change} rows={3} minLength={10} maxLength={400} required /></label>
      <label>Your theory<textarea name="content" value={form.content} onChange={change} rows={14} minLength={50} maxLength={20000} required /><small>{form.content.length.toLocaleString()} / 20,000 characters. Plain text; references can be included in the text.</small></label>
      <label className="ark-checkbox"><input name="spoiler" type="checkbox" checked={form.spoiler} onChange={change} />Contains spoilers</label>
      <label>Visibility<select name="status" value={form.status} onChange={change}><option value="draft">Private draft — only you</option><option value="published">Published — everyone can read</option></select></label>
      <button className="ark-button" disabled={busy}>{busy ? 'Saving…' : form.status === 'draft' ? 'Save draft' : 'Publish theory'}</button>
    </form></div>}
  </Screen>;
}
