import NextImage from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Search } from './search'
import { Box, List, ListItem, Divider, Heading } from '@chakra-ui/layout'
import { Stack, Skeleton } from '@chakra-ui/react'
import { getCompetitions } from '../lib/api-helpers'
import { Competition } from '../types/index'
import { ErrorState } from './error'

interface CompetitionListProps {
  competitions: Competition[]
}

export function CompetitionList({ competitions }: CompetitionListProps) {
  const [searchField, setSearchField] = useState('')

  const { data, isLoading, isError } = useQuery({
    queryKey: ['competitions'],
    queryFn: getCompetitions,
    initialData: competitions,
  })

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearchField(value.toLowerCase())
  }

  const filteredCompetitions = data.filter(
    (competition: any) =>
      competition.name.toLowerCase().includes(searchField) || searchField === ''
  )

  return (
    <Box>
      {/* <Search handleSearch={handleSearch} /> */}
      <Box
        padding="1rem 1.5rem"
        background="#1F1F1F"
        borderTopLeftRadius="15px"
        borderTopRightRadius="15px"
      >
        <Heading color="#FFF" fontSize="1.1rem">
          Popular Leagues
        </Heading>
      </Box>
      <Divider color="gray.800" />
      <List
        background="#121212"
        borderBottomLeftRadius="15px"
        borderBottomRightRadius="15px"
        sx={{
          'ul:last-child li': {
            borderBottomLeftRadius: '15px',
            borderBottomRightRadius: '15px',
          },
        }}
      >
        {isLoading && data && (
          <Stack spacing={5} padding="1rem">
            {new Array(12).fill(1).map((i: number) => (
              <Skeleton
                key={i}
                height="35px"
                startColor="gray.100"
                endColor="gray.700"
              />
            ))}
          </Stack>
        )}

        {isError && <ErrorState />}

        {filteredCompetitions.map((competition: any) => (
          <Link
            key={competition.name}
            passHref
            href={{
              pathname: '/league',
              query: { code: competition.code },
            }}
          >
            <ListItem
              display="flex"
              alignItems="center"
              paddingY="1rem"
              paddingX="1rem"
              color="#FFF"
              fontWeight="700"
              borderBottom="solid 0.5px"
              borderColor="gray.900"
              sx={{
                '&:hover': {
                  bg: '#1a1a1a',
                  cursor: 'pointer',
                },
              }}
            >
              <Box marginX="10px">
                <NextImage
                  src={competition.emblem}
                  width={30}
                  height={30}
                  alt={competition.name}
                />
              </Box>
              {competition.name}
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  )
}
