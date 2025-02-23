import { API_URL } from '@/lib/constants'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface FixtureDateRange {
  startDate: string
  endDate: string
}

interface UseFixturesResult {
  data: any | undefined
  isFetching: boolean
  error: unknown
}

export const getFixtures = async ({
  startDate,
  endDate,
}: FixtureDateRange): Promise<any[]> => {
  try {
    const { data } = await axios.get(
      `${API_URL}/fixtures-all/date?start=${startDate}&end=${endDate}`
    )
    console.log('debug url', `${API_URL}/fixtures-all/date?start=${startDate}&end=${endDate}`)
    console.log('debug data', data)
    return data
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching fixture data:', error.message)
      throw error
    } else {
      console.error('Error fetching fixture data:', error)
      throw new Error('An unknown error occurred')
    }
  }
}

export const useFixtures = (
  dateRange: FixtureDateRange,
  initialFixtures?: any[]
): UseFixturesResult => {
  const query = useQuery({
    queryKey: ['fixtures', dateRange],
    queryFn: () => getFixtures(dateRange),
    initialData: initialFixtures,
    gcTime: 0,
    staleTime: 20000,
    refetchInterval: 20000,
  })

  return {
    data: query.data,
    isFetching: query.isFetching,
    error: query.error,
  }
}