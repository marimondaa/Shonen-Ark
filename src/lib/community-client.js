import { getSupabaseClient } from './supabase-client';

export async function communityRequest(resource, options = {}) {
  const client = getSupabaseClient();
  const session = client ? (await client.auth.getSession()).data.session : null;
  const response = await fetch(`/api/community/${resource}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(session ? { Authorization: `Bearer ${session.access_token}` } : {}) },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'Request failed. Please try again.');
  return result;
}
