import Head from 'next/head';
import Link from 'next/link';
import { PageLayout } from './PageLayout';

export function Screen({ title, intro, action = null, children }) {
  return <PageLayout><Head><title>{`${title} — Shonen Ark`}</title></Head><header className="ark-page-header"><div><h1>{title}</h1><p>{intro}</p></div>{action}</header>{children}</PageLayout>;
}
export function Notice({ children, error = false }) { return <div className={`ark-notice ${error ? 'is-error' : ''}`} role={error ? 'alert' : 'status'}>{children}</div>; }
export function Empty({ title, children }) { return <div className="ark-empty"><h2>{title}</h2><p>{children}</p></div>; }
export function SignInNotice() { return <Notice><Link href="/login">Sign in</Link> to save, publish or manage your own content.</Notice>; }
export function Pagination({ page, total, onChange }) { return total > 12 ? <nav aria-label="Results pages" className="ark-pagination"><button disabled={page === 1} onClick={() => onChange(page - 1)}>Previous</button><span>Page {page} of {Math.ceil(total / 12)}</span><button disabled={page * 12 >= total} onClick={() => onChange(page + 1)}>Next</button></nav> : null; }
export function TheoryCard({ theory }) {
  return <article className="ark-content-card"><div className="flex justify-between gap-3"><span className="ark-chip">{theory.series}</span>{theory.spoiler && <span className="ark-chip spoiler">Spoilers</span>}</div><h2><Link href={`/theories/${theory.id}${theory.status === 'draft' ? '?mine=true' : ''}`}>{theory.title}</Link></h2><p>{theory.spoiler ? 'This theory contains spoilers. Open it to choose whether to reveal the analysis.' : theory.summary}</p><div className="ark-card-meta"><span>{theory.author_name}</span><span>{theory.status === 'draft' ? 'Draft · only you' : new Date(theory.created_at).toLocaleDateString('en-CA')}</span></div></article>;
}
