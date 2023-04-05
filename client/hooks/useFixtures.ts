import { useQuery } from '@tanstack/react-query'
import { API_URL } from '../lib/constants'
import axios from 'axios'

// Update this so that we are using the fixtures by date / weigh perf of the big initial query vs x2 queries

export const getFixtures = async () => {
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

export const useFixtures = () => {
  return useQuery(['fixtures'], getFixtures, {
    refetchInterval: 30000,
  })
}
