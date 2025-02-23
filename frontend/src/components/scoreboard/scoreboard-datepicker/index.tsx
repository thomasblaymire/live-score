import ReactDatePicker from 'react-datepicker'
import { Global } from '@emotion/react'
import { IconButton } from '@chakra-ui/react'
import { BsFillCalendarEventFill } from 'react-icons/bs'
import { datePickerStyles } from './styles'
import 'react-datepicker/dist/react-datepicker.css'

interface CustomDatePickerProps {
  selectedDate: Date | null
  handleDateChange: (date: Date | null) => void
  showDatePicker: boolean
  setShowDatePicker: (show: boolean) => void
}

export function ScoreboardDatePicker({
  selectedDate,
  handleDateChange,
  showDatePicker,
  setShowDatePicker,
}: CustomDatePickerProps) {
  return (
    <>
      <Global styles={datePickerStyles} />
      <ReactDatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        closeOnScroll={true}
        popperPlacement="top-end"
        popperModifiers={[
          {
            name: 'offset',
            options: {
              offset: [5, 10],
            },
          },
          {
            name: 'preventOverflow',
            options: {
              rootBoundary: 'viewport',
              tether: false,
              altAxis: true,
            },
          },
        ]}
        customInput={
          <IconButton
            background="transparent"
            _hover={{ background: 'transparent' }}
            sx={{
              '&:hover svg': {
                background: 'transparent',
                fill: '#3772ff',
              },
            }}
            minWidth="initial"
            aria-label="Open calendar"
            icon={<BsFillCalendarEventFill />}
            onClick={() => setShowDatePicker(!showDatePicker)}
          />
        }
      />
    </>
  )
}
