import { useState } from 'react'
import { Global } from '@emotion/react'
import { SkeletonLoading } from '../skeleton'
import {
  Button,
  IconButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  HStack,
  Box,
  Text,
} from '@chakra-ui/react'
import { useHomepageFixtures } from '../../hooks/useHomeFixtures'
import { useFixtures } from '../../hooks/useFixtures'
import { ErrorState } from '../error'
import { tabs } from './data'
import { ScoreBoardLive } from './scoreboard-live'
import { DatePicker } from '../datepicker'

interface FixtureDateRange {
  startDate: string
  endDate: string
}

export function ScoreBoard() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [showDatePicker, setShowDatePicker] = useState(false)

  const [dateRange, setDateRange] = useState<FixtureDateRange>({
    startDate: '2023-04-08',
    endDate: '2023-04-08',
  })

  const { data: fixtures, isLoading, error } = useFixtures(dateRange)

  const handleDateChange = async (date: Date | null) => {
    setSelectedDate(date)
    if (date) {
      const formattedDate = formatDate(date)
      setDateRange({ startDate: formattedDate, endDate: formattedDate })
      setShowDatePicker(false)
    }
  }

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  return (
    <Box
      borderRadius="15px"
      background={{ md: '#121212' }}
      minHeight="60vh"
      margin="0 auto"
    >
      <Tabs isFitted variant="soft-rounded" colorScheme="red">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <TabList padding="1rem">
            {tabs.map((tab) => (
              <Tab
                key={tab.title}
                fontWeight="600"
                _selected={{ color: 'white', bg: '#1238de' }}
                fontSize="0.8rem"
                padding="0.5rem 1rem"
                borderRadius="10px"
              >
                {tab.title}
              </Tab>
            ))}
          </TabList>
          <Box
            position="relative"
            padding="1rem"
            display="flex"
            alignItems="center"
            justifyContent="end"
          >
            {selectedDate && (
              <Text fontSize="0.8rem" textTransform="uppercase">
                {selectedDate.toDateString()}
              </Text>
            )}
            <DatePicker
              selectedDate={selectedDate}
              handleDateChange={handleDateChange}
              showDatePicker={showDatePicker}
              setShowDatePicker={setShowDatePicker}
            />
          </Box>
        </Box>
        <TabPanels>
          <TabPanel padding="0 1rem 1rem 1rem">
            <Box>
              <SkeletonLoading
                loading={isLoading}
                ammount={12}
                height="70px"
                borderRadius="5px"
              />

              {error && <ErrorState />}
              {fixtures ? <ScoreBoardLive liveScores={fixtures} /> : null}
            </Box>
          </TabPanel>
          <TabPanel>
            <VStack spacing={4}>
              <HStack spacing={4}>
                {/* {data?.fixturesByDate.map((date: string, i: number) => (
                  <Button
                    key={i}
                    onClick={() => handleDateChange(new Date(date))}
                  >
                    {date}
                  </Button>
                ))} */}
              </HStack>
              {/* Render your fixtures for the selected date here */}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}
