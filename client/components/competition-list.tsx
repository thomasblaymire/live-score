import NextImage from 'next/image'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Search } from './search'
import { Box, List, ListItem, Divider } from '@chakra-ui/layout'
import { Stack, Skeleton } from '@chakra-ui/react'
import { getCompetitions } from '../lib/competitions'

export function CompetitionList({ competitions }: any) {
  const [searchField, setSearchField] = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['competitions'],
    queryFn: getCompetitions,
    initialData: competitions,
  })

  const handleSearch = (e: any) => {
    setSearchField(e.target.value)
  }

  return (
    <Box>
      <Search handleSearch={handleSearch} />
      <Divider color="gray.800" />
      <List paddingY="0.75rem">
        {isLoading && (
          <Stack>
            <Skeleton height="25px" />
            <Skeleton height="25px" />
            <Skeleton height="25px" />
          </Stack>
        )}
        {data
          .filter(
            (competition: any) =>
              competition.name.includes(searchField) || searchField === ''
          )
          .map((competition: any) => (
            <ListItem
              key={competition.name}
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
          ))}
      </List>
    </Box>
  )
}
