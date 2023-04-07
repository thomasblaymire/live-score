import {
  Heading,
  Flex,
  Text,
  Box,
  Container,
  Button,
  Image,
  IconButton,
} from '@chakra-ui/react'

import { HiChevronUp, HiChevronDown } from 'react-icons/hi'

interface TeamScoreControlProps {
  teamName: string
  teamLogo: string
  teamScore: number
  onScoreIncrement: () => void
  onScoreDecrement: () => void
  isReversed?: boolean
}

export const PredictionControls = ({
  teamName,
  teamLogo,
  teamScore,
  onScoreIncrement,
  onScoreDecrement,
  isReversed,
}: TeamScoreControlProps) => {
  const teamInfo = (
    <Flex alignItems="center" direction="column" width="300px">
      <Image src={teamLogo} alt={teamName} boxSize="50px" />
      <Text>{teamName}</Text>
    </Flex>
  )

  const scoreControls = (
    <Flex direction="column" gap="0.5rem">
      <IconButton
        aria-label={`Increase ${teamName} score`}
        icon={<HiChevronUp />}
        onClick={onScoreIncrement}
        background="#1238de"
      />

      <IconButton
        aria-label={`Decrease ${teamName} score`}
        icon={<HiChevronDown />}
        onClick={onScoreDecrement}
        background="#1238de"
      />
    </Flex>
  )

  return (
    <Flex alignItems="center" justifyContent="space-between" color="#FFF">
      {!isReversed && teamInfo}
      {scoreControls}
      {isReversed && teamInfo}
    </Flex>
  )
}
