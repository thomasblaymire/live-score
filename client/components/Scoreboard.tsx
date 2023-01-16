import { Box, LinkBox } from '@chakra-ui/layout'
import { useQuery } from 'react-query'
import { getMatches } from '../lib/api-helpers'
import NextImage from 'next/image'

export function ScoreBoard() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['matches'],
    queryFn: getMatches,
    refetchInterval: 30000,
  })

  if (error) return <div>Request Failed</div>
  if (isLoading) return <div>Loading...</div>

  const parse = (time: string) => {
    const [hours, minutes, seconds] = time
      .split(':')
      .map((unit) => parseFloat(unit))
    return hours * 3600 + minutes * 60 + seconds
  }

  const renderStatus = (status: any, utcDate: string) => {
    console.log('debug status', status)
    switch (status) {
      case 'IN_PLAY':
        return (
          <Box
            background="green"
            borderRadius="50%"
            width="10px"
            height="10px"
          />
        )
      case 'FINISHED':
        return <span>FT</span>
      case 'TIMED':
        return <span>{parse(utcDate)}</span>
      default:
        return <span></span>
    }
  }

  return (
    <Box
      borderRadius="15px"
      background={{ md: '#161b22' }}
      width={{ md: '80%' }}
      margin="0 auto"
    >
      <Box padding={{ base: '1rem' }}>
        {data &&
          data.matches?.map(
            ({ homeTeam, awayTeam, score, status, utcDate }: any) => (
              <Box
                margin={{ base: '0px' }}
                marginBottom={{ base: '1rem', md: '0' }}
                fontSize="16px"
                key={homeTeam.name}
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
                      {renderStatus(status, utcDate)}
                    </Box>
                    <Box
                      display="flex"
                      flexDirection="column"
                      flex=" 1 1"
                      minWidth="0"
                    >
                      <Box display="flex" marginBottom="10px">
                        <NextImage
                          src={homeTeam.crest}
                          color="white"
                          alt={homeTeam.name}
                          width={20}
                          height={20}
                          style={{ marginRight: '15px' }}
                        />
                        {homeTeam.name}
                      </Box>
                      <Box display="flex">
                        <NextImage
                          src={awayTeam.crest}
                          color="white"
                          alt={awayTeam.name}
                          width={20}
                          height={20}
                          style={{ marginRight: '15px' }}
                        />
                        {awayTeam.name}
                      </Box>
                    </Box>
                    <Box
                      display="flex"
                      flexDirection="column"
                      minWidth="0"
                      marginLeft="auto"
                    >
                      <Box display="flex" marginBottom="10px">
                        {score.fullTime.home}
                      </Box>
                      <Box display="flex">{score.fullTime.away}</Box>
                    </Box>
                  </Box>
                </LinkBox>
              </Box>
            )
          )}
      </Box>
    </Box>
  )
}
