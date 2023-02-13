import Sidebar from '../components/sidebar'
import { useState } from 'react'
import { Box, Grid, GridItem } from '@chakra-ui/layout'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { ScoreBoard } from '../components/scoreboard'
import { useMediaQuery, Heading } from '@chakra-ui/react'
import {
  getCompetitions,
  getMatches,
  getLeague,
  getNews,
} from '../lib/api-helpers'
import { CompetitionList } from '../components/competition-list'
import { StandingsTable } from '../components/standings'
import { BetCard } from '../components/bet-card'
import { Card } from '../components/card'
import { Footer } from '../components/footer'

interface HomeProps {
  competitions: Competitions[]
  competition: Competition
  news: NewsResponse[]
}

export default function Home({ competitions, competition, news }: HomeProps) {
  const [isTablet] = useMediaQuery('(min-width: 780px)')
  const [reveiws, setReviews] = useState(null)

  return (
    <>
      <Box
        width={{
          md: '720px',
          lg: '960px',
          xl: '1200px',
        }}
        maxWidth="unset"
        margin="0 auto"
        height="100%"
        mb="4rem"
      >
        <Grid
          marginTop={{ base: '1rem', md: '2rem' }}
          columnGap="2.4rem"
          rowGap="2.4rem"
          templateAreas={{
            base: `"main"`,
            md: `"sidebar main" ". aside"`,
            xl: `"sidebar main aside"`,
          }}
          gridTemplateRows="auto"
          gridTemplateColumns={{
            base: 'minmax(0,1fr)',
            md: 'minmax(0,7fr) minmax(0,17fr) ',
            xl: 'minmax(0,6fr) minmax(0,12fr) minmax(300px,7fr)',
          }}
        >
          {isTablet && (
            <GridItem area={'sidebar'}>
              <Sidebar>
                <Card
                  heading="Top Competitions"
                  margin="0 0 2rem 0"
                  height="45vh"
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
                <Card margin="0 0 2rem 0" height="45vh" heading="Latest News">
                  {news.map((article: any, i: number) => (
                    <Box
                      fontSize="0.75rem"
                      color="white"
                      padding="1rem"
                      key={i}
                    >
                      {article.title}
                    </Box>
                  ))}
                </Card>
                <Card heading="Standings">
                  <Box padding="0 1rem">
                    <StandingsTable
                      standings={competition.standings}
                      size="sm"
                    />
                  </Box>
                </Card>
              </Sidebar>
            </GridItem>
          )}
        </Grid>
      </Box>
      <Footer />
    </>
  )
}

// Build time fetch leagues and inital score data
export async function getStaticProps() {
  const queryClient = new QueryClient()

  const competitions = await getCompetitions()
  const competition = await getLeague('39')
  const news = await getNews()

  await queryClient.prefetchQuery(['matches'], getMatches)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      competitions: competitions,
      competition: competition.league,
      news: news,
    },
  }
}
