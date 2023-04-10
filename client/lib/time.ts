const parse = (time: string): number => {
  const [hours, minutes, seconds] = time
    .split(':')
    .map((unit) => parseFloat(unit))
  return hours * 3600 + minutes * 60 + seconds
}

// Takes a UTC and returns a formatted date/time
// e.g 2019-12-26T17:30:00+00:00 => Thu, 26 Dec 2019
const formatUTCDate = (date: Date): string => {
  let value = new Date(date).toUTCString()
  value = value.split(' ').slice(0, 5).join(' ')
  return value
}

const formatDate = (date: Date) => date.toISOString().split('T')[0]

export { parse, formatUTCDate, formatDate }
