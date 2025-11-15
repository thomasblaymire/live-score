/**
 * API-Football Service
 * Handles all communication with API-Football (RapidAPI)
 * Documentation: https://www.api-football.com/documentation-v3
 */

import fetch from "node-fetch";

const API_URL = process.env.FOOTBALL_API_URL || "https://api-football-v1.p.rapidapi.com/v3";
const API_KEY = process.env.FOOTBALL_API_TOKEN;
const API_HOST = process.env.FOOTBALL_API_HOST || "api-football-v1.p.rapidapi.com";

// In-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = {
  LIVE: 2 * 60 * 1000, // 2 minutes
  FIXTURES: 5 * 60 * 1000, // 5 minutes
  LEAGUES: 10 * 60 * 1000, // 10 minutes
  TEAMS: 30 * 60 * 1000, // 30 minutes
  STANDINGS: 10 * 60 * 1000, // 10 minutes
};

interface CacheOptions {
  ttl: number;
  key: string;
}

/**
 * Generic fetch with caching
 */
async function fetchFromAPI<T>(
  endpoint: string,
  cacheOptions?: CacheOptions
): Promise<T> {
  const cacheKey = cacheOptions?.key || endpoint;

  // Check cache first
  if (cacheOptions) {
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < cacheOptions.ttl) {
      console.log(`[Cache HIT] ${cacheKey}`);
      return cached.data as T;
    }
  }

  // Make API request
  const url = `${API_URL}${endpoint}`;
  console.log(`[API Request] ${url}`);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": API_KEY || "",
      "X-RapidAPI-Host": API_HOST,
    },
  });

  if (!response.ok) {
    throw new Error(`API-Football error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  // Cache the response
  if (cacheOptions) {
    cache.set(cacheKey, {
      data,
      timestamp: Date.now(),
    });
    console.log(`[Cache SET] ${cacheKey}`);
  }

  return data as T;
}

/**
 * Fixtures API
 */
export const fixturesAPI = {
  /**
   * Get live fixtures
   */
  async getLive() {
    return fetchFromAPI("/fixtures?live=all", {
      key: "fixtures:live",
      ttl: CACHE_TTL.LIVE,
    });
  },

  /**
   * Get fixtures by date
   * @param date - Format: YYYY-MM-DD
   */
  async getByDate(date: string) {
    return fetchFromAPI(`/fixtures?date=${date}`, {
      key: `fixtures:date:${date}`,
      ttl: CACHE_TTL.FIXTURES,
    });
  },

  /**
   * Get fixtures by date range
   * @param from - Format: YYYY-MM-DD
   * @param to - Format: YYYY-MM-DD
   */
  async getByDateRange(from: string, to: string) {
    return fetchFromAPI(`/fixtures?from=${from}&to=${to}`, {
      key: `fixtures:range:${from}:${to}`,
      ttl: CACHE_TTL.FIXTURES,
    });
  },

  /**
   * Get fixture by ID
   */
  async getById(fixtureId: number) {
    return fetchFromAPI(`/fixtures?id=${fixtureId}`, {
      key: `fixtures:id:${fixtureId}`,
      ttl: CACHE_TTL.FIXTURES,
    });
  },

  /**
   * Get fixtures by team ID
   */
  async getByTeam(teamId: number, season: number) {
    return fetchFromAPI(`/fixtures?team=${teamId}&season=${season}`, {
      key: `fixtures:team:${teamId}:${season}`,
      ttl: CACHE_TTL.FIXTURES,
    });
  },

  /**
   * Get fixtures by league and season
   */
  async getByLeague(leagueId: number, season: number) {
    return fetchFromAPI(`/fixtures?league=${leagueId}&season=${season}`, {
      key: `fixtures:league:${leagueId}:${season}`,
      ttl: CACHE_TTL.FIXTURES,
    });
  },
};

/**
 * Leagues API
 */
export const leaguesAPI = {
  /**
   * Get all leagues
   */
  async getAll() {
    return fetchFromAPI("/leagues", {
      key: "leagues:all",
      ttl: CACHE_TTL.LEAGUES,
    });
  },

  /**
   * Get league by ID
   */
  async getById(leagueId: number) {
    return fetchFromAPI(`/leagues?id=${leagueId}`, {
      key: `leagues:id:${leagueId}`,
      ttl: CACHE_TTL.LEAGUES,
    });
  },

  /**
   * Get top leagues (hardcoded popular ones)
   */
  async getTopLeagues() {
    const currentYear = new Date().getFullYear();
    const season = currentYear; // Adjust based on league season

    // Top 5 European leagues
    const topLeagueIds = [39, 140, 78, 135, 61]; // PL, La Liga, Bundesliga, Serie A, Ligue 1

    return fetchFromAPI(`/leagues?season=${season}`, {
      key: `leagues:top:${season}`,
      ttl: CACHE_TTL.LEAGUES,
    });
  },
};

/**
 * Standings API
 */
export const standingsAPI = {
  /**
   * Get standings by league and season
   */
  async getByLeague(leagueId: number, season: number) {
    return fetchFromAPI(`/standings?league=${leagueId}&season=${season}`, {
      key: `standings:league:${leagueId}:${season}`,
      ttl: CACHE_TTL.STANDINGS,
    });
  },
};

/**
 * Teams API
 */
export const teamsAPI = {
  /**
   * Get team by ID
   */
  async getById(teamId: number) {
    return fetchFromAPI(`/teams?id=${teamId}`, {
      key: `teams:id:${teamId}`,
      ttl: CACHE_TTL.TEAMS,
    });
  },

  /**
   * Get teams by league and season
   */
  async getByLeague(leagueId: number, season: number) {
    return fetchFromAPI(`/teams?league=${leagueId}&season=${season}`, {
      key: `teams:league:${leagueId}:${season}`,
      ttl: CACHE_TTL.TEAMS,
    });
  },

  /**
   * Search teams by name
   */
  async search(name: string) {
    return fetchFromAPI(`/teams?search=${encodeURIComponent(name)}`, {
      key: `teams:search:${name.toLowerCase()}`,
      ttl: CACHE_TTL.TEAMS,
    });
  },
};

/**
 * Top Scorers API
 */
export const topScorersAPI = {
  /**
   * Get top scorers by league and season
   */
  async getByLeague(leagueId: number, season: number) {
    return fetchFromAPI(
      `/players/topscorers?league=${leagueId}&season=${season}`,
      {
        key: `topscorers:league:${leagueId}:${season}`,
        ttl: CACHE_TTL.STANDINGS,
      }
    );
  },
};

/**
 * Utility: Clear cache (useful for testing or forced refresh)
 */
export function clearCache(pattern?: string) {
  if (!pattern) {
    cache.clear();
    console.log("[Cache] Cleared all cache");
    return;
  }

  let count = 0;
  for (const key of cache.keys()) {
    if (key.includes(pattern)) {
      cache.delete(key);
      count++;
    }
  }
  console.log(`[Cache] Cleared ${count} entries matching "${pattern}"`);
}

/**
 * Utility: Get cache stats
 */
export function getCacheStats() {
  return {
    size: cache.size,
    keys: Array.from(cache.keys()),
  };
}
