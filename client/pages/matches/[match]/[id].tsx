import { Flex, Box, useBreakpointValue, Center } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Card } from '@/components/ui/card'
import { MatchVideo } from '@/components/features/match/match-video'
import { Stats } from '@/components/features/stats'
import { ScoreCard } from '@/components/features/scorecard'
import { MatchTabs } from '@/components/features/match/match-tabs'
import { Timeline } from '@/components/features/timeline'
import { MatchPlayers } from '@/components/features/match/match-players'
import { Loading } from '@/components/ui/loading'
import { useMatch } from '@/hooks/useMatch'

export default function Match() {
  const router = useRouter()
  const { id } = router.query
  const { data, isLoading, error } = useMatch(id)
  const isMobile = useBreakpointValue({ base: true, md: false })
  const containerWidth = useBreakpointValue({
    base: '100%',
    md: '720px',
    lg: '960px',
    xl: '1200px',
  })

  if (isLoading || !data) {
    return (
      <Center marginTop="5rem">
        <Loading loading={isLoading} />
      </Center>
    )
  }

  return (
    <Box
      minHeight="100vh"
      margin="0 auto"
      width={containerWidth}
      padding={{ base: '0 1rem', md: '0' }}
    >
      <Box
        marginBottom={{ base: '1.5rem', md: '2.5rem' }}
        marginTop={{ base: '1rem', md: '2rem' }}
      >
        <ScoreCard data={data} />
      </Box>

      {isMobile && (
        <MatchTabs
          events={data.events}
          lineups={data.lineups}
          teams={data.teams}
          fixture={data.fixture}
          league={data.league}
        />
      )}

      {!isMobile && (
        <Flex justifyContent="center" gap="1.5rem" flexWrap="wrap">
          <Box flex={1}>
            <Box marginBottom="2.5rem">
              {data?.lineups && (
                <MatchPlayers
                  heading="Lineups"
                  homeTeam={data.lineups[0].team}
                  awayTeam={data.lineups[1].team}
                  homePlayers={data.lineups[0].startXI}
                  awayPlayers={data.lineups[1].startXI}
                />
              )}
            </Box>
            <Box marginBottom="2.5rem">
              <MatchPlayers
                heading="Substitutes"
                homeTeam={data.lineups[0].team}
                awayTeam={data.lineups[1].team}
                homePlayers={data.lineups[0].substitutes}
                awayPlayers={data.lineups[1].substitutes}
              />
            </Box>
            <Box marginBottom="2.5rem">
              <Card heading="Stats" headingAlign="center" radius="15px">
                <Stats />
              </Card>
            </Box>
          </Box>

          <Box flex={1}>
            <Box marginBottom="2.5rem">
              <Card heading="Events" headingAlign="center" radius="15px">
                {data.events ? (
                  <Timeline
                    matchEvents={data.events}
                    awayTeamId={data.teams.away.id}
                    homeTeamId={data.teams.home.id}
                  />
                ) : null}
              </Card>
            </Box>
            <Box marginBottom="2.5rem">
              <Card heading="Highlights" headingAlign="center" radius="15px">
                <MatchVideo embedId={`${process.env.youtubeID}`} />
              </Card>
            </Box>
          </Box>
        </Flex>
      )}
    </Box>
  )
}
