import { Flex, Box } from '@chakra-ui/layout'
import { useRouter } from 'next/router'
import { Card } from '../../components/card'
import { Player } from '../../components/player'
import { LiveChat } from '../../components/chat/live-chat'
import { Stats } from '../../components/stats'
import { ScoreCard } from '../../components/scorecard'
import { Timeline } from '../../components/timeline'
import { Players } from '../../components/players/players'
import { Loading } from '../../components/loading'
import { useMatch } from '../../hooks/useMatch'
import { SimpleGrid } from '@chakra-ui/react'

export default function Match() {
  const router = useRouter()
  const { id } = router.query
  const { data, isLoading, error } = useMatch(id)
  const youtubeID = 'lA5uJuQA7DQ'

  console.log('debug data', data)

  return (
    <Box
      marginTop={{ base: '1rem', md: '3rem' }}
      width="1200px"
      height="400vh"
      margin="0 auto"
    >
      <Box marginBottom="2.5rem">{data ? <ScoreCard data={data} /> : null}</Box>
      <Flex justifyContent="center" gap="1.5rem">
        <Box flex={1}>
          <Box marginBottom="2.5rem">
            {data?.lineups && (
              <Players
                heading="Lineups"
                homeTeam={data.lineups[0].team}
                awayTeam={data.lineups[1].team}
                homePlayers={data.lineups[0].startXI}
                awayPlayers={data.lineups[1].startXI}
              />
            )}
          </Box>
          <Box marginBottom="2.5rem">
            {data ? (
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
            ) : null}
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
          <Box marginBottom="2.5rem">
            {data?.lineups ? (
              <Players
                heading="Substitutes"
                homeTeam={data.lineups[0].team}
                awayTeam={data.lineups[1].team}
                homePlayers={data.lineups[0].substitutes}
                awayPlayers={data.lineups[1].substitutes}
              />
            ) : null}
          </Box>
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
              <Player embedId={`${youtubeID}`} />
            </Card>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

{
  /* <Player embedId={`${youtubeID}`} /> */
}

{
  /* <Box>
          <LiveChat />
        </Box> */
}
