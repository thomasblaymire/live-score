'use client'

import { Footer } from '@/components/layout/footer'
import Sidebar from '@/components/layout/sidebar'
import { News } from '@/components/news'
import { ScoreBoard } from '@/components/scoreboard'
import { Search } from '@/components/search'
import { StandingsTable } from '@/components/standings'
import { StandingsList } from '@/components/standings/standings-list'
import { Card } from '@/components/ui/card'
import { HeroCard } from '@/components/ui/hero-card'
import { Competition, Fixture, Standing } from '@/types'
import { Box, Grid, GridItem, Heading, useMediaQuery } from '@chakra-ui/react'

interface HomeContentProps {
  fixtures: Fixture[]
  competitions: Competition[]
  standings: Standing[]
  currentDate: string
}

export function HomeContent({ fixtures, currentDate, competitions, standings }: HomeContentProps) {
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
                  <StandingsList competitions={competitions} isLoading={false} />
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
            <ScoreBoard 
              initialFixtures={fixtures} 
              initialDate={currentDate} 
            />
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
                  {/* <News /> */}
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