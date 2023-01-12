import {
  Box,
  List,
  ListItem,
  LinkBox,
  LinkOverlay,
  ListIcon,
  Text,
} from '@chakra-ui/layout'
import NextLink from 'next/link'
import { useQuery } from 'react-query'
import NextImage from 'next/image'

export function ScoreBoard() {
  const getMatches = async () => {
    const response = await fetch('http://localhost:3030/api/matches')
    return response.json()
  }

  const { data, error, isLoading } = useQuery('matches', getMatches)

  console.log('matches', data)

  if (error) return <div>Request Failed</div>

  return (
    <Box borderRadius="15px" background="#111111" width="80%" margin="0 auto">
      <Box padding="10px">
        {data &&
          data.matches.map((match: any) => (
            <Box
              margin="20px"
              fontSize="16px"
              key={match.homeTeam.name}
              color="#a8a7a7"
              background="#181818"
              borderRadius="15px"
              sx={{
                '&:hover': {
                  background: '#313131',
                  cursor: 'pointer',
                },
              }}
            >
              <LinkBox display="flex" padding="10px">
                <Box display="flex" alignItems="center" flex=" 1 1 0%">
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
                        width={25}
                        height={25}
                      />
                      {match.homeTeam.name}
                    </Box>
                    <Box display="flex">
                      <NextImage
                        src={match.awayTeam.crest}
                        color="white"
                        alt={match.awayTeam.name}
                        width={25}
                        height={25}
                      />
                      {match.awayTeam.name}
                    </Box>
                  </Box>
                  <Box>00</Box>
                </Box>
              </LinkBox>
            </Box>
          ))}
      </Box>
    </Box>
  )
}
