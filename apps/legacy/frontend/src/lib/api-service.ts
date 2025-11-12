import { Competition, Fixture, Standing, StandingsApiResponse } from "@/types";
import { revalidateTag } from "next/cache";

const CACHE_OPTIONS = {
  fixtures: {
    next: { 
      revalidate: 20,
      tags: ['fixtures']
    }
  },
  competitions: {
    next: { 
      revalidate: 86400, // 24 hours comptitions do not chang
      tags: ['competitions']
    }
  },
  standings: {
    next: { 
      revalidate: 86400, // 24 hours standings do not change
      tags: ['standings']
    }
  }
};

const ENDPOINTS = {
  fixtures: 'https://run.mocky.io/v3/7d632e4b-c32c-41e1-ab30-7ce76a6c4cd5',
  competitions: 'https://run.mocky.io/v3/9a24d753-4c65-494e-b200-19133515f4fb',
  standings: 'https://run.mocky.io/v3/021efec0-272a-4db2-8c55-b41bf6aa6de3'
};

async function fetchData<T>(url: string, options = {}): Promise<T> {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options
    });
    
    if (!response.ok) {
      const error = new Error(`API Error: ${response.status} ${response.statusText} on ${url}`);
      Object.assign(error, {
        status: response.status,
        statusText: response.statusText,
        url
      });
      throw error;
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('Network error:', error);
    } else {
      console.error('API error:', error);
    }
    throw error;
  }
}

export async function getFixtures(params?: Record<string, string>, limit: number = 10): Promise<Fixture[]> {
  try {
    const queryString = params ? `?${new URLSearchParams(params)}` : '';
    const data = await fetchData<{ response: Fixture[] }>(
      `${ENDPOINTS.fixtures}${queryString}`,
      CACHE_OPTIONS.fixtures
    );
    
    // Return only the first 10 fixtures
    return (data?.response ?? []).slice(0, limit);
  } catch (error) {
    console.error('Error in getFixtures:', error);
    return [];
  }
}

export async function getCompetitions(params?: Record<string, string>): Promise<Competition[]> {
  try {
    const queryString = params ? `?${new URLSearchParams(params)}` : '';
    const data = await fetchData<Competition[]>(
      `${ENDPOINTS.competitions}${queryString}`,
      CACHE_OPTIONS.competitions
    );

    
    return data ?? [];
  } catch (error) {
    console.error('Error in getCompetitions:', error);
    return [];
  }
}


export async function getStandings(params?: Record<string, string>): Promise<Standing> {
  try {
    const queryString = params ? `?${new URLSearchParams(params)}` : '';
    const data = await fetchData<StandingsApiResponse>(
      `${ENDPOINTS.standings}${queryString}`,
      CACHE_OPTIONS.standings
    );
    

    if (data.response && data.response[0] && data.response[0].league) {
      const league = data.response[0].league;
      
      return {
        id: league.id,
        name: league.name,
        country: league.country,
        logo: league.logo,
        flag: league.flag,
        season: league.season,
        standings: league.standings[0] || [] 
      };
    }
    
    return {
      id: 0,
      name: '',
      country: '',
      logo: '',
      flag: '',
      season: 0,
      standings: []
    };
  } catch (error) {
    console.error('Error in getStandings:', error);
    return {
      id: 0,
      name: '',
      country: '',
      logo: '',
      flag: '',
      season: 0,
      standings: []
    };
  }
}


export async function getAllData() {
  try {
    const [fixtures, competitions, standings] = await Promise.all([
      getFixtures(),
      getCompetitions(),
      getStandings()
    ]);
    
    return {
      fixtures,
      competitions,
      standings
    };
  } catch (error) {
    console.error('Error fetching all data:', error);
    return {
      fixtures: [],
      competitions: [],
      standings: []
    };
  }
}

// This can be called from a server action or API route
export async function revalidateCompetitions() {
  if (typeof revalidateTag === 'function') {
    revalidateTag('competitions');
  }
}