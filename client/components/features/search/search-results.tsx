import React from 'react'
import NextImage from 'next/image'
import { Box, Divider, VStack, Heading, HStack, Text } from '@chakra-ui/react'
import { RiFootballFill } from 'react-icons/ri'
import { BiFootball } from 'react-icons/bi'
import { IoPersonOutline } from 'react-icons/io5'
import { MdOutlineStadium } from 'react-icons/md'

//   const results = [
//     {
//       id: 1,
//       category: 'Teams',
//       name: 'Manchester United',
//       icon: <RiFootballFill />,
//     },
//     {
//       id: 2,
//       category: 'Managers',
//       name: 'Pep Guardiola',
//       icon: <IoPersonOutline />,
//     },
//     {
//       id: 3,
//       category: 'Players',
//       name: 'Cristiano Ronaldo',
//       icon: <BiFootball />,
//     },
//     {
//       id: 4,
//       category: 'Stadiums',
//       name: 'Old Trafford',
//       icon: <MdOutlineStadium />,
//     },
//   ]

interface SearchResult {
  id: number
  category: string
  name: string
  icon: React.ReactElement
}

interface SearchResultsProps {
  results: {
    teams: any[]
    venues: any[]
    players: any[]
  }
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const { teams, venues, players } = results

  const renderResults = (
    category: string,
    items: any[],
    defaultIcon: React.ReactElement,
    renderIcon?: (item: any) => React.ReactElement
  ) => {
    if (items.length === 0) return null

    return (
      <>
        <Divider py="0.25rem" color="#353945" />
        <Box
          key={category}
          p={2}
          borderWidth={1}
          borderRadius="lg"
          fontSize="0.9rem"
        >
          <Heading fontSize="0.9rem" fontFamily="inherit" color="gray.500">
            {category}
          </Heading>

          {items.map((item) => (
            <HStack
              key={item.id}
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
                {renderIcon ? renderIcon(item) : defaultIcon}
              </Box>
              <Text color="white" fontWeight="500" fontSize="0.8rem">
                {item.name}
              </Text>
            </HStack>
          ))}
        </Box>
      </>
    )
  }

  return (
    <VStack spacing={2} align="stretch" marginY="0.5rem">
      {renderResults('Teams', teams, <RiFootballFill />, (team) => {
        if (team.logo) {
          return (
            <NextImage src={team.logo} alt={team.name} width={40} height={40} />
          )
        }
        return <BiFootball />
      })}
      {renderResults('Venues', venues, <MdOutlineStadium />)}
      {renderResults('Players', players, <BiFootball />, (player) => {
        if (player.photo) {
          return (
            <NextImage
              src={player.photo}
              alt={player.name}
              width={40}
              height={40}
              style={{ borderRadius: '50%' }}
            />
          )
        }
        return <BiFootball />
      })}
    </VStack>
  )
}
