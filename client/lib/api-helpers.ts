const API_URL = 'http://localhost:3030/api'

export const getCompetitions = async (): Promise<Competitions[]> => {
  const response = await fetch(`${API_URL}/leagues`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const getMatches = async () => {
  const response = await fetch(`${API_URL}/fixtures`)
  const matches = await response.json()
  return matches
}

export const getMatchesByTeamName = async (
  teamName: string | string[] | undefined
) => {
  const response = await fetch(`${API_URL}/fixtures/${teamName}`)
  const matches = await response.json()
  return matches
}

export const getMatchData = async (id: any) => {
  const response = await fetch(`${API_URL}/match/${id}`)
  const match = await response.json()
  return match
}

export const getLeague = async (leagueId: string) => {
  const response = await fetch(`${API_URL}/league/${leagueId}`)
  const league = await response.json()
  return league
}

export const getTeams = async () => {
  const response = await fetch(`${API_URL}/teams`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const teams = await response.json()
  return teams
}

export const getFavourites = async (): Promise<FavouriteMatch[]> => {
  const response = await fetch(`${API_URL}/favourites/`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const addFavourite = async (id: number, userId: any) => {
  return fetch('http://localhost:3030/api/favourites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ matchId: id, userId: userId }),
  })
}

export const getSearchResults = async (query: any): Promise<SearchResult> => {
  const response = await fetch(`${API_URL}/search?query=${query}`)
  const favourites = await response.json()
  return favourites
}

export const getNews = async (): Promise<any> => {
  const response = await fetch(`${API_URL}/news`)
  const news = await response.json()
  const top5Articles = news.articles.slice(0, 5)
  return top5Articles
}
