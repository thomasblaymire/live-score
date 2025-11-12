import Link from 'next/link'
import NextImage from 'next/image'
import { Box, HStack, Text, Spacer } from '@chakra-ui/react'
import { RiFootballFill } from 'react-icons/ri'
import { FavoriteButton } from '@/components/ui/favourite'
import { useFavourite } from '@/hooks/useFavourite'
import { FavouriteType } from '@/lib/constants'

interface TeamResultProps {
  team: TeamResult
  userId: string | undefined
  handleFavourite: (action: () => void) => void
}

export function TeamResult({ team, userId, handleFavourite }: TeamResultProps) {
  const initialIsFavoritedMap = {
    [`${FavouriteType.Team}_${team.id}`]: false,
  }

  const { isFavoritedMap, toggleFavorite } = useFavourite({
    userId,
    favItems: [{ favType: FavouriteType.Team, favTypeId: team.id }],
    initialIsFavoritedMap,
  })

  const customToggleFavorite = () =>
    handleFavourite(() =>
      toggleFavorite(
        FavouriteType.Team,
        team.id,
        !isFavoritedMap[`${FavouriteType.Team}_${team.id}`]
      )
    )

  return (
    <HStack
      key={team.id}
      mt={2}
      padding="0 0.25rem"
      _hover={{
        background: '#1a1a1a',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      <Link
        href={`/team/${team.name}/${team.id}`}
        passHref
        style={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}
      >
        <Box
          boxSize="1.8rem"
          borderRadius="md"
          p={0.5}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {team.logo ? (
            <NextImage src={team.logo} alt={team.name} width={40} height={40} />
          ) : (
            <RiFootballFill />
          )}
        </Box>
        <Text
          color="white"
          fontWeight="500"
          fontSize="0.8rem"
          marginLeft="0.5rem"
        >
          {team.name}
        </Text>
      </Link>
      <Spacer />
      <FavoriteButton
        isFavorited={isFavoritedMap[`${FavouriteType.Team}_${team.id}`]}
        onClick={customToggleFavorite}
      />
    </HStack>
  )
}
