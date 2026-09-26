import { useState, useEffect } from 'react';
import { communityRequest } from '../community-client';
import { useAuth } from './useAuth';

export function useResource(resource, enabled = true) {
  const { user } = useAuth();
  const ownerId = user?.id || null;
  const [state, setState] = useState({ items: [], total: 0, loading: enabled, error: '' });
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    if (!enabled) { setState({ items: [], total: 0, loading: false, error: '' }); return; }
    const controller = new AbortController();
    setState({ items: [], total: 0, loading: true, error: '' });
    communityRequest(resource, { signal: controller.signal }).then(result => {
      if (!controller.signal.aborted) setState({ ...result, ownerId, loading: false, error: '' });
    }).catch(error => {
      if (!controller.signal.aborted) setState({ items: [], total: 0, ownerId, loading: false, error: error.message });
    });
    return () => controller.abort();
  }, [resource, enabled, revision, ownerId]);
  const current = enabled && state.ownerId !== ownerId ? { items: [], total: 0, loading: true, error: '' } : state;
  return { ...current, reload: () => setRevision(value => value + 1) };
}
