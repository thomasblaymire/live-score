import axios from 'axios'
import { API_URL } from '../lib/constants'

export const getMatchesByTeamName = async (
  teamName: string | string[] | undefined
) => {
  const { data } = await axios.get(`${API_URL}/fixtures/${teamName}`)
  return data
}

export const getStandings = async (leagueId: string) => {
  const { data } = await axios.get(`${API_URL}/league/${leagueId}`)
  return data
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

export const getNews = async (): Promise<any> => {
  const { data } = await axios.get(`${API_URL}/news`)
  return data.articles.slice(0, 5)
}

export const getNewsByTeam = async (
  teamName: string | string[] | undefined,
  page: number,
  limit: number
) => {
  const { data } = await axios.post(`${API_URL}/news/${teamName}`, {
    page,
    limit,
  })
  return data
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
    console.log('debug data', data)
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
