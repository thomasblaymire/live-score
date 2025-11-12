import { Box, Flex } from '@chakra-ui/react'
import { GiWhistle, GiGoalKeeper } from 'react-icons/gi'
import { MdStadium } from 'react-icons/md'
import { RiFootballFill } from 'react-icons/ri'

interface MatchInfoProps {
  fixture: Fixture
  league: League
}

export function MatchInfo({ fixture, league }: MatchInfoProps) {
  const matchInfoData = [
    {
      icon: GiWhistle,
      text: fixture.referee,
    },
    {
      icon: GiGoalKeeper,
      text: fixture.status.long,
    },
    {
      icon: MdStadium,
      text: `${fixture.venue.name}, ${fixture.venue.city}`,
    },
    {
      icon: RiFootballFill,
      text: league.name,
    },
  ]

  return (
    <Box fontSize="0.8rem" padding="1rem">
      {matchInfoData.map(({ icon: Icon, text }, index) => (
        <Flex
          key={index}
          paddingBottom={index !== matchInfoData.length - 1 ? '1rem' : '0'}
        >
          <Icon style={{ fontSize: '1.3rem', marginRight: '0.5rem' }} />
          {text}
        </Flex>
      ))}
    </Box>
  )
}
