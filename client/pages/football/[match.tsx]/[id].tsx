import { Flex, Box } from '@chakra-ui/layout'
import { useRouter } from 'next/router'
import { Player } from '../../../components/player'
import { LiveChat } from '../../../components/chat/live-chat'
import { ScoreCard } from '../../../components/score-card'
import { getMatchData } from '../../../lib/api-helpers'
import { useQuery } from 'react-query'

export default function Match() {
  const router = useRouter()
  const { id } = router.query

  const {
    data: { score, homeTeam, awayTeam, status, venue, youtubeID },
    isLoading,
    error,
  } = useQuery({
    queryKey: ['match'],
    queryFn: () => getMatchData(id),
    initialData: [],
  })

  return (
    <Flex
      marginTop={{ base: '1rem', md: '3rem' }}
      paddingX={{ md: '4rem' }}
      justifyContent="space-between"
    >
      <Box>
        <Player embedId={`${youtubeID}`} />
      </Box>
      <Box minWidth="450px">
        <Box marginBottom="2rem">
          {homeTeam && (
            <ScoreCard homeTeam={homeTeam} awayTeam={awayTeam} score={score} />
          )}
        </Box>

        <Box>
          <LiveChat />
        </Box>
      </Box>
    </Flex>
  )
}
