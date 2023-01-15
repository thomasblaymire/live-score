const API_URL = 'http://localhost:3030/api'

export const getCompetitions = async () => {
  const response = await fetch(`${API_URL}/competitions`)
  return response.json()
}

export const getMatches = async () => {
  const response = await fetch(`${API_URL}/matches`)
  return response.json()
}
