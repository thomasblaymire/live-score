export const getCompetitions = async () => {
  const response = await fetch('http://localhost:3030/api/competitions')
  return response.json()
}
