import { useEffect, useMemo, useRef, useState } from 'react';
import { Screen, Notice, Empty } from './CommunityUI';
import { localDay, weekDates } from '../src/lib/calendar-dates';

const titleOf = media => media.title?.english || media.title?.romaji || 'Untitled series';
export default function ReleaseCalendar() {
  const [today, setToday] = useState(null), [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1), [revision, setRevision] = useState(0);
  const [items, setItems] = useState([]), [more, setMore] = useState(false);
  const [loading, setLoading] = useState(true), [error, setError] = useState('');
  const [retryAt, setRetryAt] = useState(0), [search, setSearch] = useState(''), [format, setFormat] = useState('all'), [upcoming, setUpcoming] = useState(false);
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  useEffect(() => { setToday(new Date()); const timer = setInterval(() => setToday(new Date()), retryAt ? 1000 : 30000); return () => clearInterval(timer); }, [retryAt]);
  const dates = today ? weekDates(today, offset) : [];
  const from = dates[0]?.getTime() / 1000, to = dates[7]?.getTime() / 1000;
  const zone = today ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'Detecting your timezone…';
  useEffect(() => {
    if (!from || !to) return;
    const abort = new AbortController();
    setLoading(true); setError('');
    if (page === 1) { setItems([]); setMore(false); }
    fetch(`/api/schedule?from=${from}&to=${to}&page=${page}`, { signal:abort.signal })
      .then(async response => { const data = await response.json(); if (!response.ok) { setRetryAt(Date.now() + Number(data.retryAfter || 0) * 1000); throw new Error(data.error || 'Schedule unavailable.'); } return data; })
      .then(data => { setItems(previous => page === 1 ? data.items : [...previous, ...data.items.filter(item => !previous.some(old => old.id === item.id))]); setMore(data.hasNextPage); setRetryAt(0); })
      .catch(cause => { if (!abort.signal.aborted) setError(cause.message); })
      .finally(() => { if (!abort.signal.aborted) setLoading(false); });
    return () => abort.abort();
  }, [from, to, page, revision]);
  useEffect(() => { if (selected) dialog.current?.showModal(); }, [selected]);
  const filtered = useMemo(() => items.filter(item => titleOf(item.media).toLocaleLowerCase().includes(search.toLocaleLowerCase().trim()) && (format === 'all' || item.media.format === format) && (!upcoming || item.airingAt * 1000 >= (today?.getTime() || 0))), [items, search, format, upcoming, today]);
  function changeWeek(value) { setOffset(value); setPage(1); }
  const wait = Math.max(0, Math.ceil((retryAt - (today?.getTime() || 0)) / 1000));
  const fullDate = date => date.toLocaleDateString(undefined, { weekday:'long', month:'long', day:'numeric', year:'numeric' });
  const time = timestamp => new Date(timestamp * 1000).toLocaleTimeString(undefined, { hour:'numeric', minute:'2-digit', timeZoneName:'short' });
  return <Screen title="Calendar" intro="Plan your next watch. Browse the airing times supplied by AniList, one week at a time.">
    <section className="release-calendar" aria-label="Anime release calendar">
      <div className="calendar-toolbar"><div><h2>{dates.length ? `${dates[0].toLocaleDateString(undefined,{month:'short',day:'numeric'})} – ${dates[6].toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'})}` : 'Your week'}</h2><p>Times shown in <strong>{zone}</strong>.</p></div><nav aria-label="Calendar weeks"><button disabled={offset <= -8} onClick={() => changeWeek(offset-1)}>Previous week</button><button onClick={() => changeWeek(0)} disabled={offset === 0}>Today</button><button disabled={offset >= 8} onClick={() => changeWeek(offset+1)}>Next week</button></nav></div>
      <p className="calendar-source">Original broadcast times, not guaranteed availability on your streaming service. Dates may change; missing listings do not mean no episodes will air. <a href="https://anilist.co" target="_blank" rel="noreferrer">Source: AniList ↗</a></p>
      <div className="calendar-filters"><label>Search loaded titles<input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Find a series" /></label><label>Format<select value={format} onChange={event => setFormat(event.target.value)}><option value="all">All formats</option>{['TV','TV_SHORT','MOVIE','SPECIAL','OVA','ONA','MUSIC'].map(value => <option key={value} value={value}>{value.replace('_',' ')}</option>)}</select></label><label className="calendar-check"><input type="checkbox" checked={upcoming} onChange={event => setUpcoming(event.target.checked)} /> Upcoming only</label></div>
      <div aria-live="polite" aria-atomic="true">{loading && <Notice>Loading {page > 1 ? 'more listings' : 'the week'}…</Notice>}{!loading && !error && <p>{filtered.length} matching listings loaded.{more ? ' This week has more listings. Load them below to include them in your search.' : ''}</p>}</div>
      {error && <Notice error>{error} <button disabled={loading || wait > 0} onClick={() => setRevision(revision+1)}>{wait ? `Retry in ${wait}s` : 'Try again'}</button></Notice>}
      {!loading && !error && !filtered.length && <Empty title={items.length ? 'No matching listings.' : 'No schedule supplied for this week.'}>{items.length ? 'Try another title, format, or turn off Upcoming only.' : 'Try another week. The source may not have announced these airings yet.'}</Empty>}
      <div className="calendar-agenda" aria-busy={loading}>{dates.slice(0,7).map(date => {
        const day = localDay(date), entries = filtered.filter(item => localDay(new Date(item.airingAt*1000)) === day);
        return <section key={day} className={`calendar-day ${today && day === localDay(today) ? 'is-today' : ''}`}><h3><time dateTime={day}>{fullDate(date)}</time>{today && day === localDay(today) && <span>Today</span>}</h3><div>{entries.length ? entries.map(item => <article className="calendar-entry" key={item.id}><time dateTime={new Date(item.airingAt*1000).toISOString()}>{time(item.airingAt)}</time><div><button className="calendar-title" onClick={() => setSelected(item)} aria-haspopup="dialog">{titleOf(item.media)}</button><p>{Number.isFinite(item.episode) && item.episode > 0 ? `Episode ${item.episode}` : 'Episode not supplied'} · {item.media.format?.replace('_',' ') || 'Format not supplied'}</p></div></article>) : <p className="calendar-no-listings">{loading ? 'Loading…' : more ? 'No matching listings loaded for this day yet.' : error ? 'Schedule unavailable.' : 'No matching listings supplied.'}</p>}</div></section>;
      })}</div>
      {more && <div className="calendar-more"><p>Filters cover loaded listings only. The source is requested in pages of 50.</p><button disabled={loading || !!error || page >= 10} onClick={() => setPage(page+1)}>Load more listings</button>{page >= 10 && <p>This limited preview stops at 500 listings. Check AniList for additional information.</p>}</div>}
    </section>
    <dialog className="calendar-dialog" ref={dialog} aria-labelledby="calendar-series-title" onClose={() => setSelected(null)} onCancel={() => setSelected(null)}>{selected && <><button className="calendar-close" onClick={() => dialog.current.close()}>Close series details</button><h2 id="calendar-series-title">{titleOf(selected.media)}</h2><p>{selected.media.title?.romaji !== titleOf(selected.media) ? selected.media.title?.romaji : ''}</p><dl><dt>Scheduled airing</dt><dd>{fullDate(new Date(selected.airingAt*1000))}, {time(selected.airingAt)} ({zone})</dd><dt>Episode</dt><dd>{selected.episode > 0 ? selected.episode : 'Not supplied'}{selected.media.episodes ? ` of ${selected.media.episodes}` : ' · total not supplied'}</dd><dt>Format / status</dt><dd>{selected.media.format?.replaceAll('_',' ') || 'Not supplied'} / {selected.media.status?.replaceAll('_',' ') || 'Not supplied'}</dd><dt>Genres</dt><dd>{selected.media.genres?.join(', ') || 'Not supplied'}</dd></dl><a className="ark-button" href={`https://anilist.co/anime/${selected.media.id}`} target="_blank" rel="noreferrer">View on AniList ↗</a><p>Read-only source details. Regional streaming availability is not provided.</p></>}</dialog>
  </Screen>;
}
