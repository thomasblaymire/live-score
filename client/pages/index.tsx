import Sidebar from '@/components/layout/sidebar'
import { fetchHomepageData } from '@/lib/api-helpers'
import { Box, Grid, GridItem } from '@chakra-ui/layout'
import { useMediaQuery, Heading } from '@chakra-ui/react'
import { getFixtures } from '@/hooks/useFixtures'
import { StandingsTable } from '@/components/features/standings'
import { ScoreBoard } from '@/components/features/scoreboard'
import { StandingsList } from '@/components/features/standings/standings-list'
import { Search } from '@/components/features/search'
import { News } from '@/components/features/news'
import { HeroCard } from '@/components/ui/hero-card'
import { SEO } from '@/components/ui/seo'
import { Card } from '@/components/ui/card'
import { Footer } from '@/components/layout/footer'

interface HomeProps {
  competitions: Competitions[]
  competitionsError: Error | undefined
  news: NewsItem[]
  newsError: Error | undefined
  fixtures: CustomFixture[]
  standings: Standings
}

export default function Home({
  competitions,
  competitionsError,
  news,
  newsError,
  fixtures,
  standings,
}: HomeProps) {
  const [isTablet] = useMediaQuery('(min-width: 780px)')

  return (
    <>
      <SEO
        title="Current Score"
        description="Keep track of all the latest football scores, results and standings from around the world."
        keywords="football, soccer, standings, matches"
      />
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
                  <StandingsList
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
                <Card margin="0 0 2rem 0" height="45vh">
                  <Box padding="0.5rem">
                    <Search />
                  </Box>
                </Card>
                <Card margin="0 0 2rem 0" height="45vh" heading="Latest News">
                  <News news={news} isLoading={false} error={newsError} />
                </Card>
                <Card heading="Standings" border="solid 1px #353945;">
                  <Box padding="1rem">
                    <StandingsTable size="sm" standings={standings} />
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

function buildProps(data: any, fixtures?: CustomFixture[]) {
  return {
    props: {
      ...data,
      fixtures,
    },
    revalidate: 60,
  }
}

export async function getStaticProps() {
  const dateRange = {
    startDate: '2023-04-09',
    endDate: '2023-04-09',
  }

  const data = await fetchHomepageData()

  try {
    const fixtures = await getFixtures(dateRange)
    return buildProps(data, fixtures)
  } catch (error) {
    console.error('Error fetching fixture data:', error)
    return buildProps(data)
  }
}
