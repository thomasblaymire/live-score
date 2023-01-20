import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { Box, LinkBox } from '@chakra-ui/layout'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { getMatches } from '../../lib/api-helpers'

import { hypenateMatchString } from '../../lib/string'
import { ScoreBoardStatus } from './scoreboard-status'
import { ScoreBoardHeader } from './scoreboard-header'

import NextImage from 'next/image'

import { Icon } from '@chakra-ui/react'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

export function ScoreBoard() {
  const [favourites, setFavourites]: any = useState([600532, 600526])
  const router = useRouter()

  const { data, error, isLoading } = useQuery({
    queryKey: ['matches'],
    queryFn: getMatches,
    // refetchInterval: 30000,
  })

  const addToFavorite = (e: any, id: number) => {
    e.preventDefault()
    if (!favourites.includes(id)) setFavourites(favourites.concat(id))
  }

  const removeFavorite = (e: any, id: number) => {
    e.preventDefault()
    const arr = favourites
    arr.splice(favourites.indexOf(id), 1)
    setFavourites([...arr])
  }

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

              {data?.map(
                ({ i, teams, score, leagues, fixture, goals }: any) => (
                  <Link
                    href={hypenateMatchString(
                      '/football/',
                      fixture.id,
                      teams.home.name,
                      teams.away.name
                    )}
                    passHref
                    key={teams.home.name}
                  >
                    <Box
                      key={teams.home.name}
                      margin={{ base: '0px' }}
                      marginBottom={{ base: '1rem', md: '0' }}
                      fontSize="1.25rem"
                      fontWeight="600"
                      color="white"
                      borderRadius="5px"
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
                            {favourites.includes(fixture.id) ? (
                              <button
                                type="button"
                                onClick={(e) => removeFavorite(e, fixture.id)}
                              >
                                <Icon as={AiFillStar} boxSize={5} fill="teal" />
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={(e) => addToFavorite(e, fixture.id)}
                              >
                                <Icon as={AiOutlineStar} boxSize={5} />
                              </button>
                            )}
                          </Box>

                          <Box
                            flex="0 0 50px"
                            flexDirection="column"
                            position="relative"
                          >
                            {fixture.status ? (
                              <ScoreBoardStatus
                                status={fixture.status}
                                utcDate={fixture.date}
                              />
                            ) : null}
                          </Box>
                          <Box
                            display="flex"
                            flexDirection="column"
                            flex=" 1 1"
                            minWidth="0"
                          >
                            <Box display="flex" marginBottom="10px">
                              <NextImage
                                src={teams.home.logo}
                                color="white"
                                alt={teams.home.name}
                                width={25}
                                height={25}
                                style={{ marginRight: '15px' }}
                              />
                              {teams.home.name}
                            </Box>
                            <Box display="flex" alignItems="center">
                              <NextImage
                                src={teams.away.logo}
                                color="white"
                                alt={teams.away.name}
                                width={25}
                                height={25}
                                style={{ marginRight: '15px' }}
                              />
                              {teams.away.name}
                            </Box>
                          </Box>
                          <Box
                            display="flex"
                            flexDirection="column"
                            minWidth="0"
                            marginLeft="auto"
                          >
                            <Box display="flex" marginBottom="10px">
                              {goals.home}
                            </Box>
                            <Box display="flex">{goals.away}</Box>
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
