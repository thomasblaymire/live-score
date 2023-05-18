import React from 'react'
import { Box, HStack, Text } from '@chakra-ui/react'
import { MdOutlineStadium } from 'react-icons/md'

interface VenueResultProps {
  venue: VenueResult
}

export function VenueResult({ venue }: VenueResultProps) {
  return (
    <HStack
      key={venue.id}
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
        <MdOutlineStadium />
      </Box>
      <Text color="white" fontWeight="500" fontSize="0.8rem">
        {venue.name}
      </Text>
    </HStack>
  )
}
