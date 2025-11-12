import React from 'react'
import NextImage from 'next/image'
import { Box, HStack, Text } from '@chakra-ui/react'
import { RiFootballFill } from 'react-icons/ri'

interface PlayerResultProps {
  player: PlayerResult
  userId: string | undefined
  handleFavourite: (action: () => void) => void
}

export function PlayerResult({ player, userId }: PlayerResultProps) {
  return (
    <HStack
      key={player.id}
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
        p={0.5}
        borderRadius="35px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        {player.photo ? (
          <Box borderRadius="50%">
            <NextImage
              src={player.photo}
              alt={player.name}
              width={40}
              height={40}
            />
          </Box>
        ) : (
          <RiFootballFill />
        )}
      </Box>
      <Text color="white" fontWeight="500" fontSize="0.8rem">
        {player.name}
      </Text>
    </HStack>
  )
}
