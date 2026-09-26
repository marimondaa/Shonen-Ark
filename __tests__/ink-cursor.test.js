/** @jest-environment jsdom */
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import InkCursor from '../components/InkCursor';
let root, container, allowed;
beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true; allowed = true;
  window.matchMedia = () => ({ matches:allowed,addEventListener() {},removeEventListener() {} });
  container = document.createElement('div'); document.body.appendChild(container); root = createRoot(container);
});
afterEach(async () => { await act(async () => root.unmount()); container.remove(); });
async function move(node, pointerType='mouse') {
  const event = new Event('pointermove', { bubbles:true }); Object.assign(event, { clientX:100,clientY:100,pointerType });
  await act(async () => node.dispatchEvent(event));
}
test('cloud accompanies mouse links but never text fields or touch interaction', async () => {
  await act(async () => root.render(<><InkCursor /><a href="#sample">Home</a><input aria-label="Writing" /></>));
  const orb = container.querySelector('.ink-cursor');
  await move(container.querySelector('a')); expect(orb.style.opacity).toBe('1');
  await move(container.querySelector('input')); expect(orb.style.opacity).toBe('0');
  await move(container.querySelector('a'), 'touch'); expect(orb.style.opacity).toBe('0');
});
test('reduced motion or coarse pointer media prevents the effect', async () => {
  allowed = false;
  await act(async () => root.render(<><InkCursor /><a href="#sample">Home</a></>));
  await move(container.querySelector('a'));
  expect(container.querySelector('.ink-cursor').style.opacity).toBe('0');
});



test('cloud follows ordinary page space and stops after settling below the native pointer', async () => {
  const callbacks=[]; const original=window.requestAnimationFrame;
  window.requestAnimationFrame=callback=>{callbacks.push(callback);return callbacks.length;};
  await act(async()=>root.render(<><InkCursor/><p>Read a theory here</p></>));
  await move(container.querySelector('p'));
  const cloud=container.querySelector('.ink-cursor'); expect(cloud.style.opacity).toBe('1');
  callbacks.shift()(16); expect(cloud.style.transform).toBe('translate3d(85px,105px,0)'); expect(callbacks).toHaveLength(0);
  window.requestAnimationFrame=original;
});
