import { useState } from 'react'
import { SkeletonLoading } from '../skeleton'
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Text,
} from '@chakra-ui/react'
import { useFixtures } from '../../hooks/useFixtures'
import { ErrorState } from '../error'
import { formatDate } from '../../lib/time'
import { tabs } from './data'
import { ScoreBoardList } from './scoreboard-list'
import { DatePicker } from '../datepicker'

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
  //const today = formatDate(new Date())

  const [dateRange, setDateRange] = useState<FixtureDateRange>({
    startDate: '2023-04-09',
    endDate: '2023-04-09',
  })

  const {
    data: fixtures,
    isLoading,
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
      border="solid 1px #353945;"
      margin="0 auto"
    >
      <Tabs isFitted variant="soft-rounded" colorScheme="red">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <TabList padding="1rem">
            {tabs.map((tab) => (
              <Tab
                key={tab.title}
                fontWeight="600"
                _selected={{ color: 'white', bg: '#3772ff' }}
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
              {fixtures ? (
                <ScoreBoardList fixtures={fixtures} error={error} />
              ) : null}
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}
