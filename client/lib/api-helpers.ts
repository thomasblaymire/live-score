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
