/**
 * Converts a time string (HH:mm:ss) to the total number of seconds.
 * @param time - A string in the format HH:mm:ss
 * @returns The total number of seconds
 */
const parse = (time: string): number => {
  const [hours, minutes, seconds] = time
    .split(':')
    .map((unit) => parseFloat(unit))
  return hours * 3600 + minutes * 60 + seconds
}

/**
 * Formats a UTC date object to a readable string.
 * e.g 2019-12-26T17:30:00+00:00 => Thu, 26 Dec 2019
 * @param date - A Date object
 * @returns A formatted date string
 */
const formatUTCDate = (date: Date): string => {
  const value = new Date(date).toUTCString()
  return value.split(' ').slice(0, 5).join(' ')
}

/**
 * Formats a date object to a local date string in the format YYYY-MM-DD.
 * @param date - A Date object
 * @returns A formatted local date string
 */
const formatDate = (date: Date): string => {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  return localDate.toISOString().split('T')[0]
}

/**
 * Returns the current date as a string in the format YYYY-MM-DD.
 * @param date - A Date object
 * @returns A formatted date string
 */
function getCurrentDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Returns the week number of a date
 * @param date - A Date object
 * @returns A formatted date string
 */
function getWeekNumber(date: Date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
}

/**
 * Generates an object containing the current date and the date N months from now.
 *
 * @param {number} monthsToAdd The number of months to add to the current date.
 * @returns {Object} An object containing the start and end dates as "YYYY-MM-DD" strings.
 */
function getDateRange(monthsToAdd: number) {
  // Create a new Date object for the current date
  const currentDate = new Date()
  // Format the current date as a string in the format "YYYY-MM-DD"
  const startDate = currentDate.toISOString().split('T')[0]

  // Create a new Date object for the end date
  const endDateDate = new Date()
  // Add the specified number of months to the current date
  endDateDate.setMonth(currentDate.getMonth() + monthsToAdd)
  // Format the end date as a string in the format "YYYY-MM-DD"
  const endDate = endDateDate.toISOString().split('T')[0]

  // Return the date range object
  return {
    startDate,
    endDate,
  }
}

export {
  parse,
  formatUTCDate,
  formatDate,
  getCurrentDate,
  getDateRange,
  getWeekNumber,
}
