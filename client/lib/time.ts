export const parse = (time: string): number => {
  const [hours, minutes, seconds] = time
    .split(':')
    .map((unit) => parseFloat(unit))
  return hours * 3600 + minutes * 60 + seconds
}
