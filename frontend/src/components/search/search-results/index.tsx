import React from 'react'
import { ModalName } from '@/lib/constants'
import { VStack } from '@chakra-ui/react'
import { Category } from './search-result.category.tsx'
import { TeamResult } from './search-result-team'
import { VenueResult } from './search-result-venue'
import { PlayerResult } from './search-result-player'
import { useAuthContext } from '@/context/auth-context'
import { useModalContext } from '@/context/modal-context'

interface SearchResultsProps {
  results: {
    teams: TeamResult[]
    venues: VenueResult[]
    players: PlayerResult[]
  }
}

export function SearchResults({ results }: SearchResultsProps) {
  const { user } = useAuthContext()
  const { toggleModal } = useModalContext()
  const { teams, venues, players } = results

  const handleFavourite = (action: () => void) => {
    if (!user) {
      toggleModal(ModalName.SignIn)
      return
    }
    action()
  }

  return (
    <VStack spacing={2} align="stretch" marginY="0" paddingX="0.5rem">
      <Category title="Teams">
        {teams.map((team) => (
          <TeamResult
            key={team.id}
            team={team}
            userId={user?.id}
            handleFavourite={handleFavourite}
          />
        ))}
      </Category>

      <Category title="Venues">
        {venues.map((venue) => (
          <VenueResult
            key={venue.id}
            venue={venue}
            userId={user?.id}
            handleFavourite={handleFavourite}
          />
        ))}
      </Category>

      <Category title="Players">
        {players.map((player) => (
          <PlayerResult
            key={player.id}
            player={player}
            userId={user?.id}
            handleFavourite={handleFavourite}
          />
        ))}
      </Category>
    </VStack>
  )
}
