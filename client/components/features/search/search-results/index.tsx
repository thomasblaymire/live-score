import React from 'react'
import { VStack } from '@chakra-ui/react'
import { Category } from './search-result.category.tsx'
import { TeamResult } from './search-result-team'
import { VenueResult } from './search-result-venue'
import { PlayerResult } from './search-result-player'

interface SearchResultsProps {
  results: {
    teams: TeamResult[]
    venues: VenueResult[]
    players: PlayerResult[]
  }
}

export function SearchResults({ results }: SearchResultsProps) {
  const { teams, venues, players } = results

  return (
    <VStack spacing={2} align="stretch" marginY="0.5rem" paddingX="0.5rem">
      <Category title="Teams">
        {teams.map((team) => (
          <TeamResult key={team.id} team={team} />
        ))}
      </Category>

      <Category title="Venues">
        {venues.map((venue) => (
          <VenueResult key={venue.id} venue={venue} />
        ))}
      </Category>

      <Category title="Players">
        {players.map((player) => (
          <PlayerResult key={player.id} player={player} />
        ))}
      </Category>
    </VStack>
  )
}
