import { useQuery } from 'react-query'
import { API_URL } from '../lib/constants'
import axios from 'axios'

const getMatches = async () => {
  const { data } = await axios.get(`${API_URL}/fixtures`)
  return data
}

export function useMatches() {
  return useQuery<Match[], Error>('matches', getMatches, {
    refetchInterval: 30000,
  })
}
