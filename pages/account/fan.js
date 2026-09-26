import { useState } from 'react';
import Link from 'next/link';
import { Screen, Notice, Empty, Pagination, SignInNotice, TheoryCard } from '../../components/CommunityUI';
import { useAuth } from '../../src/lib/hooks/useAuth';
import { useResource } from '../../src/lib/hooks/useResource';

export default function MyArk() {
  const { user, isLoading } = useAuth();
  const [page, setPage] = useState(1);
  const data = useResource(`theories?mine=true&page=${page}`, !!user);
  return <Screen title="Your writing desk." intro="Continue a private draft, revisit a published theory or start something new." action={<Link className="ark-button" href="/submit-theory">Write a theory ↗</Link>}>
    {isLoading ? <Notice>Restoring your session…</Notice> : !user ? <SignInNotice /> : <><div className="ark-notice">Signed in as {user.user_metadata?.username || 'Ark member'}. <Link href="/collections">Open your saved theories</Link> · <Link href="/gigs?mine=true">Manage your gigs</Link></div>{data.loading ? <Notice>Loading your theories…</Notice> : data.error ? <Notice error>{data.error}<button onClick={data.reload}>Try again</button></Notice> : data.items.length ? <><div className="ark-grid">{data.items.map(theory => <TheoryCard key={theory.id} theory={theory} />)}</div><Pagination page={page} total={data.total} onChange={setPage} /></> : <Empty title="No drafts or theories yet.">Start a theory and save it as a private draft until you are ready to publish.</Empty>}</>}
  </Screen>;
}
