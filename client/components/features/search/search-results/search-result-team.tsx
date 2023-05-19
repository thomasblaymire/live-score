import React, { useState } from 'react'
import NextImage from 'next/image'
import { Box, HStack, Text, IconButton } from '@chakra-ui/react'
import { RiFootballFill } from 'react-icons/ri'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useFavourite } from '@/hooks/useFavourite'

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
  const initialIsFavorited = false
  const favType = 'Team'

  const { isFavorited, toggleFavorite } = useFavourite({
    userId,
    favType,
    favTypeId,
    initialIsFavorited,
  })

  const customToggleFavorite = () => {
    handleUserInteraction(toggleFavorite)
  }

  return (
    <HStack
      key={team.id}
      mt={2}
      padding="0.25rem"
      _hover={{
        background: '#1a1a1a',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
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
      <Text color="white" fontWeight="500" fontSize="0.8rem">
        {team.name}
      </Text>
      <IconButton
        variant="unstyled"
        aria-label="Add to favorites"
        icon={isFavorited ? <AiFillHeart fill="red" /> : <AiOutlineHeart />}
        onClick={customToggleFavorite}
      />
    </HStack>
  )
}
