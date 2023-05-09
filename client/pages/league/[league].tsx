import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { getStandings } from '@/lib/api-helpers'
import { StandingsTable } from '@/components/features/standings'
import { Flex, Box, Heading } from '@chakra-ui/layout'
import { Card } from '@/components/ui/card'
import { TopScorers } from '@/components/features/league/league-top-scorers'

export default function League() {
  const router = useRouter()
  const { id } = router.query

  const { data, isLoading, error } = useQuery({
    queryKey: ['standings'],
    queryFn: () => getStandings('39'),
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
            <Heading
              color="white"
              fontFamily="inherit"
              fontWeight={700}
              fontSize="3rem"
              lineHeight="1"
            >
              {data.data.league[0].group}
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
              <StandingsTable
                leagueId="39"
                width="50vw"
                standings={data?.data}
              />
            </Card>
          </Box>
          <Card
            heading="Top Scorers"
            background="#121212"
            margin="0 0 2rem 0"
            height="45vh"
            radius="15px"
          >
            {data ? <TopScorers players={data?.data.topScorers} /> : null}
          </Card>
        </Flex>
      </Box>
    </Box>
  )
}
