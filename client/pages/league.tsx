import { getStandings } from '../lib/api-helpers'
import { Standings } from '../components/standings'
import { Flex } from '@chakra-ui/layout'

export default function League({ standings, code }: any) {
  console.log('debug leagueeee', { standings, code })
  return (
    <Flex
      marginTop={{ base: '1rem', md: '3rem' }}
      paddingX={{ md: '4rem' }}
      justifyContent="space-between"
    >
      <Standings standings={standings} />
    </Flex>
  )
}

export async function getServerSideProps(context: any) {
  const { code } = context.query

  console.log('debug context', context)

  const standings = await getStandings('PL')

  return {
    props: {
      standings: standings,
    },
  }
}
