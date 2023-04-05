import { Flex, IconButton, Image, Text, Box } from '@chakra-ui/react'
import { HiChevronUp, HiChevronDown } from 'react-icons/hi'
import { useState } from 'react'

interface FixtureProps {
  teamA: string
  teamALogo: string
  teamB: string
  teamBLogo: string
}

export const PredictionList = ({
  teamA,
  teamALogo,
  teamB,
  teamBLogo,
}: FixtureProps) => {
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
    <Flex alignItems="center" justifyContent="space-around" width="100%" my={4}>
      <Box width="40%">
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center" direction="column" width="300px">
            <Image src={teamALogo} alt="homeTeam" boxSize="50px" />
            <Text>{teamA}</Text>
          </Flex>

          <Flex direction="column" gap="0.5rem">
            <IconButton
              aria-label="Increase team A score"
              icon={<HiChevronUp />}
              onClick={() => handleScoreChange('A', 'increment')}
            />

            <IconButton
              aria-label="Decrease team A score"
              icon={<HiChevronDown />}
              onClick={() => handleScoreChange('A', 'decrement')}
            />
          </Flex>
        </Flex>
      </Box>
      <Text fontSize="xl">
        {teamAScore} - {teamBScore}
      </Text>

      <Box width="40%">
        <Flex alignItems="center" justifyContent="space-between">
          <Flex direction="column" gap="0.5rem">
            <IconButton
              aria-label="Increase team B score"
              icon={<HiChevronUp />}
              onClick={() => handleScoreChange('B', 'increment')}
            />

            <IconButton
              aria-label="Decrease team B score"
              icon={<HiChevronDown />}
              onClick={() => handleScoreChange('B', 'decrement')}
            />
          </Flex>

          <Flex alignItems="center" direction="column" width="300px">
            <Image src={teamBLogo} alt="awayTeam" boxSize="50px" />
            <Text>{teamB}</Text>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  )
}
