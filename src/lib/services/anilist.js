// AniList API integration utilities
const ANILIST_API_URL = 'https://graphql.anilist.co';

export class AniListAPI {
  static async query(query, variables = {}) {
    try {
      const response = await fetch(ANILIST_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }
      
      return data.data;
    } catch (error) {
      console.error('AniList API Error:', error);
      throw error;
    }
  }

  // Get upcoming releases for calendar
  static async getUpcomingReleases(type = 'ANIME', limit = 50) {
    const query = `
      query ($type: MediaType, $perPage: Int) {
        Page(page: 1, perPage: $perPage) {
          pageInfo {
            hasNextPage
            total
          }
          media(status: RELEASING, type: $type, sort: POPULARITY_DESC) {
            id
            title {
              romaji
              english
              native
            }
            description
            episodes
            chapters
            status
            averageScore
            coverImage {
              large
              medium
            }
            nextAiringEpisode {
              episode
              timeUntilAiring
              airingAt
            }
            genres
            format
            season
            seasonYear
          }
        }
      }
    `;

    try {
      const data = await this.query(query, { type, perPage: limit });
      return data.Page.media.map(anime => ({
        id: anime.id,
        title: anime.title.english || anime.title.romaji || anime.title.native,
        description: anime.description,
        coverImage: anime.coverImage.large || anime.coverImage.medium,
        status: anime.status,
        score: anime.averageScore ? (anime.averageScore / 10).toFixed(1) : null,
        genres: anime.genres,
        format: anime.format,
        nextEpisode: anime.nextAiringEpisode?.episode || null,
        nextChapter: anime.chapters || null,
        releaseDate: anime.nextAiringEpisode?.airingAt 
          ? new Date(anime.nextAiringEpisode.airingAt * 1000).toISOString()
          : null,
        timeUntilAiring: anime.nextAiringEpisode?.timeUntilAiring || null
      }));
    } catch (error) {
      console.error('Failed to fetch upcoming releases:', error);
      return [];
    }
  }

  // Get currently airing anime
  static async getCurrentlyAiring(page = 1, perPage = 20) {
    const query = `
      query ($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          media(
            status: RELEASING
            type: ANIME
            format_in: [TV]
            sort: POPULARITY_DESC
          ) {
            id
            title {
              romaji
              english
            }
            description
            episodes
            nextAiringEpisode {
              airingAt
              episode
            }
            coverImage {
              medium
              large
            }
            genres
            averageScore
            popularity
            format
            studios {
              nodes {
                name
              }
            }
          }
        }
      }
    `;

    try {
      const data = await this.query(query, { page, perPage });
      return data.Page.media
        .filter(anime => anime)
        .map(anime => ({
          id: anime.id,
          title: anime.title.english || anime.title.romaji,
          coverImage: anime.coverImage.large || anime.coverImage.medium,
          episodes: anime.episodes,
          status: anime.status,
          format: anime.format,
          description: anime.description,
          genres: anime.genres || [],
          nextEpisode: anime.nextAiringEpisode?.episode,
          nextAiringAt: anime.nextAiringEpisode?.airingAt ? 
            new Date(anime.nextAiringEpisode.airingAt * 1000).toISOString() : null,
          startDate: anime.startDate
        }));
    } catch (error) {
      console.error('Failed to fetch currently airing anime:', error);
      return null;
    }
  }

  // Get upcoming anime releases
  static async getUpcomingAnime(page = 1, perPage = 20) {
    const query = `
      query ($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          airingSchedules(
            notYetAired: true
            sort: TIME
          ) {
            id
            airingAt
            episode
            media {
              id
              title {
                romaji
                english
              }
              coverImage {
                medium
                large
              }
              episodes
              status
              format
              startDate {
                year
                month
                day
              }
              description
              genres
            }
          }
        }
      }
    `;

    try {
      const data = await this.query(query, { page, perPage });
      return data.Page.airingSchedules
        .filter(schedule => schedule.media && schedule.airingAt)
        .map(schedule => ({
          id: schedule.media.id,
          title: schedule.media.title.english || schedule.media.title.romaji,
          coverImage: schedule.media.coverImage.large || schedule.media.coverImage.medium,
          airingAt: new Date(schedule.airingAt * 1000).toISOString(),
          episode: schedule.episode,
          episodes: schedule.media.episodes,
          status: schedule.media.status,
          format: schedule.media.format,
          description: schedule.media.description,
          genres: schedule.media.genres || [],
          startDate: schedule.media.startDate
        }))
        // TV-only filter: drop SPECIAL, ONA, OVA, TV_SHORT, MOVIE, etc.
        .filter(item => item.format === 'TV');
    } catch (error) {
      console.error('Failed to fetch upcoming anime:', error);
      return null; // Return null to trigger fallback
    }
  }

  // Get anime movies
  static async getAnimeMovies(page = 1, perPage = 20) {
    const query = `
      query ($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          media(
            format: MOVIE
            type: ANIME
            sort: START_DATE_DESC
          ) {
            id
            title {
              romaji
              english
            }
            coverImage {
              medium
              large
            }
            status
            format
            description
            genres
            startDate {
              year
              month
              day
            }
          }
        }
      }
    `;

    try {
      const data = await this.query(query, { page, perPage });
      return data.Page.media
        .filter(movie => movie)
        .map(movie => ({
          id: movie.id,
          title: movie.title.english || movie.title.romaji,
          coverImage: movie.coverImage.large || movie.coverImage.medium,
          status: movie.status,
          format: movie.format,
          description: movie.description,
          genres: movie.genres || [],
          startDate: movie.startDate
        }));
    } catch (error) {
      console.error('Failed to fetch anime movies:', error);
      return null;
    }
  }

  // Get top 10 anime by score
  static async getTop10Anime(page = 1, limit = 10) {
    const query = `
      query ($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            hasNextPage
            total
          }
          media(type: ANIME, sort: SCORE_DESC, status_not: NOT_YET_RELEASED) {
            id
            title {
              romaji
              english
              native
            }
            coverImage {
              large
              medium
            }
            averageScore
            meanScore
            popularity
            genres
            episodes
            duration
            status
            format
            startDate {
              year
              month
              day
            }
            studios {
              nodes {
                name
              }
            }
            description(asHtml: false)
            siteUrl
          }
        }
      }
    `;

    try {
      const result = await this.query(query, { page, perPage: limit });
      return result?.Page?.media || [];
    } catch (error) {
      console.error('Failed to fetch top 10 anime:', error);
      return [];
    }
  }

  // Format time until airing
  static formatTimeUntilAiring(seconds) {
    if (!seconds) return null;
    
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) {
      return `${days}d ${hours}h`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  }

  // Format airing date
  static formatAiringDate(timestamp) {
    if (!timestamp) return null;
    
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Get random popular anime (for featured content)
  static async getPopularAnime(limit = 6) {
    const query = `
      query ($perPage: Int) {
        Page(page: 1, perPage: $perPage) {
          media(type: ANIME, sort: POPULARITY_DESC, status_not: NOT_YET_RELEASED) {
            id
            title {
              romaji
              english
            }
            coverImage {
              large
            }
            averageScore
            genres
            episodes
            status
          }
        }
      }
    `;

    return this.query(query, { perPage: limit });
  }
}

// Utility functions for calendar
export const CalendarUtils = {
  getCurrentSeason() {
    const month = new Date().getMonth() + 1;
    if (month >= 1 && month <= 3) return 'WINTER';
    if (month >= 4 && month <= 6) return 'SPRING';
    if (month >= 7 && month <= 9) return 'SUMMER';
    return 'FALL';
  },

  getCurrentYear() {
    return new Date().getFullYear();
  },

  getSeasonEmoji(season) {
    const emojis = {
      'WINTER': '❄️',
      'SPRING': '🌸',
      'SUMMER': '☀️',
      'FALL': '🍂'
    };
    return emojis[season] || '📅';
  },

  getStatusColor(status) {
    const colors = {
      'RELEASING': 'text-green-400',
      'FINISHED': 'text-grey',
      'NOT_YET_RELEASED': 'text-purple',
      'CANCELLED': 'text-red-400',
      'HIATUS': 'text-yellow-400'
    };
    return colors[status] || 'text-grey';
  },

  formatDescription(description, maxLength = 150) {
    if (!description) return 'No description available.';
    
    // Remove HTML tags
    const cleanDescription = description.replace(/<[^>]*>/g, '');
    
    if (cleanDescription.length <= maxLength) {
      return cleanDescription;
    }
    
    return cleanDescription.substring(0, maxLength).trim() + '...';
  }
};

// Mock data fallback for calendar
export const mockAnimeData = {
  upcoming: [
    {
      id: 1,
      title: "Jujutsu Kaisen Season 3",
      coverImage: "/api/placeholder/300/400",
      airingAt: "2025-03-15T09:00:00Z",
      episode: 1,
      episodes: 24,
      status: "NOT_YET_RELEASED",
      format: "TV",
      description: "The highly anticipated third season continues Yuji's journey in the world of cursed spirits.",
      genres: ["Action", "Supernatural", "School"]
    },
    {
      id: 2,
      title: "Demon Slayer: Infinity Castle Arc",
      coverImage: "/api/placeholder/300/400",
      airingAt: "2025-04-08T10:30:00Z",
      episode: 1,
      episodes: 12,
      status: "NOT_YET_RELEASED",
      format: "TV",
      description: "The epic Infinity Castle arc brings the series to its climactic battles.",
      genres: ["Action", "Historical", "Supernatural"]
    },
    {
      id: 3,
      title: "Attack on Titan: Final Season - The End",
      coverImage: "/api/placeholder/300/400",
      airingAt: "2025-02-28T11:00:00Z",
      episode: 1,
      episodes: 4,
      status: "NOT_YET_RELEASED",
      format: "SPECIAL",
      description: "The ultimate conclusion to humanity's fight for freedom.",
      genres: ["Action", "Drama", "Military"]
    }
  ],
  airing: [
    {
      id: 4,
      title: "One Piece",
      coverImage: "/api/placeholder/300/400",
      nextAiringAt: "2025-01-19T09:30:00Z",
      nextEpisode: 1089,
      episodes: null,
      status: "RELEASING",
      format: "TV",
      description: "The adventures of Monkey D. Luffy and his Straw Hat Pirates continue.",
      genres: ["Action", "Adventure", "Comedy"]
    },
    {
      id: 5,
      title: "Boruto: Naruto Next Generations",
      coverImage: "/api/placeholder/300/400",
      nextAiringAt: "2025-01-20T17:25:00Z",
      nextEpisode: 295,
      episodes: null,
      status: "RELEASING",
      format: "TV",
      description: "Follow Boruto Uzumaki in his ninja adventures.",
      genres: ["Action", "Martial Arts", "Supernatural"]
    }
  ],
  top10: [
    {
      id: 6,
      title: { romaji: "Attack on Titan", english: "Attack on Titan" },
      coverImage: { large: "/api/placeholder/300/400" },
      averageScore: 90,
      meanScore: 90,
      popularity: 500000,
      format: "TV",
      description: "Humanity fights for survival against giant humanoid Titans.",
      genres: ["Action", "Drama", "Fantasy"],
      episodes: 75,
      studios: { nodes: [{ name: "Studio Pierrot" }] }
    },
    {
      id: 7,
      title: { romaji: "Fullmetal Alchemist: Brotherhood", english: "Fullmetal Alchemist: Brotherhood" },
      coverImage: { large: "/api/placeholder/300/400" },
      averageScore: 93,
      meanScore: 93,
      popularity: 400000,
      format: "TV",
      description: "Two brothers search for the Philosopher's Stone to restore their bodies.",
      genres: ["Action", "Adventure", "Dark Fantasy"],
      episodes: 64,
      studios: { nodes: [{ name: "Bones" }] }
    },
    {
      id: 8,
      title: { romaji: "Death Note", english: "Death Note" },
      coverImage: { large: "/api/placeholder/300/400" },
      averageScore: 88,
      meanScore: 88,
      popularity: 450000,
      format: "TV",
      description: "A student discovers a supernatural notebook that can kill anyone.",
      genres: ["Supernatural", "Thriller", "Psychological"],
      episodes: 37,
      studios: { nodes: [{ name: "Madhouse" }] }
    }
  ]
};

export default AniListAPI;
