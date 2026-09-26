import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getSupabaseClient } from '../src/lib/supabase-client';
import { useAuth } from '../src/lib/hooks/useAuth';
import { Screen, Notice } from './CommunityUI';

const titles = { login: 'Sign in.', register: 'Create your account.', forgot: 'Reset your password.', reset: 'Choose a new password.' };
export default function AuthScreen({ mode }) {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const configured = !!getSupabaseClient();
  async function submit(event) {
    event.preventDefault(); setError(''); setMessage(''); setBusy(true);
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') || '').trim();
    const password = String(form.get('password') || '');
    try {
      const client = getSupabaseClient();
      if (!client) throw new Error('Account services are not connected yet.');
      if (['register', 'reset'].includes(mode) && password !== form.get('confirm')) throw new Error('Passwords do not match.');
      if (mode === 'login') {
        const { error } = await client.auth.signInWithPassword({ email, password });
        if (error) throw error;
        await router.push('/account/fan');
      } else if (mode === 'register') {
        const username = String(form.get('username')).trim();
        if (!/^[\p{L}\p{N}_ -]{3,30}$/u.test(username)) throw new Error('Use 3–30 letters, numbers, spaces, hyphens or underscores for your name.');
        const { data, error } = await client.auth.signUp({ email, password, options: { data: { username }, emailRedirectTo: `${window.location.origin}/account/fan` } });
        if (error) throw error;
        if (data.session) await router.push('/account/fan');
        else setMessage('Check your email for a confirmation link. If this address already has an account, try signing in.');
      } else if (mode === 'forgot') {
        const { error } = await client.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
        if (error) throw error;
        setMessage('If this address has an account, a password reset email will arrive shortly.');
      } else {
        const { error } = await client.auth.updateUser({ password });
        if (error) throw error;
        setMessage('Your password has been updated. You can return to My Ark.');
      }
    } catch (error) { setError(error.message || 'Account request failed. Please try again.'); }
    finally { setBusy(false); }
  }
  return <Screen title={titles[mode]} intro={mode === 'register' ? 'Publish theories and keep a private collection of the ones you want to read again.' : mode === 'login' ? 'Return to your drafts, published theories and saved reading.' : 'Use your account email to recover access. Never share your password or recovery link.'}>
    <div className="ark-form-wrap">
      {!configured && <Notice>Account services are not connected yet. You can still explore anime, characters and the release calendar.</Notice>}
      {error && <Notice error>{error}</Notice>}{message && <Notice>{message}</Notice>}
      {mode === 'reset' && !isLoading && !user ? <Notice>Open the recovery link in your email first. <Link href="/forgot-password">Request another link</Link>.</Notice> : <form onSubmit={submit} className="ark-form">
        {mode === 'register' && <label>Display name<input name="username" autoComplete="nickname" minLength={3} maxLength={30} required /></label>}
        {mode !== 'reset' && <label>Email<input name="email" type="email" autoComplete="email" maxLength={254} required /></label>}
        {mode !== 'forgot' && <label>Password<input name="password" type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} minLength={mode === 'login' ? 1 : 12} maxLength={128} required />{mode !== 'login' && <small>Use at least 12 characters.</small>}</label>}
        {['register', 'reset'].includes(mode) && <label>Confirm password<input name="confirm" type="password" autoComplete="new-password" minLength={12} maxLength={128} required /></label>}
        {mode === 'register' && <><p className="text-sm text-text-secondary">Use a nickname, not your legal name. Your name appears on published theories and gigs. <Link href="/privacy">How account data is used</Link>.</p><label className="ark-checkbox"><input type="checkbox" required />I have read the <Link href="/terms">preview usage information</Link>.</label></>}
        <button className="ark-button" disabled={!configured || busy || isLoading}>{busy ? 'Please wait…' : { login: 'Sign in', register: 'Create account', forgot: 'Send recovery email', reset: 'Update password' }[mode]}</button>
      </form>}
      <nav aria-label="Account help" className="flex flex-wrap gap-5 mt-6 text-sm"><Link href="/login">Sign in</Link><Link href="/register">Create account</Link><Link href="/forgot-password">Forgot password?</Link>{user && <Link href="/account/fan">My Ark</Link>}</nav>
    </div>
  </Screen>;
}
