import { createContext, useContext, useEffect, useState } from 'react';
const Appearance = createContext(null);
export const appearanceKey = 'shonen-ark-appearance';
export function AppearanceProvider({ children }) {
  const [choice, setChoice] = useState(null);
  const [systemDark, setSystemDark] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const sync = () => setSystemDark(media.matches);
    const stored = () => { try { const value = localStorage.getItem(appearanceKey); setChoice(['light', 'dark'].includes(value) ? value : null); } catch { /* Session-only appearance remains usable. */ } };
    sync(); stored(); media.addEventListener('change', sync); window.addEventListener('storage', stored);
    return () => { media.removeEventListener('change', sync); window.removeEventListener('storage', stored); };
  }, []);
  const dark = choice ? choice === 'dark' : systemDark;
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.classList.toggle('light', !dark);
  }, [dark]);
  function appearance(value) {
    setChoice(value);
    try { if (value) localStorage.setItem(appearanceKey, value); else localStorage.removeItem(appearanceKey); } catch { /* Session-only fallback. */ }
  }
  return <Appearance.Provider value={{ dark, choice, appearance }}>{children}</Appearance.Provider>;
}
export function useAppearance() { return useContext(Appearance); }
