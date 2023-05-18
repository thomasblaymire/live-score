import React from 'react'
import NextImage from 'next/image'
import { Box, HStack, Text } from '@chakra-ui/react'
import { RiFootballFill } from 'react-icons/ri'

interface TeamResultProps {
  team: TeamResult
}

export function TeamResult({ team }: TeamResultProps) {
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
    </HStack>
  )
}
