import { useQuery } from '@tanstack/react-query'
import { API_URL } from '../lib/constants'
import axios from 'axios'

// Returns all fixtures on the hompage (live, upcoming, finished) will eventually be merged with useFixtures pending API
export const getHomepageFixtures = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/fixtures`)
    return data
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching fixture data:', error.message)
      return { data: { data: {} }, error: error.message }
    } else {
      console.error('Error fetching fixture data:', error)
      return { data: { data: {} }, error: 'An unknown error occurred' }
    }
  }
}

export const useHomepageFixtures = () => {
  return useQuery(['homepageFixtures'], getHomepageFixtures, {
    refetchInterval: 30000,
  })
}
