// AniList API integration utilities
const ANILIST_API_URL = 'https://graphql.anilist.co';

export class AniListAPI {
  static async query(query, variables = {}) {
    try {
      const response = await fetch(ANILIST_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables
        })
      });

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

  // Get currently airing anime
  static async getCurrentlyAiring(page = 1, perPage = 20) {
    const query = `
      query ($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            hasNextPage
            total
          }
          media(status: RELEASING, type: ANIME, sort: POPULARITY_DESC) {
            id
            title {
              romaji
              english
              native
            }
            description
            episodes
            nextAiringEpisode {
              airingAt
              timeUntilAiring
              episode
            }
            coverImage {
              large
              medium
            }
            bannerImage
            genres
            averageScore
            popularity
            studios {
              nodes {
                name
              }
            }
          }
        }
      }
    `;

    return this.query(query, { page, perPage });
  }

  // Get upcoming anime releases
  static async getUpcomingAnime(page = 1, perPage = 20) {
    const query = `
      query ($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            hasNextPage
            total
          }
          media(status: NOT_YET_RELEASED, type: ANIME, sort: POPULARITY_DESC) {
            id
            title {
              romaji
              english
              native
            }
            description
            episodes
            startDate {
              year
              month
              day
            }
            coverImage {
              large
              medium
            }
            bannerImage
            genres
            averageScore
            popularity
            studios {
              nodes {
                name
              }
            }
            season
            seasonYear
          }
        }
      }
    `;

    return this.query(query, { page, perPage });
  }

  // Get currently releasing manga
  static async getCurrentlyReleasingManga(page = 1, perPage = 20) {
    const query = `
      query ($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            hasNextPage
            total
          }
          media(status: RELEASING, type: MANGA, sort: POPULARITY_DESC) {
            id
            title {
              romaji
              english
              native
            }
            description
            chapters
            volumes
            coverImage {
              large
              medium
            }
            bannerImage
            genres
            averageScore
            popularity
            staff {
              edges {
                role
                node {
                  name {
                    full
                  }
                }
              }
            }
          }
        }
      }
    `;

    return this.query(query, { page, perPage });
  }

  // Search anime/manga
  static async search(searchTerm, type = 'ANIME', page = 1, perPage = 10) {
    const query = `
      query ($search: String, $type: MediaType, $page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            hasNextPage
            total
          }
          media(search: $search, type: $type, sort: POPULARITY_DESC) {
            id
            title {
              romaji
              english
              native
            }
            description
            episodes
            chapters
            coverImage {
              large
              medium
            }
            bannerImage
            genres
            averageScore
            popularity
            status
            startDate {
              year
              month
              day
            }
          }
        }
      }
    `;

    return this.query(query, { search: searchTerm, type, page, perPage });
  }

  // Get anime by season
  static async getAnimeBySeason(season, year, page = 1, perPage = 20) {
    const query = `
      query ($season: MediaSeason, $year: Int, $page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            hasNextPage
            total
          }
          media(season: $season, seasonYear: $year, type: ANIME, sort: POPULARITY_DESC) {
            id
            title {
              romaji
              english
              native
            }
            description
            episodes
            nextAiringEpisode {
              airingAt
              timeUntilAiring
              episode
            }
            coverImage {
              large
              medium
            }
            bannerImage
            genres
            averageScore
            popularity
            studios {
              nodes {
                name
              }
            }
            status
          }
        }
      }
    `;

    return this.query(query, { season: season.toUpperCase(), year, page, perPage });
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

export default AniListAPI;
