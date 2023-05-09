import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  chakra,
} from '@chakra-ui/react'
import { Stats } from '../../stats'
import { Timeline } from '../../timeline'
import { MatchPlayers } from '../match-players'
import { MatchVideo } from '../match-video'
import { matchTabs } from './match-tabs'

interface MatchTabsProps {
  events: Event[]
  lineups: Lineup[]
  teams: SingleMatchTeams
}

export function MatchTabs({ events, lineups, teams }: MatchTabsProps) {
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
    <Tabs
      isFitted
      variant="soft-rounded"
      height={{ base: 'auto', xs: '100vh', md: 'initial' }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <HorizontalScroll>
          <TabList marginBottom="1rem">
            {matchTabs.map((tab) => (
              <Tab
                key={tab.title}
                fontWeight="600"
                _selected={{ color: 'white', bg: '#3772ff', padding: '0.5rem' }}
                fontSize="0.8rem"
                borderRadius="10px"
              >
                {tab.title}
              </Tab>
            ))}
          </TabList>
        </HorizontalScroll>
      </Box>
      <TabPanels>
        <TabPanel padding="0">
          <Box padding="0">
            <Timeline
              matchEvents={events}
              awayTeamId={teams.away.id}
              homeTeamId={teams.home.id}
            />
          </Box>
        </TabPanel>
        <TabPanel padding="0">INFO</TabPanel>
        <TabPanel padding="0">
          <MatchPlayers
            homeTeam={lineups[0].team}
            awayTeam={lineups[1].team}
            homePlayers={lineups[0].startXI}
            awayPlayers={lineups[1].startXI}
          />
        </TabPanel>
        <TabPanel padding="0">
          <Stats />
        </TabPanel>
        <TabPanel padding="0">
          <MatchVideo embedId={`${process.env.YOUTUBE_ID}`} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
