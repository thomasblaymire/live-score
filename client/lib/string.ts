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
  const formattedWord = (word: string) =>
    word?.charAt(0).toUpperCase() + word?.slice(1)

  const formattedSlug = slug?.includes('_')
    ? slug.split('_').map(formattedWord).join(' ')
    : formattedWord(slug)

  return formattedSlug
}
