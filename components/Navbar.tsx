import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppearance } from '../src/lib/hooks/useAppearance';
const links = [
  { label: 'Home', href: '/' },
  { label: 'Theories', href: '/theories', child: { label: 'Saved', href: '/collections' } },
  { label: 'Discovery', href: '/discovery', child: { label: 'Characters', href: '/characters' } },
  { label: 'Gigs', href: '/gigs' }, { label: 'Calendar', href: '/calendar' },
];
interface Props { isAuthenticated?: boolean; username?: string; onLogout?: () => void; }
export function Navbar({ isAuthenticated, username, onLogout }: Props) {
  const router = useRouter();
  const { dark, choice, appearance } = useAppearance();
  const [mobile, setMobile] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const header = useRef<HTMLElement>(null);
  const menu = useRef<HTMLButtonElement>(null);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});
  useEffect(() => { setMobile(false); setOpen(null); }, [router.asPath]);
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (open) { triggers.current[open]?.focus(); setOpen(null); }
      else if (mobile) { menu.current?.focus(); setMobile(false); }
    };
    const outside = (event: PointerEvent) => { if (!header.current?.contains(event.target as Node)) { setOpen(null); setMobile(false); } };
    document.addEventListener('keydown', key); document.addEventListener('pointerdown', outside);
    return () => { document.removeEventListener('keydown', key); document.removeEventListener('pointerdown', outside); };
  }, [open, mobile]);
  return <header className="ink-header" ref={header} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(null); }}>
    <Link className="ink-brand" href="/" aria-label="Shonen Ark home">Shonen Ark<span aria-hidden="true"> / </span></Link>
    <button className="ink-menu-toggle" ref={menu} aria-expanded={mobile} aria-controls="ink-navigation" onClick={() => { setMobile(!mobile); setOpen(null); }}>Menu <span aria-hidden="true">{mobile ? '−' : '+'}</span></button>
    <nav id="ink-navigation" aria-label="Main navigation" className={`ink-navigation ${mobile ? 'is-open' : ''}`} onClick={event => { if ((event.target as Element).closest('a')) { setMobile(false); setOpen(null); } }}>
      {links.map(item => <div className="ink-nav-item" key={item.label}><div className="ink-nav-pair">
        <Link className="ink-nav-link" href={item.href} aria-current={router.pathname === item.href ? 'page' : undefined}>{item.label}</Link>
        {item.child && <button ref={node => { triggers.current[item.label] = node; }} aria-label={`${item.label} submenu`} aria-expanded={open === item.label} aria-controls={`ink-sub-${item.label}`} onClick={() => setOpen(open === item.label ? null : item.label)}>⌄</button>}
      </div>{item.child && <div className="ink-submenu" id={`ink-sub-${item.label}`} hidden={open !== item.label}><Link href={item.child.href} aria-current={router.pathname === item.child.href ? 'page' : undefined}>{item.child.label}</Link>{item.label === 'Discovery' && <Link href="/calendar" aria-current={router.pathname === '/calendar' ? 'page' : undefined}>Calendar</Link>}</div>}</div>)}
      <div className="ink-nav-item ink-account"><button ref={node => { triggers.current.Account = node; }} aria-expanded={open === 'Account'} aria-controls="ink-account" onClick={() => setOpen(open === 'Account' ? null : 'Account')}>Account ⌄</button>
        <div id="ink-account" className="ink-submenu" hidden={open !== 'Account'}>{isAuthenticated ? <><Link href="/account/fan">{username || 'My Ark'}</Link><button onClick={() => { onLogout?.(); setOpen(null); }}>Sign out</button></> : <><Link href="/login">Sign in</Link><Link href="/register">Create account</Link></>}</div>
      </div>
    </nav>
    <div className="ink-appearance"><button aria-label="Dark appearance" aria-pressed={dark} onClick={() => appearance(dark ? 'light' : 'dark')}>{dark ? '◐ Dark' : '◑ Light'}</button><button className="ink-system" disabled={!choice} onClick={() => appearance(null)} aria-label="Use device appearance">Auto</button></div>
  </header>;
}
