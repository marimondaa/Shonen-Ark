import { useState } from 'react';
import Link from 'next/link';
import { Screen, Notice, Empty, Pagination, TheoryCard } from '../components/CommunityUI';
import { useResource } from '../src/lib/hooks/useResource';
import { SERIES } from '../src/lib/community-validation';

export default function Theories() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [series, setSeries] = useState('');
  const [page, setPage] = useState(1);
  const data = useResource(`theories?${new URLSearchParams({ search: query, series, page: String(page) })}`);
  return <Screen title="Fan theories." intro="Read how other fans connect the clues. Filter by series and choose when to reveal spoilers." action={<Link href="/submit-theory" className="ark-button">Write a theory ↗</Link>}>
    <form className="ark-toolbar" onSubmit={event => { event.preventDefault(); setQuery(search); setPage(1); }}><label className="grow">Search theories<input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="A title, an idea, a mystery…" maxLength={100} /></label><label>Series<select value={series} onChange={event => { setSeries(event.target.value); setPage(1); }}><option value="">All series</option>{SERIES.map(value => <option key={value}>{value}</option>)}</select></label><button className="ark-button">Search</button></form>
    {data.loading ? <Notice>Loading theories…</Notice> : data.error ? <Notice error>{data.error} <button onClick={data.reload}>Try again</button></Notice> : <><p className="ark-results">{data.total} {data.total === 1 ? 'theory' : 'theories'} found</p>{data.items.length ? <div className="ark-grid">{data.items.map(theory => <TheoryCard key={theory.id} theory={theory} />)}</div> : <Empty title="No theories here yet.">{query || series ? 'No theories match these filters. Try another search or series.' : 'No published theories yet. Be the first to bring a new perspective.'}</Empty>}<Pagination page={page} total={data.total} onChange={setPage} /></>}
  </Screen>;
}
