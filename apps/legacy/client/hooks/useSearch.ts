import { useQuery } from '@tanstack/react-query'
import { API_URL } from '@/lib/constants'
import axios from 'axios'

const getSearchResults = async (term: string) => {
  const { data } = await axios.get(`${API_URL}/search?term=${term}`)

  return data
}

export function useSearch(term: string) {
  return useQuery(['search', term], () => getSearchResults(term), {
    enabled: Boolean(term),
  })
}
