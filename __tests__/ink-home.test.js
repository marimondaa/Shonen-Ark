/** @jest-environment jsdom */
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { Simulate } from 'react-dom/test-utils';
import HomePreview from '../pages/home-preview';
import { AppearanceProvider } from '../src/lib/hooks/useAppearance';
import { Navbar } from '../components/Navbar';
import { dragonTarget } from '../src/lib/dragon-motion';
jest.mock('next/router', () => ({ useRouter: () => ({ pathname:'/', asPath:'/' }) }));

jest.mock('next/head', () => ({ __esModule: true, default: () => null }));
jest.mock('next/link', () => ({ __esModule: true, default: ({ children, ...props }) => <a {...props}>{children}</a> }));
let container, root, reduced, visibleCallback;
const key = 'shonen-ark-appearance';
beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  localStorage.clear(); reduced = false;
  window.matchMedia = jest.fn(query => ({ matches: query.includes('reduced-motion') ? reduced : true, addEventListener: jest.fn(), removeEventListener: jest.fn() }));
  global.IntersectionObserver = class { constructor(callback) { visibleCallback = callback; } observe() {} disconnect() {} };
  container = document.createElement('div'); document.body.appendChild(container); root = createRoot(container);
});
afterEach(async () => { await act(async () => root.unmount()); container.remove(); });
const render = () => act(async () => root.render(<AppearanceProvider><Navbar /><HomePreview /></AppearanceProvider>));
const button = name => container.querySelector(`button[aria-label="${name}"]`);

test('first visit respects dark device setting, and explicit choice persists', async () => {
  await render();
  expect(button('Dark appearance').getAttribute('aria-pressed')).toBe('true');
  await act(async () => Simulate.click(button('Dark appearance')));
  expect(localStorage.getItem(key)).toBe('light');
  expect(document.documentElement.dataset.theme).toBe('light');
  const reset = [...container.querySelectorAll('button')].find(node => node.textContent === 'Use device appearance');
  await act(async () => Simulate.click(reset));
  expect(localStorage.getItem(key)).toBe(null);
  expect(button('Dark appearance').getAttribute('aria-pressed')).toBe('true');
});
test('stored light choice overrides a dark device setting after mount', async () => {
  localStorage.setItem(key, 'light'); await render();
  expect(document.documentElement.dataset.theme).toBe('light');
});
test('reduced motion and offscreen state stop scene animations', async () => {
  reduced = true; await render();
  expect(container.querySelector('[data-motion]').dataset.motion).toBe('still');
  await act(async () => visibleCallback([{ isIntersecting: false }]));
  expect(container.querySelector('[data-motion]').dataset.motion).toBe('still');
});
test('keyboard escape closes submenu and preserves its mobile parent and focus', async () => {
  await render();
  const menu = container.querySelector('button[aria-controls="ink-navigation"]');
  await act(async () => Simulate.click(menu));
  const trigger = button('Theories submenu');
  await act(async () => Simulate.click(trigger));
  expect(container.querySelector('#ink-sub-Theories').hidden).toBe(false);
  await act(async () => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })));
  expect(container.querySelector('#ink-sub-Theories').hidden).toBe(true);
  expect(menu.getAttribute('aria-expanded')).toBe('true');
  expect(document.activeElement).toBe(trigger);
  expect(container.querySelector('#ink-sub-Theories a').getAttribute('href')).toBe('/collections');
  expect(container.querySelector('#ink-sub-Discovery a').getAttribute('href')).toBe('/characters');
});

test('tracking stays bounded and retreats close to the face', () => {
 const rect={left:500,top:100,width:600,height:600};
 expect(dragonTarget(100000,-100000,rect)).toEqual({x:24,y:-18});
 const near=dragonTarget(680,532,rect);
 expect(near.x).toBeLessThan(0);
 expect(dragonTarget(1000,650,rect).x).toBeGreaterThan(0);
});

test('pointer tracking reaches controls even when they stop bubbling', async () => {
  const frames = [];
  const raf = jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => { frames.push(callback); return frames.length; });
  await render();
  const art = container.querySelector('.ink-dragon').parentElement;
  art.getBoundingClientRect = () => ({ left:500,top:100,width:600,height:600 });
  const control = button('Dark appearance');
  control.addEventListener('pointermove', event => event.stopPropagation());
  const event = new Event('pointermove', { bubbles:true });
  Object.assign(event, { clientX:450, clientY:600, pointerType:'mouse' });
  await act(async () => { control.dispatchEvent(event); frames.shift()(16); });
  expect(Number.parseFloat(art.style.getPropertyValue('--look-x'))).toBeLessThan(0);
  await act(async () => visibleCallback([{ isIntersecting:false }]));
  expect(art.style.getPropertyValue('--look-x')).toBe('0px');
  raf.mockRestore();
});

test('a same-route navigation link closes the mobile menu',async()=>{
 await render();const menu=container.querySelector('button[aria-controls="ink-navigation"]');
 await act(async()=>Simulate.click(menu));
 const home=container.querySelector('.ink-navigation a[href="/"]');
 await act(async()=>Simulate.click(home));
 expect(menu.getAttribute('aria-expanded')).toBe('false');
 expect(container.querySelector('#ink-sub-Discovery a[href="/calendar"]')).not.toBeNull();
});
