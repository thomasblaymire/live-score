import { useQuery } from '@tanstack/react-query'
import { API_URL } from '../lib/constants'
import axios from 'axios'

const getSearchResults = async (query: string) => {
  const { data } = await axios.get(`${API_URL}/search?query=${query}`)
  return data.response
}

export function useSearch(query: string) {
  return useQuery(['search', query], () => getSearchResults(query), {
    enabled: Boolean(query),
  })
}
