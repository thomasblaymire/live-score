import {
  Flex,
  Box,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  Text,
  chakra,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Card } from '../../../components/card'
import { Player } from '../../../components/player'
import { LiveChat } from '../../../components/chat/live-chat'
import { Stats } from '../../../components/stats'
import { ScoreCard } from '../../../components/scorecard'
import { Timeline } from '../../../components/timeline'
import { Players } from '../../../components/players/players'
import { Formations } from '../../../components/formations'
import { Loading } from '../../../components/loading'
import { useMatch } from '../../../hooks/useMatch'

export default function Match() {
  const router = useRouter()
  const { id } = router.query
  const { data, isLoading, error } = useMatch(id)
  const youtubeID = 'lA5uJuQA7DQ'

  const isMobile = useBreakpointValue({ base: true, md: false })

  console.log('debug id', id)

  if (isLoading || !data) {
    return <Loading loading={isLoading} />
  }

  interface Tab {
    title: string
  }

  const tabs: Tab[] = [
    {
      title: 'INFO',
    },
    {
      title: 'LINEUPS',
    },
    {
      title: 'EVENTS',
    },
    {
      title: 'STATS',
    },
    {
      title: 'HIGHLIGTS',
    },
  ]

  const HorizontalScroll = chakra('div', {
    baseStyle: {
      display: 'flex',
      overflowX: 'scroll',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      WebkitOverflowScrolling: 'touch',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  })

  return (
    <Box margin={{ base: '1rem', md: '3rem' }} minHeight="100vh">
      <Box marginBottom={{ base: '1.5rem', md: '2.5rem' }}>
        {data ? <ScoreCard data={data} /> : null}
      </Box>

      {isMobile && (
        <Tabs
          isFitted
          variant="soft-rounded"
          height={{ base: 'auto', xs: '100vh', md: 'initial' }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <HorizontalScroll>
              <TabList marginBottom="1.5rem">
                {tabs.map((tab, index: number) => (
                  <Tab
                    key={tab.title}
                    fontWeight="600"
                    _selected={{ color: 'white', bg: '#3772ff' }}
                    fontSize="0.8rem"
                    borderRadius="10px"
                  >
                    {tab.title}
                  </Tab>
                ))}
              </TabList>
            </HorizontalScroll>
            <Box
              position="relative"
              display="flex"
              alignItems="center"
              justifyContent="end"
            ></Box>
          </Box>
          <TabPanels>
            <TabPanel padding="0 1rem 1rem 1rem">
              <Box>INFO</Box>
            </TabPanel>
            <TabPanel padding="0">
              <Players
                homeTeam={data.lineups[0].team}
                awayTeam={data.lineups[1].team}
                homePlayers={data.lineups[0].startXI}
                awayPlayers={data.lineups[1].startXI}
              />
            </TabPanel>
            <TabPanel padding="0">
              <Timeline
                matchEvents={data.events}
                awayTeamId={data.teams.away.id}
                homeTeamId={data.teams.home.id}
              />
            </TabPanel>
            <TabPanel padding="0">
              <Stats />
            </TabPanel>
            <TabPanel padding="0">
              <Player embedId={`${youtubeID}`} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}

      {!isMobile && (
        <Flex justifyContent="center" gap="1.5rem" flexWrap="wrap">
          <Box flex={1}>
            <Box marginBottom="2.5rem">
              {data?.lineups && (
                <Players
                  heading="Lineups"
                  homeTeam={data.lineups[0].team}
                  awayTeam={data.lineups[1].team}
                  homePlayers={data.lineups[0].startXI}
                  awayPlayers={data.lineups[1].startXI}
                />
              )}
            </Box>
            <Box marginBottom="2.5rem">
              {data?.lineups ? (
                <Players
                  heading="Substitutes"
                  homeTeam={data.lineups[0].team}
                  awayTeam={data.lineups[1].team}
                  homePlayers={data.lineups[0].substitutes}
                  awayPlayers={data.lineups[1].substitutes}
                />
              ) : null}
            </Box>
            <Box marginBottom="2.5rem">
              {data ? (
                <Card
                  heading="Events"
                  headingAlign="center"
                  background="#121212"
                  radius="15px"
                >
                  {data.events ? (
                    <Timeline
                      matchEvents={data.events}
                      awayTeamId={data.teams.away.id}
                      homeTeamId={data.teams.home.id}
                    />
                  ) : null}
                </Card>
              ) : null}
            </Box>
            <Box marginBottom="2.5rem">
              <Card
                heading="Stats"
                headingAlign="center"
                background="#121212"
                radius="15px"
              >
                DATA
              </Card>
            </Box>
          </Box>

          <Box flex={1}>
            {/* <Box marginBottom="2.5rem">
            <Card
              heading="Formations"
              headingAlign="center"
              background="#121212"
              radius="15px"
            >
              <Formations formation={[4, 4, 2]} />
            </Card>
          </Box>  */}
            <Box marginBottom="2.5rem">
              <Card
                heading="Stats"
                headingAlign="center"
                background="#121212"
                radius="15px"
              >
                <Stats />
              </Card>
            </Box>
            <Box marginBottom="2.5rem">
              <Card
                heading="Highlights"
                headingAlign="center"
                background="#121212"
                radius="15px"
              >
                {/* <Player embedId={`${youtubeID}`} /> */}
              </Card>
            </Box>
          </Box>
        </Flex>
      )}
    </Box>
  )
}

{
  /* <Player embedId={`${youtubeID}`} /> */
}

{
  /* <Box>
          <LiveChat />
        </Box> */
}
