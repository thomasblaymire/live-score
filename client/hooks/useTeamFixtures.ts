import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { API_URL } from '@/lib/constants'

interface FetchTeamFixturesParams {
  teamId: string
  page: number
  pageSize: number
}

export async function getFixturesByTeamId({
  id,
  page,
  pageSize,
}: {
  id: string
  page: number
  pageSize: number
}) {
  const { data } = await axios.get(
    `${API_URL}/fixtures/${id}?page=${page}&pageSize=${pageSize}`
  )

  return data
}

export function useTeamFixtures({
  teamId,
  page,
  pageSize,
}: FetchTeamFixturesParams) {
  return useQuery(
    ['teamFixtures', teamId, page, pageSize],
    () => getFixturesByTeamId({ id: teamId, page, pageSize }),
    {
      initialData: [],
    }
  )
}
