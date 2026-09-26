/** @jest-environment jsdom */
import React, {act} from 'react';
import {createRoot} from 'react-dom/client';
import Calendar from '../components/ReleaseCalendar';
jest.mock('../components/CommunityUI',()=>({Screen:({children})=><main>{children}</main>,Notice:({children})=><div role="status">{children}</div>,Empty:({title,children})=><section><h2>{title}</h2>{children}</section>}));
let root,host; const original=global.fetch;
beforeEach(()=>{global.IS_REACT_ACT_ENVIRONMENT=true;host=document.createElement('div');document.body.appendChild(host);root=createRoot(host);});
afterEach(async()=>{await act(async()=>root.unmount());host.remove();global.fetch=original;});
const click=async text=>act(async()=>[...host.querySelectorAll('button')].find(button=>button.textContent===text).click());
test('week navigation, Today, error retry and empty schedule work without invented data',async()=>{
 global.fetch=jest.fn().mockResolvedValue({ok:true,json:async()=>({items:[],hasNextPage:false})});
 await act(async()=>root.render(<Calendar/>)); expect(host.textContent).toContain('No schedule supplied');
 const first=global.fetch.mock.calls[0][0]; await click('Next week'); expect(global.fetch.mock.calls[1][0]).not.toBe(first); await click('Today'); expect(global.fetch.mock.calls[2][0]).toBe(first);
 global.fetch.mockResolvedValueOnce({ok:false,json:async()=>({error:'Provider unavailable'})}); await click('Previous week'); expect(host.textContent).toContain('Provider unavailable'); await click('Try again'); expect(host.textContent).toContain('No schedule supplied');
});
