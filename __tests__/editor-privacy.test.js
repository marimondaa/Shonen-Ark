/** @jest-environment jsdom */
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { Simulate } from 'react-dom/test-utils';
import TheoryEditor from '../components/TheoryEditor';

let mockUser = { id: 'account-a' };
const mockResource = { items: [], loading: false, error: '' };
jest.mock('next/router', () => ({ useRouter: () => ({ query: {}, push: jest.fn() }) }));
jest.mock('../src/lib/hooks/useAuth', () => ({ useAuth: () => ({ user: mockUser, isLoading: false }) }));
jest.mock('../src/lib/hooks/useResource', () => ({ useResource: () => mockResource }));
jest.mock('../src/lib/community-client', () => ({ communityRequest: jest.fn() }));
jest.mock('../components/CommunityUI', () => ({
  Screen: ({ children }) => <div>{children}</div>,
  Notice: ({ children }) => <div>{children}</div>,
  SignInNotice: () => <p>Sign in</p>,
}));

test('an unsaved private theory does not reappear for a different signed-in account', async () => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  await act(async () => root.render(<TheoryEditor />));
  const input = container.querySelector('textarea[name="content"]');
  await act(async () => Simulate.change(input, { target: { name: 'content', value: 'Private draft from account A', type: 'textarea' } }));
  expect(input.value).toBe('Private draft from account A');
  mockUser = { id: 'account-b' };
  await act(async () => root.render(<TheoryEditor />));
  expect(container.querySelector('textarea[name="content"]').value).toBe('');
  await act(async () => root.unmount());
  container.remove();
});
