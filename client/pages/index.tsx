import Sidebar from '../components/sidebar'
import { Box, Flex } from '@chakra-ui/layout'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { ScoreBoard } from '../components/scoreboard'
import { useMediaQuery, Heading } from '@chakra-ui/react'
import { getCompetitions, getMatches } from '../lib/api-helpers'
import { CompetitionList } from '../components/competition-list'
import { BetCard } from '../components/bet-card'
import { Competition } from '../types/index'

interface HomeProps {
  competitions: Competition[]
}

export default function Home({ competitions }: HomeProps) {
  const [isTablet] = useMediaQuery('(min-width: 780px)')

  return (
    <Flex
      marginTop={{ base: '1rem', md: '2rem' }}
      paddingX={{ md: '4rem' }}
      justifyContent="space-between"
    >
      {isTablet && (
        <Box width="20vw">
          <Sidebar>
            <CompetitionList competitions={competitions} />
          </Sidebar>
        </Box>
      )}

      <Box flexGrow="1" minWidth="100px" marginX="2rem">
        <BetCard />
        <Heading fontSize="1.5rem" color="white" marginBottom="1.5rem">
          Football Matches
        </Heading>
        <ScoreBoard />
      </Box>

      {isTablet && (
        <Box width="25vw">
          <Sidebar>
            <Box
              background="#1F1F1F"
              marginBottom="2rem"
              height="45vh"
              borderRadius="15px"
            ></Box>
            <Box background="#1F1F1F" height="45vh" borderRadius="15px"></Box>
          </Sidebar>
        </Box>
      )}
    </Flex>
  )
}

// Build time fetch leagues and inital score data
export async function getStaticProps() {
  const competitions = await getCompetitions()
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['matches'], getMatches)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      competitions: competitions,
    },
  }
}
