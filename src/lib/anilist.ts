// Lightweight AniList GraphQL client helpers
// Uses public AniList GraphQL endpoint (no API key required)

const ANILIST_ENDPOINT = 'https://graphql.anilist.co';

export type AniListMedia = {
  id: number;
  idMal?: number | null;
  title: { romaji?: string | null; english?: string | null; native?: string | null };
  format?: string | null;
  type?: 'ANIME' | 'MANGA';
  status?: string | null;
  genres?: string[] | null;
  episodes?: number | null;
  chapters?: number | null;
  volumes?: number | null;
  averageScore?: number | null;
  popularity?: number | null;
  season?: string | null;
  seasonYear?: number | null;
  description?: string | null;
  coverImage?: { extraLarge?: string | null; large?: string | null; color?: string | null } | null;
  bannerImage?: string | null;
};

export type PageInfo = {
  total?: number | null;
  perPage?: number | null;
  currentPage?: number | null;
  lastPage?: number | null;
  hasNextPage?: boolean | null;
};

export type AniListPage<T> = { pageInfo: PageInfo; data: T[] };

async function gql<T>(query: string, variables?: Record<string, any>): Promise<T> {
  const res = await fetch(ANILIST_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ query, variables })
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`AniList error: ${res.status} ${text}`);
  }
  const json = await res.json();
  if (json.errors) throw new Error(json.errors?.[0]?.message || 'AniList GraphQL error');
  return json.data as T;
}

export async function searchMedia(params: {
  query?: string;
  type?: 'ANIME' | 'MANGA';
  sort?: 'SCORE_DESC' | 'POPULARITY_DESC' | 'TRENDING_DESC' | 'START_DATE_DESC' | 'UPDATED_AT_DESC';
  page?: number;
  perPage?: number;
  genreIn?: string[];
} = {}): Promise<AniListPage<AniListMedia>> {
  const { query: search, type = 'ANIME', sort = 'START_DATE_DESC', page = 1, perPage = 12, genreIn } = params;
  const QUERY = `
    query ($page: Int, $perPage: Int, $search: String, $type: MediaType, $sort: [MediaSort], $genreIn: [String]) {
      Page(page: $page, perPage: $perPage) {
        pageInfo { total perPage currentPage lastPage hasNextPage }
        media(search: $search, type: $type, sort: $sort, genre_in: $genreIn) {
          id idMal type format status genres episodes chapters volumes averageScore popularity season seasonYear bannerImage
          title { romaji english native }
          coverImage { extraLarge large color }
          description
        }
      }
    }
  `;
  const data = await gql<{ Page: { pageInfo: PageInfo; media: AniListMedia[] } }>(QUERY, {
    page, perPage, search, type, sort, genreIn
  });
  return { pageInfo: data.Page.pageInfo, data: data.Page.media };
}

export async function trendingAnime(page = 1, perPage = 12) {
  return searchMedia({ type: 'ANIME', sort: 'TRENDING_DESC', page, perPage });
}

export async function popularAnime(page = 1, perPage = 12) {
  return searchMedia({ type: 'ANIME', sort: 'POPULARITY_DESC', page, perPage });
}

export async function newestAnime(page = 1, perPage = 12) {
  return searchMedia({ type: 'ANIME', sort: 'START_DATE_DESC', page, perPage });
}
