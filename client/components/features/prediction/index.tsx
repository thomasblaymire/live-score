import { Flex, Text, Box } from '@chakra-ui/react'
import { PredictionControls } from './prediction-controls'

interface FixtureProps {
  matchId: number
  teamA: string
  teamALogo: string
  teamB: string
  teamBLogo: string
  teamAScore: number
  teamBScore: number
  onScoreChange: (
    matchId: number,
    teamAScore: number,
    teamBScore: number
  ) => void
}

export function PredictionList({
  matchId,
  teamA,
  teamALogo,
  teamB,
  teamBLogo,
  teamAScore,
  teamBScore,
  onScoreChange,
}: FixtureProps) {
  function handleScoreChange(
    team: 'A' | 'B',
    action: 'increment' | 'decrement'
  ) {
    const isIncrement = action === 'increment'
    const newTeamAScore =
      team === 'A'
        ? isIncrement && teamAScore < 10
          ? teamAScore + 1
          : !isIncrement && teamAScore > 0
          ? teamAScore - 1
          : teamAScore
        : teamAScore
    const newTeamBScore =
      team === 'B'
        ? isIncrement && teamBScore < 10
          ? teamBScore + 1
          : !isIncrement && teamBScore > 0
          ? teamBScore - 1
          : teamBScore
        : teamBScore

    if (newTeamAScore !== teamAScore || newTeamBScore !== teamBScore) {
      onScoreChange(matchId, newTeamAScore, newTeamBScore)
    }
  }

  return (
    <Flex alignItems="center" justifyContent="space-around" width="100%" my={4}>
      <Box width="40%">
        <PredictionControls
          teamName={teamA}
          teamLogo={teamALogo}
          teamScore={teamAScore}
          onScoreIncrement={() => handleScoreChange('A', 'increment')}
          onScoreDecrement={() => handleScoreChange('A', 'decrement')}
        />
      </Box>
      <Text fontSize="xl" color="#FFF">
        {teamAScore} - {teamBScore}
      </Text>
      <Box width="40%">
        <PredictionControls
          teamName={teamB}
          teamLogo={teamBLogo}
          teamScore={teamBScore}
          onScoreIncrement={() => handleScoreChange('B', 'increment')}
          onScoreDecrement={() => handleScoreChange('B', 'decrement')}
          isReversed
        />
      </Box>
    </Flex>
  )
}
