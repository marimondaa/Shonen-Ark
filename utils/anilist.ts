// Placeholder function to fetch data from AniList API
export async function fetchAniList(query: string, variables: Record<string, any> = {}) {
  const url = 'https://graphql.anilist.co'
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables })
  })
  if (!res.ok) throw new Error('AniList request failed')
  const json = await res.json()
  return json.data
}
