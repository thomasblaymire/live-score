import Sidebar from '../components/sidebar'
import { getCompetitions, getNews } from '../lib/api-helpers'
import { Box, Grid, GridItem } from '@chakra-ui/layout'
import { ScoreBoard } from '../components/scoreboard'
import { useMediaQuery, Heading } from '@chakra-ui/react'
import { CompetitionList } from '../components/competition-list'
import { getFixtures } from '../hooks/useFixtures'
import { StandingsTable } from '../components/standings'
import { HeroCard } from '../components/hero-card'
import { News } from '../components/news'
import { Card } from '../components/card'
import { Footer } from '../components/footer'

interface HomeProps {
  competitions: Competitions[]
  competitionsError: Error | undefined
  news: NewsItem[]
  newsError: Error | undefined
  fixtures: CustomFixture[]
}

export default function Home({
  competitions,
  competitionsError,
  news,
  newsError,
  fixtures,
}: HomeProps) {
  const [isTablet] = useMediaQuery('(min-width: 780px)')

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
          marginTop={{ md: '2rem' }}
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
                  <CompetitionList
                    competitions={competitions}
                    isLoading={false}
                    error={competitionsError}
                  />
                </Card>
              </Sidebar>
            </GridItem>
          )}

          <GridItem area={'main'}>
            {isTablet && (
              <>
                <HeroCard />
                <Heading
                  fontSize="1.3rem"
                  color="white"
                  marginBottom="1rem"
                  fontFamily="inherit"
                >
                  Football Matches
                </Heading>
              </>
            )}
            <ScoreBoard initialFixtures={fixtures} />
          </GridItem>

          {isTablet && (
            <GridItem area={'aside'}>
              <Sidebar>
                <Card margin="0 0 2rem 0" height="45vh" heading="Latest News">
                  <News news={news} isLoading={false} error={newsError} />
                </Card>
                <Card heading="Standings">
                  <Box padding="1rem">
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

export async function getStaticProps() {
  const { data: competitions, error: competitionsError } =
    await getCompetitions()
  const { data: news, error: newsError } = await getNews()

  const dateRange = {
    startDate: '2023-04-09',
    endDate: '2023-04-09',
  }

  try {
    const fixtures = await getFixtures(dateRange)
    return {
      props: {
        competitions,
        competitionsError,
        news,
        newsError,
        fixtures,
      },
      revalidate: 60,
    }
  } catch (error) {
    console.error('Error fetching fixture data:', error)
    return {
      props: {
        competitions,
        competitionsError,
        news,
        newsError,
        fixtures: [],
      },
      revalidate: 60,
    }
  }
}
