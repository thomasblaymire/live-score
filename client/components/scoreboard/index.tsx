import { useQuery } from 'react-query'
import { Box, LinkBox, Center } from '@chakra-ui/layout'
import { SkeletonLoading } from '../skeleton'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { getMatches } from '../../lib/api-helpers'
import { ErrorState } from '../error'
import { Loading } from '../loading'
import { tabs } from './data'
import { useSession } from 'next-auth/react'
import { ScoreBoardLive } from './scoreboard-live'
import { ScoreBoardUpcoming } from './scoreboard-upcoming'

export function ScoreBoard() {
  const { data: session } = useSession()

  const { data, isLoading, error } = useQuery({
    queryKey: ['fixtures'],
    queryFn: () => getMatches(),
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
        <TabList>
          {tabs.map((tab) => (
            <Tab
              key={tab.title}
              fontWeight="600"
              _selected={{ color: 'white', bg: '#029143' }}
              fontSize="0.9rem"
            >
              {tab.title}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box>
              <SkeletonLoading
                loading={isLoading}
                ammount={12}
                height="70px"
                borderRadius="5px"
              />

              {error && <ErrorState />}
              <ScoreBoardLive liveScores={data?.liveScores} />
            </Box>
          </TabPanel>
          <TabPanel>
            <ScoreBoardUpcoming
              upcomingMatches={data?.fixturesByDateData}
              session={session}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}
