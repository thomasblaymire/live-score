import axios from 'axios'
import { API_URL } from '../lib/constants'

export const getMatchesByTeamName = async (
  teamName: string | string[] | undefined
) => {
  const { data } = await axios.get(`${API_URL}/fixtures/${teamName}`)
  return data
}

export const getMatchData = async (id: any) => {
  const { data } = await axios.get(`${API_URL}/fixture/${id}`)
  return data
}

export const getStandings = async (leagueId: string) => {
  const { data } = await axios.get(`${API_URL}/league/${leagueId}`)
  return data
}

export const getTeams = async () => {
  const { data } = await axios.get(`${API_URL}/teams`)
  return data
}

export const getFavourites = async () => {
  const { data } = await axios.get(`${API_URL}/favourites/`)
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
