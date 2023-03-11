import Image from 'next/image'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { getLeague } from '../lib/api-helpers'
import { StandingsTable } from '../components/standings'
import { Flex, Box, Heading } from '@chakra-ui/layout'
import { Card } from '../components/card'
import { TopScorers } from '../components/top-scorers'
import { Loading } from '../components/loading'

interface LeagueProps {
  league: League
  topScorers: TopScorer[]
}

export default function League() {
  const router = useRouter()
  const { id } = router.query

  const { data, isLoading, error } = useQuery({
    queryKey: ['teamFixtures'],
    queryFn: () => getLeague('39'),
  })

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        height="45vh"
        background="linear-gradient(to right, #1CB5E0, #000046)"
      >
        {data && (
          <Flex direction="column" gap="1rem" width="1200px" margin="0 auto">
            <Image
              src={data.league.logo}
              alt={data.league.name}
              width={80}
              height={80}
            />
            <Heading
              color="white"
              fontFamily="inherit"
              fontWeight={700}
              fontSize="3rem"
              lineHeight="1"
            >
              {data.league.name}
            </Heading>
          </Flex>
        )}
      </Box>

      <Box margin={{ base: '1rem', md: '3rem' }}>
        <Flex margin="0 auto" justifyContent="space-between" width="1200px">
          <Box background="#121212" borderRadius="15px" height="100%">
            <Card
              heading="Table"
              background="#121212"
              margin="0 0 2rem 0"
              height="45vh"
              radius="15px"
            >
              {data ? (
                <StandingsTable
                  standings={data.league.standings}
                  loading={isLoading}
                  width="50vw"
                />
              ) : null}
            </Card>
          </Box>
          <Card
            heading="Top Scorers"
            background="#121212"
            margin="0 0 2rem 0"
            height="45vh"
            radius="15px"
          >
            {data ? <TopScorers players={data.topScorers} /> : null}
          </Card>
        </Flex>
      </Box>
    </Box>
  )
}
