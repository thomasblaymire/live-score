import { Flex, IconButton, Text } from '@chakra-ui/react'
import { HiChevronUp, HiChevronDown } from 'react-icons/hi'
import { useState } from 'react'

export function PredictionInput() {
  const [teamAScore, setTeamAScore] = useState(0)
  const [teamBScore, setTeamBScore] = useState(0)

  const handleScoreChange = (
    team: 'A' | 'B',
    action: 'increment' | 'decrement'
  ) => {
    if (team === 'A') {
      if (action === 'increment' && teamAScore < 10) {
        setTeamAScore(teamAScore + 1)
      } else if (action === 'decrement' && teamAScore > 0) {
        setTeamAScore(teamAScore - 1)
      }
    } else {
      if (action === 'increment' && teamBScore < 10) {
        setTeamBScore(teamBScore + 1)
      } else if (action === 'decrement' && teamBScore > 0) {
        setTeamBScore(teamBScore - 1)
      }
    }
  }

  return (
    <Flex alignItems="center">
      <IconButton
        aria-label="Increase team A score"
        icon={<HiChevronUp />}
        onClick={() => handleScoreChange('A', 'increment')}
      />
      <Text mx={2}>{teamAScore}</Text>
      <IconButton
        aria-label="Decrease team A score"
        icon={<HiChevronDown />}
        onClick={() => handleScoreChange('A', 'decrement')}
      />
      <Text>-</Text>
      <IconButton
        aria-label="Increase team B score"
        icon={<HiChevronUp />}
        onClick={() => handleScoreChange('B', 'increment')}
      />
      <Text mx={2}>{teamBScore}</Text>
      <IconButton
        aria-label="Decrease team B score"
        icon={<HiChevronDown />}
        onClick={() => handleScoreChange('B', 'decrement')}
      />
    </Flex>
  )
}
