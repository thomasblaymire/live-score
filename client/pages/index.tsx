import Sidebar from '../components/sidebar'
import { dehydrate } from 'react-query/hydration'
import { QueryClient, useQuery } from 'react-query'
import { GetServerSideProps } from 'next'
import { Box, Grid, GridItem } from '@chakra-ui/layout'
import { ScoreBoard } from '../components/scoreboard'
import { useMediaQuery, Heading } from '@chakra-ui/react'
import { getMatches, getNews, getStandings } from '../lib/api-helpers'
import { CompetitionList } from '../components/competition-list'
import { StandingsTable } from '../components/standings'
import { BetCard } from '../components/bet-card'
import { Card } from '../components/card'
import { Footer } from '../components/footer'

import { getSession } from 'next-auth/react'

interface HomeProps {
  competitions: Competitions[]
  competition: Competition
  news: NewsResponse[]
}

export default function Home({ competition }: HomeProps) {
  const [isTablet] = useMediaQuery('(min-width: 780px)')

  const {
    data: news,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['teams'],
    queryFn: () => getNews(),
  })

  console.log('debug in page', news?.articles)

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
                  <CompetitionList />
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
                  {news?.map((article: any, i: number) => (
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
                    <StandingsTable size="sm" />
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}
