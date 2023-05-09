import {
  Container,
  VStack,
  Flex,
  Box,
  useBreakpointValue,
} from '@chakra-ui/react'
import { TimeLineItem } from './timeline-item'
import {
  groupEventsByTeam,
  getIcon,
  getEventDescription,
  isHomeTeamEvent,
} from './timeline-helpers'

interface TimeLineProps {
  matchEvents: Event[]
  homeTeamId: number
  awayTeamId: number
}

export const Timeline = ({
  matchEvents,
  homeTeamId,
  awayTeamId,
}: TimeLineProps) => {
  const eventsByTeam = groupEventsByTeam(matchEvents, homeTeamId, awayTeamId)
  const maxEvents = Math.max(eventsByTeam.home.length, eventsByTeam.away.length)
  const borderStyle = useBreakpointValue({
    base: 'solid 1px #353945',
    md: 'none',
  })

  const renderEvent = (event: Event, index: number, isHomeTeam: boolean) => {
    const isFirst = index === 0
    const isLast = index === maxEvents - 1
    return (
      <TimeLineItem
        icon={getIcon(event.type)}
        first={isFirst}
        last={isLast}
        key={index}
        isHomeTeam={isHomeTeam}
      >
        {getEventDescription(event)}
      </TimeLineItem>
    )
  }

  return (
    <Container maxW="7xl" p={{ base: 2 }} padding="0">
      <VStack textAlign="start" align="start" marginBottom="0">
        <Flex
          zIndex={5}
          direction="column"
          w="100%"
          border={borderStyle}
          borderRadius="15px"
        >
          {matchEvents
            .filter((event: Event) => event.type !== 'subst')
            .map((event: any, index: number) => (
              <Box
                key={index}
                w="100%"
                sx={{
                  '&:not(:last-child)': {
                    borderBottom: '1px solid #353945',
                  },
                  '&:last-child': {
                    borderBottom: 'none',
                  },
                }}
              >
                <Flex align="center" padding="1rem 1rem">
                  <Box textAlign="right" marginRight="1rem" fontSize="0.8rem">
                    {event.time.elapsed}
                  </Box>
                  <Box flex="5">
                    {isHomeTeamEvent(event, homeTeamId)
                      ? renderEvent(event, index, true)
                      : null}
                  </Box>
                  <Box flex="5">
                    {!isHomeTeamEvent(event, homeTeamId)
                      ? renderEvent(event, index, false)
                      : null}
                  </Box>
                </Flex>
              </Box>
            ))}
        </Flex>
      </VStack>
    </Container>
  )
}
