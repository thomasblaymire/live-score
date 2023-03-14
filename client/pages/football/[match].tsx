import { Flex, Box } from '@chakra-ui/layout'
import { useRouter } from 'next/router'
import { Player } from '../../components/player'
import { LiveChat } from '../../components/chat/live-chat'
import { ScoreCard } from '../../components/score-card'
import { PlayerList } from '../../components/players/player-list'
import { Loading } from '../../components/loading'
import { getMatchData } from '../../lib/api-helpers'
import { useQuery } from 'react-query'
import { useMatch } from '../../hooks/useMatch'

export default function Match() {
  const router = useRouter()
  const { id } = router.query

  const { data, isLoading, error } = useMatch(id)

  console.log('debug data', data)

  return (
    <Box
      marginTop={{ base: '1rem', md: '3rem' }}
      width="1200px"
      height="200vh"
      margin="0 auto"
    >
      <Box></Box>
      <Loading loading={isLoading} />
      <Box marginBottom="4rem">{data ? <ScoreCard data={data} /> : null}</Box>

      <Flex justifyContent="center" gap="1.5rem">
        <Box width="40%">
          {data?.lineups ? (
            <PlayerList heading="Lineups" lineups={data.lineups} />
          ) : null}
        </Box>
        <Box width="40%">
          {data?.lineups ? (
            <PlayerList heading="Substitutes" lineups={data.lineups} />
          ) : null}
        </Box>
      </Flex>

      <Flex justifyContent="center" gap="1.5rem">
        <Box width="40%">EVENTS</Box>
        <Box width="40%">STATS</Box>
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
