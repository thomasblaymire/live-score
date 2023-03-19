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

export const formatSlug = (slug: string): string => {
  const words: string[] = slug.split('_')
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
