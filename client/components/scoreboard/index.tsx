import { Box, LinkBox } from '@chakra-ui/layout'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { getMatches } from '../../lib/api-helpers'

import { hypenateMatchString } from '../../lib/string'
import { ScoreBoardStatus } from './scoreboard-status'
import { ScoreBoardHeader } from './scoreboard-header'
import NextImage from 'next/image'
import Link from 'next/link'

export function ScoreBoard() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['matches'],
    queryFn: getMatches,
    refetchInterval: 30000,
  })

  return (
    <Box
      borderRadius="15px"
      background={{ md: '#121212' }}
      minHeight="60vh"
      margin="0 auto"
    >
      <Tabs isFitted variant="enclosed" colorScheme="red">
        <TabList mb="1em">
          <Tab _selected={{ color: 'white', bg: 'blue.500' }}>All Games</Tab>
          <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Live Matches</Tab>
          <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Odds</Tab>
          <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Finished</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box>
              {isLoading && <div>Loading...</div>}
              {error && <div>Error...</div>}

              {data?.matches?.map(
                ({ homeTeam, awayTeam, score, status, utcDate, id }: any) => (
                  <Link
                    href={hypenateMatchString(
                      '/football/',
                      id,
                      homeTeam.shortName,
                      awayTeam.shortName
                    )}
                    passHref
                    key={homeTeam.name}
                  >
                    <Box
                      margin={{ base: '0px' }}
                      marginBottom={{ base: '1rem', md: '0' }}
                      fontSize="16px"
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
                            <ScoreBoardStatus
                              status={status}
                              utcDate={utcDate}
                            />
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
                  </Link>
                )
              )}
            </Box>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
          <TabPanel>
            <p>four!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
      {/* <ScoreBoardHeader /> */}
    </Box>
  )
}
