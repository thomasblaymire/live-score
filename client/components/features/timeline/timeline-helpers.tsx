import { Flex, Box } from '@chakra-ui/react'
import { RiFootballLine } from 'react-icons/ri'
import { BiTransfer } from 'react-icons/bi'
import { TbCards } from 'react-icons/tb'
import { FiCheckCircle } from 'react-icons/fi'

const getEventDescription = (event: Event) => {
  switch (event.type) {
    case 'Goal':
      return `${event.player.name}`
    case 'subst':
      return (
        <Flex>
          <Box>{event.assist.name} -</Box>
          <Box>{event.player.name}</Box>
        </Flex>
      )
    case 'Card':
      return `${event.player.name}`
    default:
      return null
  }
}

const isHomeTeamEvent = (event: Event, homeTeamId: number) =>
  event.team.id === homeTeamId

const groupEventsByTeam = (
  matchEvents: Event[],
  homeTeamId: number,
  awayTeamId: number
) =>
  matchEvents.reduce(
    (acc: any, event: Event) => {
      if (isHomeTeamEvent(event, homeTeamId)) {
        acc.home.push(event)
      } else if (event.team.id === awayTeamId) {
        acc.away.push(event)
      }
      return acc
    },
    { home: [], away: [] }
  )

const getIcon = (eventType: string) => {
  switch (eventType) {
    case 'Goal':
      return RiFootballLine
    case 'subst':
      return BiTransfer
    case 'Card':
      return TbCards
    default:
      return FiCheckCircle
  }
}

export { getIcon, groupEventsByTeam, isHomeTeamEvent, getEventDescription }
