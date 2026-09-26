import { createContext, useContext, useState, useEffect } from 'react';
import { getSupabaseClient } from '../supabase-client';

const AuthContext = createContext(null);
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  useEffect(() => {
    const client = getSupabaseClient();
    if (!client) { setLoading(false); return; }
    let active = true;
    client.auth.getSession().then(({ data, error }) => {
      if (!active) return;
      setUser(data.session?.user || null);
      if (error) setAuthError('Your session could not be restored. Please sign in again.');
      setLoading(false);
    }).catch(() => { if (active) { setAuthError('Could not connect to account services.'); setLoading(false); } });
    const { data } = client.auth.onAuthStateChange((_event, session) => {
      if (active) { setUser(session?.user || null); setLoading(false); }
    });
    return () => { active = false; data.subscription.unsubscribe(); };
  }, []);
  const logout = async () => {
    setAuthError('');
    const client = getSupabaseClient();
    if (!client) return;
    const { error } = await client.auth.signOut();
    if (error) { setAuthError('Sign out failed. Please try again.'); return; }
    setUser(null);
  };
  return <AuthContext.Provider value={{ user, isLoading, authError, logout, isAuthenticated: () => !!user, isAdmin: () => user?.app_metadata?.role === 'admin' }}>{children}</AuthContext.Provider>;
}
export default AuthContext;
