import { Navbar } from '../../../components/Navbar';
import { Footer } from '../../../components/Footer';
import { useAuth } from '../../lib/hooks/useAuth';
import { useRouter } from 'next/router';
import InkCursor from '../../../components/InkCursor';

export default function Layout({ children }) {
  const { user, logout, authError } = useAuth();
  const { pathname } = useRouter();
  const composition = pathname === '/theories/[id]' ? 'reading' : (pathname.split('/')[1] || 'home');
  return <div className={`ark-shell ark-edition page-${composition}`}>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Navbar isAuthenticated={!!user} username={user?.user_metadata?.username || 'My Ark'} onLogout={logout} />
    {authError && <p role="alert" className="ark-notice container-safe">{authError}</p>}
    <main id="main-content" tabIndex={-1}>{children}</main>
    <Footer />
    <InkCursor />
  </div>;
}
