import { useState } from 'react';
import { Screen, Notice, SignInNotice } from '../components/CommunityUI';
import { useAuth } from '../src/lib/hooks/useAuth';
import { communityRequest } from '../src/lib/community-client';

export default function Contact() {
  const { user, isLoading } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  async function submit(event) {
    event.preventDefault(); setBusy(true); setError(''); setSaved(false);
    const form = event.currentTarget;
    const values = new FormData(form);
    try { await communityRequest('contact', { method: 'POST', body: { subject: values.get('subject'), message: values.get('message') } }); setSaved(true); form.reset(); }
    catch (error) { setError(error.message); } finally { setBusy(false); }
  }
  return <Screen title="Contact the project." intro="Report an issue, share feedback or ask about the project. Messages are stored privately for the project administrator; email delivery is not enabled.">
    {isLoading ? <Notice>Restoring your session…</Notice> : !user ? <SignInNotice /> : <div className="ark-form-wrap">{error && <Notice error>{error}</Notice>}{saved && <Notice>Your message has been saved for the project administrator. No email was sent.</Notice>}<form className="ark-form" onSubmit={submit}><p className="text-sm text-text-secondary">Reply address: {user.email}</p><label>Subject<input name="subject" minLength={5} maxLength={140} required /></label><label>Message<textarea name="message" minLength={20} maxLength={5000} rows={7} required /></label><button className="ark-button" disabled={busy}>{busy ? 'Saving message…' : 'Send message'}</button></form></div>}
  </Screen>;
}
