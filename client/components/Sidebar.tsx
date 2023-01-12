import { useQuery } from 'react-query'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { Box, List, ListItem, Text, Divider } from '@chakra-ui/layout'
import { Stack, Skeleton } from '@chakra-ui/react'

const Sidebar = () => {
  const getCompetitions = async () => {
    const response = await fetch('http://localhost:3030/api/competitions')
    return response.json()
  }

  const { data, error, isLoading } = useQuery('competitions', getCompetitions)

  if (error) return <div>Request Failed</div>

  return (
    <Box width="100%" color="gray" background="#111111" borderRadius="15px">
      <Box>
        <Text padding="0.5rem">Leagues</Text>
        <Divider color="gray.500" />
        <List paddingY="0.75rem">
          {isLoading && (
            <Stack>
              <Skeleton height="25px" />
              <Skeleton height="25px" />
              <Skeleton height="25px" />
            </Stack>
          )}
          {data &&
            data.map((competition: any) => (
              <ListItem
                key={competition.name}
                display="flex"
                alignItems="center"
                paddingY="0.5rem"
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
    </Box>
  )
}

export default Sidebar
