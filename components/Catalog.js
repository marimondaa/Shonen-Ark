import { useEffect, useState } from 'react';
import { Screen, Notice, Empty } from './CommunityUI';

export default function Catalog({ kind: initialKind = 'anime' }) {
  const [kind, setKind] = useState(initialKind);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('TRENDING_DESC');
  const [page, setPage] = useState(1);
  const [date, setDate] = useState('');
  const [revision, setRevision] = useState(0);
  const [state, setState] = useState({ items: [], loading: true, error: '', hasNextPage: false });
  const requestDate = kind === 'calendar' ? date : '';
  useEffect(() => { setDate(new Date().toISOString().slice(0, 10)); }, []);
  useEffect(() => {
    if (kind === 'calendar' && !requestDate) return;
    const controller = new AbortController();
    setState({ items: [], loading: true, error: '', hasNextPage: false });
    fetch(`/api/catalog?${new URLSearchParams({ kind, search: query, sort, page: String(page), date: requestDate })}`, { signal: controller.signal })
      .then(async response => { const data = await response.json(); if (!response.ok) throw new Error(data.error); return data; })
      .then(data => { if (!controller.signal.aborted) setState({ ...data, loading: false, error: '' }); })
      .catch(error => { if (!controller.signal.aborted) setState({ items: [], loading: false, error: error.message || 'Catalog unavailable.', hasNextPage: false }); });
    return () => controller.abort();
  }, [kind, query, sort, page, requestDate, revision]);
  const calendar = kind === 'calendar';
  const characters = kind === 'characters';
  function shiftDay(amount) {
    if (!date) return;
    setDate(new Date(Date.parse(`${date}T00:00:00Z`) + amount * 86400000).toISOString().slice(0, 10));
    setPage(1);
  }
  const title = calendar ? 'Anime airings.' : characters ? 'Character index.' : 'Your next long night.';
  const items = calendar ? state.items.filter(item => (item.media.title.english || item.media.title.romaji || '').toLowerCase().includes(search.toLowerCase())) : state.items;
  return <Screen title={title} intro={calendar ? 'Anime airings from AniList. Dates use UTC; displayed times use your device timezone. Schedules can change.' : characters ? 'Search characters and open their AniList profiles.' : 'Find an anime to watch or a manga to read. Search by title, compare community ratings, and open the full entry on AniList.'}>
    <form className="ark-toolbar" onSubmit={event => { event.preventDefault(); setQuery(search); setPage(1); }}>
      <label className="grow">{calendar ? 'Filter this page' : 'Search'}<input type="search" placeholder={characters ? 'Search a character…' : 'Search a title…'} value={search} onChange={event => setSearch(event.target.value)} maxLength={100} /></label>
      {calendar ? <label>Date (UTC)<input type="date" value={date} required onInput={event => { if (event.currentTarget.value) { setDate(event.currentTarget.value); setPage(1); } }} onChange={event => { if (event.target.value) { setDate(event.target.value); setPage(1); } }} /></label> : !characters && <><label>Format<select value={kind} onChange={event => { setKind(event.target.value); setPage(1); }}><option value="anime">Anime</option><option value="manga">Manga</option></select></label><label>Sort by<select value={sort} onChange={event => { setSort(event.target.value); setPage(1); }}><option value="TRENDING_DESC">Trending</option><option value="POPULARITY_DESC">Most popular</option><option value="SCORE_DESC">Highest rated</option></select></label></>}
      {!calendar && <button className="ark-button">Search</button>}
    </form>
    {calendar && <nav aria-label="Calendar days" className="ark-pagination"><button onClick={() => shiftDay(-1)}>Previous day</button><span>{date} UTC</span><button onClick={() => shiftDay(1)}>Next day</button></nav>}
    {state.loading ? <Notice>Connecting to AniList…</Notice> : state.error ? <Notice error>{state.error}<button onClick={() => setRevision(value => value + 1)}>Try again</button></Notice> : <><p className="ark-results">Source: AniList · {items.length} results on this page{calendar ? ' · Anime only; manga release schedules are not supplied.' : ''}</p>{items.length ? <div className="ark-grid">{items.map(item => {
      const media = calendar ? item.media : item;
      const name = characters ? media.name.full : media.title.english || media.title.romaji;
      return <article className="ark-content-card ark-catalog-card" key={item.id}>
        <div className={`ark-type-cover cover-${item.id % 3}`} aria-hidden="true"><span>{characters ? 'CHARACTER' : calendar ? 'ON AIR' : kind.toUpperCase()}</span><strong>{name}</strong><span>SHONEN ARK</span></div>
        <div className="ark-catalog-copy"><span className="ark-chip">{calendar ? `Episode ${item.episode}` : characters ? 'Character' : media.format?.replaceAll('_', ' ') || kind}</span><h2><a href={media.siteUrl} target="_blank" rel="noopener noreferrer">{name} ↗</a></h2>{calendar ? <p><time dateTime={new Date(item.airingAt * 1000).toISOString()}>{new Date(item.airingAt * 1000).toLocaleString(undefined, { weekday: 'short', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}</time></p> : !characters && <p>{media.genres?.slice(0, 3).join(' · ')}<br />{media.averageScore ? `${media.averageScore}% community score` : 'Not yet rated'}{media.seasonYear ? ` · ${media.seasonYear}` : ''}</p>}</div>
      </article>;
    })}</div> : <Empty title="No matching results.">Try another title or date.</Empty>}<nav className="ark-pagination" aria-label="Catalog pages"><button disabled={page === 1} onClick={() => setPage(value => value - 1)}>Previous</button><span>Page {page}</span><button disabled={!state.hasNextPage} onClick={() => setPage(value => value + 1)}>Next</button></nav></>}
    <p className="text-xs text-text-muted mt-8">Catalog data from <a href="https://anilist.co" target="_blank" rel="noopener noreferrer">AniList</a>. Title designs by Shonen Ark; official artwork is available on the source pages.</p>
  </Screen>;
}
