import Head from 'next/head'
import { Box, Flex } from '@chakra-ui/layout'
import Sidebar from '../components/sidebar'
import { ScoreBoard } from '../components/scoreboard'
import { useMediaQuery } from '@chakra-ui/react'
import { getCompetitions, getMatches } from '../lib/api-helpers'
import { CompetitionList } from '../components/competition-list'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'

export default function Home({ competitions }: any) {
  const [isTablet] = useMediaQuery('(min-width: 780px)')

  return (
    <Flex
      marginTop={{ base: '1rem', md: '3rem' }}
      paddingX={{ md: '4rem' }}
      justifyContent="space-between"
    >
      {isTablet && (
        <Box minWidth="300px">
          <Sidebar>
            <CompetitionList competitions={competitions} />
          </Sidebar>
        </Box>
      )}

      <Box flexGrow="1" minWidth="100px">
        <ScoreBoard />
      </Box>

      {isTablet && (
        <Box minWidth="100px">
          <Sidebar>
            <CompetitionList competitions={competitions} />
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

export async function getServerProps() {}
