import Head from 'next/head'
import { Box, Flex } from '@chakra-ui/layout'
import Sidebar from '../components/sidebar'
import { ScoreBoard } from '../components/scoreboard'
import { useMediaQuery } from '@chakra-ui/react'
import { getCompetitions } from '../lib/competitions'
import { CompetitionList } from '../components/competition-list'

export default function Home({ competitions }: any) {
  const [isTablet] = useMediaQuery('(min-width: 780px)')

  return (
    <Flex
      marginTop={{ base: '1rem', md: '3rem' }}
      paddingX={{ md: '4rem' }}
      flexWrap="wrap"
    >
      {isTablet && (
        <Box minWidth="300px">
          <Sidebar>
            <CompetitionList competitions={competitions} />
          </Sidebar>
        </Box>
      )}

      <Box flex="1 1 auto">
        <ScoreBoard />
      </Box>

      {isTablet && (
        <Box>
          <h1>Hi</h1>
        </Box>
      )}
    </Flex>
  )
}

// Leagues dont tend to change so we can use getStaticProps to render the data at build time.
export async function getStaticProps() {
  const competitions = await getCompetitions()
  return {
    props: {
      competitions: competitions,
    },
  }
}
