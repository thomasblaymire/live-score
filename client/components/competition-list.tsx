import NextImage from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Search } from './search'
import { Box, List, ListItem, Divider } from '@chakra-ui/layout'
import { Stack, Skeleton } from '@chakra-ui/react'
import { getCompetitions } from '../lib/api-helpers'

export function CompetitionList({ competitions }: any) {
  const [searchField, setSearchField] = useState('')

  const { data, isLoading, error } = useQuery({
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
      <Search handleSearch={handleSearch} />
      <Divider color="gray.800" />
      <List
        sx={{
          'ul:last-child li': {
            borderBottomLeftRadius: '15px',
            borderBottomRightRadius: '15px',
          },
        }}
      >
        {isLoading && (
          <Stack>
            <Skeleton height="25px" />
            <Skeleton height="25px" />
            <Skeleton height="25px" />
          </Stack>
        )}
        {filteredCompetitions.map((competition: any) => (
          <Link
            key={competition.name}
            passHref
            href={{
              pathname: '/league',
              query: competition.code,
            }}
          >
            <ListItem
              display="flex"
              alignItems="center"
              paddingY="0.5rem"
              color="#a8a7a7"
              sx={{
                '&:hover': {
                  bg: 'gray.200',
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
