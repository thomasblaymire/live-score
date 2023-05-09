import { useQuery } from '@tanstack/react-query'
import { API_URL } from '@/lib/constants'
import axios from 'axios'

interface FixtureDateRange {
  startDate: string
  endDate: string
}

interface UseFixturesResult {
  data: CustomFixture[] | undefined
  isFetching: boolean
  error: unknown
}

export const getFixtures = async ({
  startDate,
  endDate,
}: FixtureDateRange): Promise<CustomFixture[]> => {
  try {
    const { data } = await axios.get(
      `${API_URL}/fixtures-all/date?start=${startDate}&end=${endDate}`
    )
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
  initialFixtures?: CustomFixture[]
): UseFixturesResult => {
  const query = useQuery(
    ['fixtures', dateRange],
    () => getFixtures(dateRange),
    {
      initialData: initialFixtures ? initialFixtures : undefined,
      keepPreviousData: true,
      refetchInterval: 20000,
      onError: (error: unknown) => {
        console.error('Error fetching fixture data:', error)
      },
    }
  )

  return {
    data: query.data,
    isFetching: query.isFetching,
    error: query.error,
  }
}
