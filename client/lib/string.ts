// TODO: Refactor everyting about this this
export const hypenateMatchString = (
  firstString: string,
  secondString: string
): string => {
  return `${firstString}-vs-${secondString}`.replace(/\s+/g, '-').toLowerCase()
}

export const hypenate = (string: string): string => {
  return `${string}`.replace(/\s+/g, '-').toLowerCase()
}
