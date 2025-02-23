import axios from 'axios'
import { API_URL } from './constants'

export const getStandings = async (leagueId: string) => {
  const { data } = await axios.get(`${API_URL}/league/${leagueId}`)
  return { data, error: null }
}

export const getFavourites = async () => {
  const { data } = await axios.get(`${API_URL}/favourites/`, {
    withCredentials: true,
  })
  return data
}

export const addFavourite = async (id: number, userId: any) => {
  const { data } = await axios.post(`${API_URL}/favourites/`, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ matchId: id, userId: userId }),
  })
  return data
}

export const getMatches = async () => {
  const { data } = await axios.get(`${API_URL}/fixtures`)
  return data
}

export const getNews = async (): Promise<{
  data: NewsItem[] | null
  error: string | null
}> => {
  try {
    const { data } = await axios.get(`${API_URL}/news`)
    return { data: data.articles.slice(0, 5), error: null }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching data:', error.message)
      return { data: null, error: error.message }
    } else {
      console.error('Error fetching data:', error)
      return { data: null, error: 'An unknown error occurred' }
    }
  }
}

export const getNewsByTeam = async (
  teamName: string,
  page: number,
  limit: number
): Promise<{
  data: Competitions[] | null
  error: string | null
}> => {
  try {
    const { data } = await axios.get(
      `${API_URL}/news/team?name=${teamName}&page=${page}&limit=${limit}`
    )
    return { data, error: null }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching data:', error.message)
      return { data: null, error: error.message }
    } else {
      console.error('Error fetching data:', error)
      return { data: null, error: 'An unknown error occurred' }
    }
  }
}

export const getCompetitions = async (): Promise<{
  data: Competitions[] | null
  error: string | null
}> => {
  try {
    const { data } = await axios.get(`${API_URL}/leagues`)
    return { data, error: null }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching data:', error.message)
      return { data: null, error: error.message }
    } else {
      console.error('Error fetching data:', error)
      return { data: null, error: 'An unknown error occurred' }
    }
  }
}

export const getTeams = async (): Promise<{
  data: AllTeams[] | null
  error: string | null
}> => {
  try {
    const { data } = await axios.get(`${API_URL}/teams`)
    return { data: data.response, error: null }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching data:', error.message)
      return { data: null, error: error.message }
    } else {
      console.error('Error fetching data:', error)
      return { data: null, error: 'An unknown error occurred' }
    }
  }
}

export function isClient() {
  return typeof window !== 'undefined'
}

export async function fetchHomepageData() {
  const premierLeagueCode = '39'
  const [competitionsResponse, newsResponse, standingsResponse] =
    await Promise.all([
      getCompetitions(),
      getNews(),
      getStandings(premierLeagueCode),
    ])
  return {
    competitions: competitionsResponse.data,
    competitionsError: competitionsResponse.error,
    news: newsResponse.data,
    newsError: newsResponse.error,
    standings: standingsResponse.data,
    standingsErrror: standingsResponse.error,
  }
}
