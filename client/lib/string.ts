/**
 * Creates a hyphenated match string from two given strings.
 * @param firstString - The first string
 * @param secondString - The second string
 * @returns A hyphenated match string in the format "firstString-vs-secondString"
 */
export const hyphenateMatchString = (
  firstString: string,
  secondString: string
): string => {
  return `${firstString}-vs-${secondString}`.replace(/\s+/g, '-').toLowerCase()
}

/**
 * Replaces spaces with hyphens and converts the given string to lowercase.
 * @param string - The input string
 * @returns The modified string with spaces replaced by hyphens and in lowercase
 */
export const hyphenate = (string: string): string => {
  return string.replace(/\s+/g, '-').toLowerCase()
}

/**
 * Formats a slug by capitalizing the first letter of each word and replacing underscores with spaces.
 * @param slug - The input slug
 * @returns The formatted slug
 */
export const formatSlug = (slug: string): string => {
  const formattedWord = (word: string) =>
    word?.charAt(0).toUpperCase() + word?.slice(1)

  const formattedSlug = slug?.includes('_')
    ? slug.split('_').map(formattedWord).join(' ')
    : formattedWord(slug)

  return formattedSlug
}
