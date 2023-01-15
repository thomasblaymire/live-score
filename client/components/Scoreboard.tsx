import { Box, LinkBox } from '@chakra-ui/layout'
import { useQuery } from 'react-query'
import { getMatches } from '../lib/api-helpers'
import NextImage from 'next/image'

export function ScoreBoard() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['matches'],
    queryFn: getMatches,
  })

  if (error) return <div>Request Failed</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <Box
      borderRadius="15px"
      background={{ md: '#161b22' }}
      width={{ md: '80%' }}
      margin="0 auto"
    >
      <Box padding={{ base: '1rem' }}>
        {data &&
          data?.matches.map((match: any) => (
            <Box
              margin={{ base: '0px' }}
              marginBottom={{ base: '1rem', md: '0' }}
              fontSize="16px"
              key={match.homeTeam.name}
              color="#a8a7a7"
              background="#0d1116"
              borderRadius="15px"
              sx={{
                '&:hover': {
                  background: '#313131',
                  cursor: 'pointer',
                },
              }}
            >
              <LinkBox
                display="flex"
                padding={{ base: '0.5rem 1rem' }}
                marginBottom="1rem"
              >
                <Box
                  display="flex"
                  alignItems="center"
                  flex=" 1 1 0%"
                  fontSize={{ base: '14px', md: 'auto' }}
                >
                  <Box
                    flex="0 0 50px"
                    flexDirection="column"
                    position="relative"
                  >
                    90
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    flex=" 1 1"
                    minWidth="0"
                  >
                    <Box display="flex" marginBottom="10px">
                      <NextImage
                        src={match.homeTeam.crest}
                        color="white"
                        alt={match.homeTeam.name}
                        width={20}
                        height={20}
                        style={{ marginRight: '15px' }}
                      />
                      {match.homeTeam.name}
                    </Box>
                    <Box display="flex">
                      <NextImage
                        src={match.awayTeam.crest}
                        color="white"
                        alt={match.awayTeam.name}
                        width={20}
                        height={20}
                        style={{ marginRight: '15px' }}
                      />
                      {match.awayTeam.name}
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    minWidth="0"
                    marginLeft="auto"
                  >
                    <Box display="flex" marginBottom="10px">
                      0
                    </Box>
                    <Box display="flex">0</Box>
                  </Box>
                </Box>
              </LinkBox>
            </Box>
          ))}
      </Box>
    </Box>
  )
}
