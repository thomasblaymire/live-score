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

export { parse, formatUTCDate, formatDate, getCurrentDate }
