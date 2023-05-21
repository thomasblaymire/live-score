import React from 'react'
import NextImage from 'next/image'
import { Box, HStack, Text, IconButton, Spacer } from '@chakra-ui/react'
import { RiFootballFill } from 'react-icons/ri'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useFavourite } from '@/hooks/useFavourite'
import Link from 'next/link'

interface TeamResultProps {
  team: TeamResult
  userId: string | undefined
  handleUserInteraction: (action: () => void) => void
}

export function TeamResult({
  team,
  userId,
  handleUserInteraction,
}: TeamResultProps) {
  const favTypeId = team.id
  const initialIsFavoritedMap = { [`Team_${favTypeId}`]: false }

  const { isFavoritedMap, toggleFavorite } = useFavourite({
    userId,
    favItems: [{ favType: 'Team', favTypeId }],
    initialIsFavoritedMap,
  })

  const customToggleFavorite = () => {
    handleUserInteraction(() => {
      return toggleFavorite(
        'Team',
        favTypeId,
        !isFavoritedMap[`Team_${team.id}`]
      )
    })
  }

  return (
    <HStack
      key={team.id}
      mt={2}
      padding="0 0.5rem"
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
      <IconButton
        variant="unstyled"
        isRound={false}
        m={0}
        p={0}
        minW={0}
        aria-label="Add to favorites"
        icon={
          isFavoritedMap && isFavoritedMap[`Team_${team.id}`] ? (
            <AiFillHeart fill="red" />
          ) : (
            <AiOutlineHeart />
          )
        }
        onClick={customToggleFavorite}
      />
    </HStack>
  )
}
