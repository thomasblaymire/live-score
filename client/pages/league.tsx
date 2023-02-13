import Image from 'next/image'
import { getLeague } from '../lib/api-helpers'
import { StandingsTable } from '../components/standings'
import { Flex, Box, Heading } from '@chakra-ui/layout'
import { Card } from '../components/card'
import { TopScorers } from '../components/top-scorers'

interface LeagueProps {
  league: League
  topScorers: TopScorer[]
}

export default function League({ league, topScorers }: LeagueProps) {
  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        height="45vh"
        background="linear-gradient(to right, #1CB5E0, #000046)"
      >
        <Flex direction="column" gap="1rem" width="1200px" margin="0 auto">
          <Image src={league.logo} alt={league.name} width={80} height={80} />
          <Heading
            color="white"
            fontFamily="inherit"
            fontWeight={700}
            fontSize="3rem"
            lineHeight="1"
          >
            {league.name}
          </Heading>
        </Flex>
      </Box>
      <Flex
        marginTop={{ base: '1rem', md: '3rem' }}
        justifyContent="space-between"
        margin="0 auto"
        width="1200px"
      >
        <Box background="#121212" borderRadius="15px" height="100%">
          <StandingsTable standings={league.standings} width="50vw" />
        </Box>
        <Card
          heading="Top Scorers"
          background="#121212"
          margin="0 0 2rem 0"
          height="45vh"
          radius="15px"
        >
          <TopScorers players={topScorers} />
        </Card>
      </Flex>
    </Box>
  )
}

export async function getServerSideProps(context: any) {
  const { code } = context.query
  const data = await getLeague('39')

  console.log('debug data', data)

  return {
    props: {
      competition: data.league,
      topScorers: data.topScorers,
    },
  }
}
