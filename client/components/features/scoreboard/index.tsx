import { useState } from 'react'
import { SkeletonLoading } from '../../ui/skeleton'
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useFixtures } from '@/hooks/useFixtures'
import { ErrorState } from '@/components/ui/error'
import { formatDate } from '@/lib/time'
import { tabs } from './data'
import { ScoreBoardList } from './scoreboard-list'
import { ScoreboardDatePicker } from './scoreboard-datepicker'

interface FixtureDateRange {
  startDate: string
  endDate: string
}

interface ScoreBoardProps {
  initialFixtures: CustomFixture[]
}

export function ScoreBoard({ initialFixtures }: ScoreBoardProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const isNotMobile = useBreakpointValue({ base: false, md: true })

  const [dateRange, setDateRange] = useState<FixtureDateRange>({
    startDate: '2023-04-09',
    endDate: '2023-04-09',
  })

  const {
    data: fixtures,
    isFetching,
    error,
  } = useFixtures(dateRange, initialFixtures)

  const handleDateChange = async (date: Date | null) => {
    setSelectedDate(date)
    if (date) {
      const formattedDate = formatDate(date)
      setDateRange({ startDate: formattedDate, endDate: formattedDate })
      setShowDatePicker(false)
    }
  }

  return (
    <Box
      borderRadius="15px"
      background={{ md: '#121212' }}
      border={{ base: 'none', md: 'solid 1px #353945' }}
      margin="0 auto"
    >
      <Tabs
        isFitted
        variant="soft-rounded"
        height={{ base: 'auto', xs: '100vh', md: 'initial' }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          padding="1rem"
        >
          <TabList>
            {tabs.map((tab) => (
              <Tab
                key={tab.title}
                fontWeight="600"
                _selected={{ color: 'white', bg: '#3772ff' }}
                fontSize="0.8rem"
                padding="0.4 rem 0.75rem"
                borderRadius="10px"
              >
                {tab.title}
              </Tab>
            ))}
          </TabList>
          <Box
            position="relative"
            display="flex"
            alignItems="center"
            justifyContent="end"
          >
            {selectedDate && isNotMobile && (
              <Text
                fontSize="0.8rem"
                textTransform="uppercase"
                paddingRight="1rem"
              >
                {selectedDate.toDateString()}
              </Text>
            )}
            <ScoreboardDatePicker
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
              {error && <ErrorState />}
              {fixtures ? (
                <ScoreBoardList
                  fixtures={fixtures}
                  isFetching={isFetching}
                  error={error}
                />
              ) : null}
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}
