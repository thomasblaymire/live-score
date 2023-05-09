import { Flex, Box, useBreakpointValue } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Card } from '../../../components/ui/card'
import { MatchVideo } from '../../../components/features/match/match-video'
import { LiveChat } from '../../../components/features/chat/live-chat'
import { Stats } from '../../../components/features/stats'
import { ScoreCard } from '../../../components/features/scorecard'
import { MatchTabs } from '../../../components/features/match/match-tabs'
import { Timeline } from '../../../components/features/timeline'
import { MatchPlayers } from '../../../components/features/match/match-players'
import { Formations } from '../../../components/features/formations'
import { Loading } from '../../../components/ui/loading'
import { useMatch } from '../../../hooks/useMatch'

export default function Match() {
  const router = useRouter()
  const { id } = router.query
  const { data, isLoading, error } = useMatch(id)
  const isMobile = useBreakpointValue({ base: true, md: false })

  if (isLoading || !data) {
    return <Loading loading={isLoading} />
  }

  return (
    <Box margin={{ base: '1rem', md: '3rem' }} minHeight="100vh">
      <Box marginBottom={{ base: '1.5rem', md: '2.5rem' }}>
        <ScoreCard data={data} />
      </Box>

      {isMobile && (
        <MatchTabs
          events={data.events}
          lineups={data.lineups}
          teams={data.teams}
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
              <Card
                heading="Events"
                headingAlign="center"
                background="#121212"
                radius="15px"
              >
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
              <Card
                heading="Stats"
                headingAlign="center"
                background="#121212"
                radius="15px"
              >
                DATA
              </Card>
            </Box>
          </Box>

          <Box flex={1}>
            {/* <Box marginBottom="2.5rem">
            <Card
              heading="Formations"
              headingAlign="center"
              background="#121212"
              radius="15px"
            >
              <Formations formation={[4, 4, 2]} />
            </Card>
          </Box>  */}
            <Box marginBottom="2.5rem">
              <Card
                heading="Stats"
                headingAlign="center"
                background="#121212"
                radius="15px"
              >
                <Stats />
              </Card>
            </Box>
            <Box marginBottom="2.5rem">
              <Card
                heading="Highlights"
                headingAlign="center"
                background="#121212"
                radius="15px"
              >
                {/* <Player embedId={`${youtubeID}`} /> */}
              </Card>
            </Box>
          </Box>
        </Flex>
      )}
    </Box>
  )
}
