import { useQuery } from '@tanstack/react-query'
import { API_URL } from '@/lib/constants'
import axios from 'axios'

const getCompetitions = async () => {
  const { data } = await axios.get(`${API_URL}/leagues`)
  return data
}

export function useCompetitions() {
  return useQuery<Competitions[], Error>(['competitions'], getCompetitions)
}
