import Link from 'next/link';

export function Footer() {
  return <footer className="ark-footer container-safe">
    <div><Link href="/" className="font-bold text-xl">Shonen Ark<span className="text-brand-primary">.</span></Link>
      <p className="text-sm text-text-muted mt-2">Anime, manga and the theories between them.</p></div>
    <nav aria-label="Footer" className="flex flex-wrap gap-6 text-sm">
      <Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/terms">Usage</Link><Link href="/privacy">Privacy</Link>
    </nav>
    <span className="text-xs text-text-muted">Independent fan project · 2026</span>
  </footer>;
}
