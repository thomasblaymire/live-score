import Sidebar from '../components/sidebar'
import { Box, Flex, Container, Grid, GridItem } from '@chakra-ui/layout'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { ScoreBoard } from '../components/scoreboard'
import { useMediaQuery, Heading } from '@chakra-ui/react'
import { getCompetitions, getMatches } from '../lib/api-helpers'
import { CompetitionList } from '../components/competition-list'
import { StandingsTable } from '../components/standings'
import { BetCard } from '../components/bet-card'
import { Card } from '../components/card'
import { getStandings } from '../lib/api-helpers'
import { Competition } from '../types/index'

interface HomeProps {
  competitions: Competition[]
  league: any
}

export default function Home({ competitions, league }: HomeProps) {
  const [isTablet] = useMediaQuery('(min-width: 780px)')

  return (
    <Box width="1200px" margin="0 auto">
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
              <Card
                color="#FFF"
                heading="Top Competitions"
                background="#1F1F1F"
                margin="0 0 2rem 0"
                height="45vh"
                radius="15px"
              >
                <CompetitionList competitions={competitions} />
              </Card>
            </Sidebar>
          </GridItem>
        )}

        <GridItem area={'main'}>
          <BetCard />
          <Heading
            fontSize="1.3rem"
            color="white"
            marginBottom="1rem"
            fontFamily="inherit"
          >
            Football Matches
          </Heading>
          <ScoreBoard />
        </GridItem>

        {isTablet && (
          <GridItem area={'aside'}>
            <Sidebar>
              <Card
                background="#121212"
                margin="0 0 2rem 0"
                height="45vh"
                radius="15px"
              />
              <Card
                heading="Standings"
                background="#121212"
                color="#FFF"
                radius="15px"
              >
                <Box padding="0 1rem">
                  <StandingsTable standings={league.standings} size="sm" />
                </Box>
              </Card>
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

  const data = await getStandings('39')

  console.log('server side ', data.standings[0].league)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      competitions: competitions,
      league: data.standings[0].league,
    },
  }
}
