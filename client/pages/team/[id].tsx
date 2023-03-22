import { useRouter } from 'next/router'
import { dehydrate } from 'react-query/hydration'
import { QueryClient } from 'react-query'
import { GetServerSideProps } from 'next'
import { Team } from '../../components/team'
import { getMatchesByTeamName, getNewsByTeam } from '../../lib/api-helpers'

export default function TeamPage() {
  const router = useRouter()
  const { id } = router.query as { id: string }
  return <Team id={id} />
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['teamFixtures'], () =>
    getMatchesByTeamName(params?.id)
  )
  await queryClient.prefetchQuery(['teamNews'], () =>
    getNewsByTeam(params?.id, 1, 5)
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
