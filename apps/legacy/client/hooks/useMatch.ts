import { useQuery } from '@tanstack/react-query'
import { API_URL } from '@/lib/constants'
import axios from 'axios'

const getMatchData = async (id: string | string[] | undefined) => {
  const { data } = await axios.get(`${API_URL}/fixture/${id}`)
  return data
}

export function useMatch(id: string | string[] | undefined) {
  return useQuery<SingleMatch, Error>(['match'], () => getMatchData(id), {
    refetchInterval: 30000,
  })
}
