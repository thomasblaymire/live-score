import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Flex,
  Box,
  Text,
  useMediaQuery,
} from '@chakra-ui/react'
import { ScoreboardStatus } from '../scoreboard/scoreboard-status-legacy'
import { formatUTCDate } from '@/lib/time'
import { formatTeamNameString } from '@/lib/string'
import { BiTime } from 'react-icons/bi'
import { MdOutlineStadium } from 'react-icons/md'
import { GiWhistle } from 'react-icons/gi'
import { FiShare2 } from 'react-icons/fi'
import { ScoreCardDetail } from './scorecard-details'
import NextImage from 'next/image'

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

interface ScoreCardProps {
  data: SingleMatch
}

export function ScoreCard({
  data: { league, teams, goals, fixture },
}: ScoreCardProps) {
  const [isLargerThanMobile] = useMediaQuery('(min-width: 768px)')

  const scoreCardData = [
    {
      icon: <BiTime />,
      detail: formatUTCDate(fixture.date),
    },
    {
      icon: <MdOutlineStadium color="gray.800" />,
      detail: `${fixture.venue.name},${fixture.venue.city}`,
    },
    {
      icon: <GiWhistle />,
      detail: `${fixture.referee}`,
    },
  ]

  return (
    <Card
      width={{ base: 'unset', md: '80%' }}
      margin="0 auto"
      background="#1b1b1b"
      border="solid 1px #353945"
      borderRadius="15px"
    >
      {isLargerThanMobile && (
        <CardHeader
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          paddingY="1.5rem"
          color="white"
        >
          <ScoreboardStatus status={fixture.status} />
          <Box display="flex" alignItems="center" marginRight="3.5rem">
            <Avatar
              name="League"
              size="sm"
              marginBottom="0.5rem"
              src={league.logo}
              marginRight="0.5rem"
            />
            {league.name}
          </Box>
          <Box>
            <FiShare2 />
          </Box>
        </CardHeader>
      )}

      <CardBody color="white" paddingY={{ base: '1rem', md: '2.5rem' }}>
        <Flex justifyContent="center" width="100%">
          <Flex width="100%" justifyContent="space-evenly">
            <Flex alignItems="center" direction="column">
              <NextImage
                src={teams.home.logo}
                width="0"
                height="0"
                style={{ width: '30%', height: 'auto', marginBottom: '0.5rem' }}
                alt={teams.home.name}
              />
              <Text
                display="table"
                width={{ base: 'unset', sm: '100px' }}
                textAlign="center"
                margin={{ base: 'unset', sm: '0 1rem 0 0.5rem' }}
                fontSize={{ base: '0.9rem', md: 'initial' }}
              >
                {!isLargerThanMobile
                  ? formatTeamNameString(teams.home.name)
                  : teams.home.name}
              </Text>
            </Flex>

            <Text
              fontSize={{ base: '1.5rem', md: '1.8rem' }}
              fontWeight="bold"
              as="span"
              textAlign="center"
              mb="10px"
              minWidth="55px"
            >{`${goals.home} - ${goals.away}`}</Text>

            <Flex alignItems="center" direction="column">
              <NextImage
                src={teams.away.logo}
                width="0"
                height="0"
                style={{ width: '30%', height: 'auto', marginBottom: '0.5rem' }}
                alt={teams.away.name}
              />
              <Text
                display="table"
                width={{ base: 'unset', sm: '100px' }}
                textAlign="center"
                margin={{ base: 'unset', sm: '0 1rem 0 0.5rem' }}
                fontSize={{ base: '0.9rem', md: 'initial' }}
              >
                {!isLargerThanMobile
                  ? formatTeamNameString(teams.away.name)
                  : teams.away.name}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </CardBody>

      {isLargerThanMobile && (
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
          {scoreCardData.map((item, i) => (
            <ScoreCardDetail key={i} detail={item.detail} icon={item.icon} />
          ))}
        </CardFooter>
      )}
    </Card>
  )
}
