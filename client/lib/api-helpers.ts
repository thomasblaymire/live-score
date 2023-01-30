const API_URL = 'http://localhost:3030/api'

export const getCompetitions = async () => {
  const response = await fetch(`${API_URL}/competitions`)
  const competitions = await response.json()
  return competitions
}

export const getMatches = async () => {
  const response = await fetch(`${API_URL}/matches`)
  const matches = await response.json()
  return matches
}

export const getMatchData = async (id: any) => {
  const response = await fetch(`${API_URL}/match/${id}`)
  const match = await response.json()
  return match
}

export const getStandings = async (league: string) => {
  const response = await fetch(`${API_URL}/standings/${league}`)
  const standings = await response.json()
  return standings
}

export const getFavourites = async () => {
  const response = await fetch(`${API_URL}/favourites/`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const addFavourite = async (id: number, userId: any) => {
  console.log('debug posting id', id)
  return fetch('http://localhost:3030/api/favourites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ matchId: id, userId: userId }),
  })
}

export const getSearchResults = async (query: any) => {
  const response = await fetch(`${API_URL}/search?query=${query}`)
  const favourites = await response.json()
  return favourites
}
