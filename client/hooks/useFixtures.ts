import { useQuery } from '@tanstack/react-query'
import { API_URL } from '../lib/constants'
import axios from 'axios'

interface FixtureDateRange {
  startDate: string
  endDate: string
}

const getFixtures = async ({ startDate, endDate }: FixtureDateRange) => {
  try {
    const { data } = await axios.get(
      `${API_URL}/fixtures-all/date?start=${startDate}&end=${endDate}`
    )
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

export const useFixtures = (dateRange: FixtureDateRange) => {
  return useQuery(['fixtures', dateRange], () => getFixtures(dateRange), {
    keepPreviousData: true,
    onError: (error: unknown) => {
      console.error('Error fetching fixture data:', error)
    },
  })
}
