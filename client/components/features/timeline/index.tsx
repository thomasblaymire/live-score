import { Container, VStack, Flex, useColorModeValue } from '@chakra-ui/react'
import { BoxProps, Circle } from '@chakra-ui/react'
import { RiFootballLine } from 'react-icons/ri'
import { BiTransfer } from 'react-icons/bi'
import { FiCheckCircle } from 'react-icons/fi'
import { Box } from '@chakra-ui/react'

interface TimeLineProps {
  matchEvents: any
  homeTeamId: number
  awayTeamId: number
}

export const Timeline = ({
  matchEvents,
  homeTeamId,
  awayTeamId,
}: TimeLineProps) => {
  const eventsByTeam = matchEvents.reduce(
    (acc: any, event: any) => {
      if (event.team.id === homeTeamId) {
        acc.home.push(event)
      } else if (event.team.id === awayTeamId) {
        acc.away.push(event)
      }
      return acc
    },
    { home: [], away: [] }
  )

  const renderEvent = (event: any, index: number) => {
    const isLast = index === matchEvents.length - 1
    switch (event.type) {
      case 'Goal':
        return (
          <MilestoneItem icon={RiFootballLine} last={isLast} key={index}>
            Goal {event.player.name} ({event.time.elapsed})
          </MilestoneItem>
        )
      case 'subst':
        return (
          <MilestoneItem icon={BiTransfer} last={isLast} key={index}>
            Substitute ({event.time.elapsed})
            <Flex>
              <Box>{event.assist.name} -</Box>
              <Box>{event.player.name}</Box>
            </Flex>
          </MilestoneItem>
        )
      case 'Card':
        return (
          <MilestoneItem icon={RiFootballLine} last={isLast} key={index}>
            Card {event.player.name} ({event.time.elapsed})
          </MilestoneItem>
        )
      default:
        break
    }
  }

  return (
    <Container maxW="7xl" p={{ base: 2 }}>
      <VStack textAlign="start" align="start" mb={5}>
        <Flex zIndex={5}>
          <Box>
            {eventsByTeam.home.map((event: any, index: number) =>
              renderEvent(event, index)
            )}
          </Box>
          <Box>
            {eventsByTeam.away.map((event: any, index: number) =>
              renderEvent(event, index)
            )}
          </Box>
        </Flex>
      </VStack>
    </Container>
  )
}

interface MilestoneItemProps extends BoxProps {
  icon?: any
  boxProps?: BoxProps
  last: boolean
}

const MilestoneItem: React.FC<MilestoneItemProps> = ({
  icon = FiCheckCircle,
  boxProps = {},
  children,
  last,
  ...props
}) => {
  const color = useColorModeValue('gray.700', 'gray.500')
  return (
    <Flex minH={20} {...props} color="white">
      <Flex flexDir="column" alignItems="center" mr={4} pos="relative">
        <Circle
          size={6}
          bg={useColorModeValue('gray.600', 'gray.500')}
          opacity={useColorModeValue(0.07, 0.15)}
        />
        <Box
          as={icon}
          size="1rem"
          color={color}
          pos="absolute"
          left="0.25rem"
          top="0.25rem"
        />
        {!last && <Box w="1px" flex={1} bg={color} my={1} />}
      </Flex>
      <Box {...boxProps}>{children}</Box>
    </Flex>
  )
}
