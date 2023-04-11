import { css } from '@emotion/react'

export const datePickerStyles = css`
  .react-datepicker {
    background-color: #121212;
    color: #fff;
    border: none;
  }
  .react-datepicker__header {
    background-color: #121212;
    border: none;
    padding: 1px 0;
  }
  .react-datepicker__current-month {
    color: white;
  }
  .react-datepicker__day--keyboard-selected {
    color: #313131;
  }
  .react-datepicker__day-name {
    color: grey;
  }
  .react-datepicker-wrapper {
    width: initial;
  }
  .react-datepicker__day {
    color: #fff;
  }
  .react-datepicker__day--selected,
  .react-datepicker__day--selected:hover,
  .react-datepicker__day:hover,
  .react-datepicker__day--keyboard-selected {
    background-color: #5d5b5b;
  }
`
