/**
 * API Client for Live Score application
 * Provides typed methods to interact with the backend API
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw error;
  }
}

/**
 * API Client with typed methods
 */
export const apiClient = {
  /**
   * Fixtures
   */
  fixtures: {
    // Get all fixtures (live scores, by date, by status)
    getAll: () => fetchAPI<FixturesResponse>("/api/fixtures"),

    // Get fixtures for a specific team
    getByTeam: (teamId: number, page = 1, pageSize = 10) =>
      fetchAPI<Fixture[]>(`/api/fixtures/${teamId}?page=${page}&pageSize=${pageSize}`),

    // Get fixtures by date range
    getByDateRange: (startDate: string, endDate: string) =>
      fetchAPI<Fixture[]>(`/api/fixtures-all/date?start=${startDate}&end=${endDate}`),

    // Get a specific fixture by ID
    getById: (fixtureId: string) => fetchAPI<FixtureDetail>(`/api/fixture/${fixtureId}`),
  },

  /**
   * Leagues
   */
  leagues: {
    // Get all top competitions
    getAll: () => fetchAPI<League[]>("/api/leagues"),

    // Get league standings and top scorers
    getById: (leagueId: string) =>
      fetchAPI<LeagueDetail>(`/api/league/${leagueId}`),

    // Get all fixtures for a league
    getFixtures: (leagueId: string) =>
      fetchAPI<Fixture[]>(`/api/league/${leagueId}/fixtures`),
  },

  /**
   * News
   */
  news: {
    // Get latest football news
    getAll: () => fetchAPI<NewsResponse>("/api/news"),

    // Get news for a specific team
    getByTeam: (teamName: string, page = 1, limit = 5) =>
      fetchAPI<PaginatedNewsResponse>(
        `/api/news/team?name=${encodeURIComponent(teamName)}&page=${page}&limit=${limit}`
      ),
  },

  /**
   * Teams
   */
  teams: {
    // Get all teams
    getAll: () => fetchAPI<Team[]>("/api/teams"),

    // Get team by ID
    getById: (teamId: string) => fetchAPI<TeamDetail>(`/api/teams/${teamId}`),
  },

  /**
   * Search
   */
  search: {
    // Search for teams, players, etc.
    query: (searchTerm: string) =>
      fetchAPI<SearchResults>(`/api/search?q=${encodeURIComponent(searchTerm)}`),
  },

  /**
   * Predictions (requires auth)
   */
  predictions: {
    getAll: () => fetchAPI<Prediction[]>("/api/predictions"),
  },

  /**
   * Favourites (requires auth)
   */
  favourites: {
    getAll: () => fetchAPI<Favourite[]>("/api/favourites"),
    add: (itemId: string, type: string) =>
      fetchAPI<Favourite>("/api/favourites", {
        method: "POST",
        body: JSON.stringify({ itemId, type }),
      }),
    remove: (favouriteId: string) =>
      fetchAPI<void>(`/api/favourites/${favouriteId}`, {
        method: "DELETE",
      }),
  },

  /**
   * Broadcasts
   */
  broadcasts: {
    getByLeague: (leagueId: string | number, country: string = "UK") =>
      fetchAPI<BroadcastInfo>(`/api/broadcasts/league/${leagueId}?country=${country}`),
    getAll: () => fetchAPI<BroadcastInfo[]>("/api/broadcasts"),
  },
};

/**
 * Type Definitions
 */

export interface FixturesResponse {
  liveScores: any;
  fixturesByDate: any;
  fixturesByStatus: any;
}

// API-Football response format
export interface Fixture {
  fixture: {
    id: number;
    date: string;
    status: {
      long: string;
      short: string;
      elapsed?: number | null;
    };
  };
  teams: {
    home: Team;
    away: Team;
  };
  goals: {
    home: number | null;
    away: number | null;
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
  };
}

export interface FixtureDetail extends Fixture {
  venue?: Venue;
  score?: Score;
}

export interface Team {
  id: number;
  name: string;
  logo?: string;
}

export interface TeamDetail extends Team {
  // Add more team details as needed
}

export interface League {
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
  };
  country: {
    name: string;
    code: string;
    flag: string;
  };
  seasons: any[];
}

export interface LeagueDetail {
  league: Standing[];
  topScorers: TopScorer[];
}

export interface Standing {
  position: number;
  team: Team;
  played: number;
  points: number;
  form?: string;
}

export interface TopScorer {
  player: {
    id: number;
    name: string;
  };
  statistics: {
    goals: number;
    team: Team;
  }[];
}

export interface FixtureStatus {
  long: string;
  short: string;
  elapsed?: number;
}

export interface Venue {
  id: number;
  name: string;
  city: string;
}

export interface Goals {
  home: number | null;
  away: number | null;
}

export interface Score {
  halftime: Goals;
  fulltime: Goals;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export interface PaginatedNewsResponse {
  currentPage: number;
  totalPages: number;
  data: NewsArticle[];
}

export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string;
}

export interface SearchResults {
  teams?: Team[];
  players?: any[];
  leagues?: League[];
}

export interface Prediction {
  id: string;
  fixtureId: number;
  prediction: string;
  // Add more fields as needed
}

export interface Favourite {
  id: string;
  itemId: string;
  type: string;
  // Add more fields as needed
}

export interface Broadcaster {
  name: string;
  channels: string[];
  type: "tv" | "streaming" | "both";
  requiresSubscription: boolean;
  logo?: string;
  url?: string;
}

export interface BroadcastInfo {
  leagueId: number;
  country: string;
  broadcasters: Broadcaster[];
}
