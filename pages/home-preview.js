import Head from 'next/head';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppearance } from '../src/lib/hooks/useAppearance';
import { dragonTarget } from '../src/lib/dragon-motion';
import InkDragon from '../components/InkDragon';
import styles from '../styles/ink-home.module.css';

export default function HomePreview() {
  const { dark, choice, appearance } = useAppearance();
  const [moving, setMoving] = useState(false);
  const [paused, setPaused] = useState(false);
  const [flame, setFlame] = useState(null);
  const hero = useRef(null);
  const art = useRef(null);
  const flameTimer = useRef(null);

  useEffect(() => {
    const element = hero.current, artwork = art.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let visible = true, frame = 0, timeout = 0, targetX = 0, targetY = 0, x = 0, y = 0, last = 0;
    const allowed = () => visible && !document.hidden && !reduce.matches && !paused;
    function stop() { cancelAnimationFrame(frame); frame = 0; clearTimeout(timeout); }
    function tick(time) {
      if (!allowed()) { stop(); return; }
      const factor = 1 - Math.exp(-Math.min(time - (last || time - 16), 40) / 360);
      last = time; x += (targetX - x) * factor; y += (targetY - y) * factor;
      artwork.style.setProperty('--look-x', `${x.toFixed(2)}px`);
      artwork.style.setProperty('--look-y', `${y.toFixed(2)}px`);
      artwork.style.setProperty('--look-angle', `${(x / 9).toFixed(2)}deg`);
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > .04) frame = requestAnimationFrame(tick);
      else frame = 0;
    }
    function start() { if (!frame && allowed()) { last = 0; frame = requestAnimationFrame(tick); } }
    function idle() { targetX = 0; targetY = 0; start(); }
    function track(event) {
      if (!allowed() || !pointer.matches || event.pointerType === 'touch') return;
      const rect = artwork.getBoundingClientRect();
      const target = dragonTarget(event.clientX, event.clientY, rect);
      targetX = target.x; targetY = target.y;
      clearTimeout(timeout); timeout = window.setTimeout(idle, 1100); start();
    }
    function sync() {
      setMoving(allowed());
      if (!allowed()) { stop(); x = y = targetX = targetY = 0; artwork.style.setProperty('--look-x', '0px'); artwork.style.setProperty('--look-y', '0px'); artwork.style.setProperty('--look-angle', '0deg'); }
    }
    const observer = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(([entry]) => { visible = entry.isIntersecting && entry.intersectionRatio >= .08; sync(); }, { threshold: .08, rootMargin: '-80px 0px 0px 0px' }) : null;
    observer?.observe(artwork); sync();
    document.addEventListener('pointermove', track, true); document.addEventListener('pointerleave', idle);
    document.addEventListener('visibilitychange', sync); reduce.addEventListener('change', sync);
    return () => { stop(); observer?.disconnect(); document.removeEventListener('pointermove', track, true); document.removeEventListener('pointerleave', idle); document.removeEventListener('visibilitychange', sync); reduce.removeEventListener('change', sync); };
  }, [paused]);
  useEffect(() => () => clearTimeout(flameTimer.current), []);

  const ignite = useCallback(event => {
    // Decoration starts before click. Links are never intercepted or delayed.
    if (event.button !== 0 || event.pointerType !== 'mouse' || paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 1050 || window.scrollY > 50) return;
    const scene = art.current.getBoundingClientRect(), target = event.currentTarget.getBoundingClientRect();
    const endX = target.right + 5, endY = target.bottom + 13;
    if (endX < scene.left || endX > innerWidth - 12 || target.top < 0) return;
    const startX = scene.left + scene.width * .22, startY = scene.top + scene.height * .70;
    if (startX < scene.left || startY > innerHeight) return;
    setFlame({ id: Date.now(), path: `path('M ${startX} ${startY} Q ${scene.right - 20} ${startY - 40} ${endX} ${endY}')` });
    clearTimeout(flameTimer.current); flameTimer.current = window.setTimeout(() => setFlame(null), 500);
  }, [paused]);

  useEffect(() => {
    const onNav = event => { const link = event.target.closest?.('.ink-nav-link'); if (link) ignite({ button: event.button, pointerType: event.pointerType, currentTarget: link }); };
    document.addEventListener('pointerdown', onNav);
    return () => document.removeEventListener('pointerdown', onNav);
  }, [ignite]);

  return <div className={styles.preview} data-theme={dark ? 'dark' : 'light'} data-motion={moving ? 'running' : 'still'}>
    <Head><title>Shonen Ark | Every story has another reading</title><meta name="robots" content="noindex,nofollow"/><meta name="description" content="Publish and explore anime and manga theories, discover stories and find fellow creators."/></Head>
      <section className={styles.hero} ref={hero} aria-labelledby="ink-title">
        <div className={styles.copy}><h1 id="ink-title">Every story<br />has another<br /> <span>reading.</span></h1><p>One clue. A different interpretation. A theory worth sharing.</p><p>Publish and explore anime and manga theories with fans who keep thinking after the final chapter.</p><div className={styles.actions}><Link href="/theories" className={styles.primary}>Explore theories <span aria-hidden="true">↗</span></Link><Link href="/submit-theory" className={styles.secondary}>Publish a theory <span aria-hidden="true">→</span></Link></div>
          <a href="#reading-room" className={styles.scrollLink}>Step into the reading room <span aria-hidden="true">↓</span></a>
        </div>
        <div className={styles.art} ref={art}><InkDragon /></div>
        <div className={styles.sceneControls}><button onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? 'Resume motion' : 'Pause motion'}</button><button disabled={!choice} onClick={() => appearance(null)}>Use device appearance</button><Link href="/design-preview">Typography &amp; components</Link></div>
      </section>
      <section id="reading-room" className={styles.readingRoom} aria-labelledby="room-title"><div><h2 id="room-title">The chapter ends.<br />The discussion stays open.</h2><p>Follow the details that caught your attention.</p></div><div className={styles.readingLinks}><Link href="/theories"><strong>Read a different interpretation</strong><span>Browse fan theories by series. Reveal spoilers when you’re ready.</span><b aria-hidden="true">↗</b></Link><Link href="/submit-theory"><strong>Put your evidence together</strong><span>Keep a private draft, then publish your theory.</span><b aria-hidden="true">↗</b></Link><Link href="/discovery"><strong>Find the next story</strong><span>Search anime and manga in the AniList catalog.</span><b aria-hidden="true">↗</b></Link></div></section>

    {flame && <span key={flame.id} aria-hidden="true" className={styles.fireball} style={{ offsetPath: flame.path }} />}
  </div>;
}
