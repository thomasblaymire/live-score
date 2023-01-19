import Sidebar from '../components/sidebar'
import { Box, Flex, Container, Grid, GridItem } from '@chakra-ui/layout'
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
    <Box width="1300px" margin="0 auto">
      <Grid
        marginTop={{ base: '1rem', md: '2rem' }}
        columnGap="2.4rem"
        rowGap="2.4rem"
        height="1000px"
        templateAreas={{
          base: `"sidebar main" ". aside"`,
          sm: `"sidebar main"`,
          md: `"sidebar main aside"`,
        }}
        gridTemplateRows="auto"
        // gridTemplateColumns={{
        //   base: 'minmax(0,5fr) minmax(0,12fr) minmax(300px,7fr)',
        //   xs: 'minmax(0,1fr)',
        //   md: 'minmax(0,5fr) minmax(0,12fr) minmax(300px,7fr)',
        // }}
        gridTemplateColumns={{
          sm: 'minmax(0,6fr) minmax(0,12fr) minmax(300px,7fr)',
          base: 'minmax(0,1fr)',
        }}
      >
        {isTablet && (
          <GridItem area={'sidebar'}>
            <Sidebar>
              <CompetitionList competitions={competitions} />
            </Sidebar>
          </GridItem>
        )}

        <GridItem area={'main'}>
          <BetCard />
          <Heading fontSize="1.5rem" color="white" marginBottom="1.5rem">
            Football Matches
          </Heading>
          <ScoreBoard />
        </GridItem>

        {isTablet && (
          <GridItem area={'aside'}>
            <Sidebar>
              <Box
                background="#1F1F1F"
                marginBottom="2rem"
                height="45vh"
                borderRadius="15px"
              ></Box>
              <Box background="#1F1F1F" height="45vh" borderRadius="15px"></Box>
            </Sidebar>
          </GridItem>
        )}
      </Grid>
    </Box>
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
