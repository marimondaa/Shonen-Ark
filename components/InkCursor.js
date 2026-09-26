import { useEffect, useRef, useState } from 'react';

export function NimbusCloud() {
  return <svg viewBox="0 0 40 24" aria-hidden="true" focusable="false"><path className="cloud-wind" d="M2 17H9M0 21H12" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/><path d="M12 19C5 19 5 12 11 11C10 5 19 3 22 8C27 4 33 8 32 12C39 12 39 19 32 19Z" fill="var(--cloud-fill)" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/><path d="M13 12C17 10 20 12 19 15M24 11C28 10 30 13 28 15" fill="none" stroke="currentColor" strokeWidth=".8" strokeLinecap="round"/></svg>;
}
export default function InkCursor() {
  const cloud = useRef(null);
  const [enabled, setEnabled] = useState(true);
  useEffect(() => {
    const node = cloud.current;
    const media = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let frame = 0, x = 0, y = 0, tx = 0, ty = 0, last = 0;
    const hide = () => { node.style.opacity = '0'; cancelAnimationFrame(frame); frame = 0; last = 0; };
    function draw(now) {
      const amount = 1 - Math.exp(-Math.min(last ? now-last : 16, 64)/110); last = now;
      x += (tx-x)*amount; y += (ty-y)*amount;
      const distance = Math.abs(tx-x)+Math.abs(ty-y);
      node.style.transform = `translate3d(${x}px,${y}px,0)`;
      node.style.setProperty('--wind', String(Math.min(.65, distance/60)));
      if (distance > .15) frame = requestAnimationFrame(draw);
      else { node.style.transform = `translate3d(${tx}px,${ty}px,0)`; node.style.setProperty('--wind','0'); frame = 0; last = 0; }
    }
    function move(event) {
      if (!enabled || !media.matches || event.pointerType !== 'mouse' || document.hidden || event.target?.closest?.('input,textarea,select,[contenteditable="true"]')) { hide(); return; }
      tx = Math.max(0, Math.min(event.clientX-15, innerWidth-30)); ty = Math.min(event.clientY+5, innerHeight-18);
      if (node.style.opacity !== '1') { x = tx; y = ty; }
      node.style.opacity = '1'; if (!frame) frame = requestAnimationFrame(draw);
    }
    document.addEventListener('pointermove', move, true); document.addEventListener('pointerleave', hide); document.addEventListener('keydown', hide); document.addEventListener('visibilitychange', hide); window.addEventListener('blur', hide); window.addEventListener('scroll', hide, true); media.addEventListener('change', hide);
    return () => { hide(); document.removeEventListener('pointermove', move, true); document.removeEventListener('pointerleave', hide); document.removeEventListener('keydown', hide); document.removeEventListener('visibilitychange', hide); window.removeEventListener('blur', hide); window.removeEventListener('scroll', hide, true); media.removeEventListener('change', hide); };
  }, [enabled]);
  return <><div className="ink-cursor-control container-safe"><button aria-pressed={enabled} onClick={() => setEnabled(!enabled)}>Cloud pointer effect: {enabled ? 'on' : 'off'}</button></div><span className="ink-cursor" ref={cloud} aria-hidden="true"><NimbusCloud /></span></>;
}
