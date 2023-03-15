import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from '@chakra-ui/react'
import { Flex, Box, Text } from '@chakra-ui/layout'
import { Status } from './status'
import { BiLike, BiChat, BiShare } from 'react-icons/bi'

interface ScoreTeam {
  id: number
  name: string
  shortName: string
  tla: string
  crest: string
}

interface ScoreAtInterval {
  home: number
  away: number
}

interface Score {
  winner: 'HOME_TEAM' | 'AWAY_TEAM'
  duration: 'REGULAR' | 'EXTRA'
  fullTime: ScoreAtInterval
  halfTime: ScoreAtInterval
}

interface ScoreCardProps {
  data: SingleMatch
}

export function ScoreCard({
  data: { league, teams, goals, fixture },
}: ScoreCardProps) {
  return (
    <Card width="80%" margin="0 auto" background="#121212" borderRadius="15px">
      <CardHeader
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        paddingY="1.5rem"
        color="white"
      >
        <Status status={fixture.status} />

        <Box display="flex" alignItems="center">
          <Avatar
            name="League"
            size="sm"
            marginBottom="0.5rem"
            src={league.logo}
            marginRight="0.5rem"
          />
          {league.name}
        </Box>
        <Box>SOCIAL</Box>
      </CardHeader>
      <CardBody color="white" paddingY="2.5rem">
        <Flex justifyContent="center" width="100%">
          <Flex alignItems="center" width="100%" justifyContent="space-evenly">
            <Flex alignItems="center" direction="column">
              <Avatar
                name={teams.home.name}
                size="lg"
                marginBottom="0.5rem"
                src={teams.home.logo}
              />
              <Text>{teams.home.name}</Text>
            </Flex>

            <Box>
              <Flex>
                <Box>{goals.home}</Box>
                <Box>{goals.away}</Box>
              </Flex>
            </Box>

            <Flex alignItems="center" direction="column">
              <Avatar
                name={teams.away.name}
                size="lg"
                marginBottom="0.5rem"
                src={teams.away.logo}
              />
              <Text>{teams.away.name}</Text>
            </Flex>
          </Flex>
        </Flex>
      </CardBody>

      <CardFooter
        justify="space-between"
        color="white"
        paddingY="1.5rem"
        sx={{
          '& > button': {
            minW: '136px',
          },
        }}
      >
        <Box>{fixture.date}</Box>
        <Box>
          {fixture.venue.name},{fixture.venue.city}
        </Box>
        <Box>{fixture.referee}</Box>
      </CardFooter>
    </Card>
  )
}
