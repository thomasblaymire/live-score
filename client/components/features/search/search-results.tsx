// SearchResults.tsx
import React from 'react'
import { Box, VStack, Heading, HStack, Text } from '@chakra-ui/react'
import { RiFootballFill } from 'react-icons/ri'
import { BiFootball } from 'react-icons/bi'
import { IoPersonOutline } from 'react-icons/io5'
import { MdOutlineStadium } from 'react-icons/md'

interface SearchResult {
  id: number
  category: string
  name: string
  icon: React.ReactElement
}

interface SearchResultsProps {
  results?: SearchResult[]
}

export const SearchResults: React.FC<SearchResultsProps> = () => {
  const results = [
    {
      id: 1,
      category: 'Teams',
      name: 'Manchester United',
      icon: <RiFootballFill />,
    },
    {
      id: 2,
      category: 'Managers',
      name: 'Pep Guardiola',
      icon: <IoPersonOutline />,
    },
    {
      id: 3,
      category: 'Players',
      name: 'Cristiano Ronaldo',
      icon: <BiFootball />,
    },
    {
      id: 4,
      category: 'Stadiums',
      name: 'Old Trafford',
      icon: <MdOutlineStadium />,
    },
  ]

  return (
    <VStack spacing={2} align="stretch" marginY="0.5rem">
      {results.map((result) => (
        <Box
          key={result.id}
          p={2}
          borderWidth={1}
          borderRadius="lg"
          fontSize="0.9rem"
        >
          <Heading fontSize="0.9rem" fontFamily="inherit" color="gray.500">
            {result.category}
          </Heading>

          <HStack
            mt={2}
            padding="0.25rem"
            _hover={{
              background: '#1a1a1a',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            <Box
              boxSize="1.5rem"
              bg="gray.900"
              borderRadius="md"
              p={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {result.icon}
            </Box>
            <Text color="white" fontWeight="500" fontSize="0.8rem">
              {result.name}
            </Text>
          </HStack>
        </Box>
      ))}
    </VStack>
  )
}
