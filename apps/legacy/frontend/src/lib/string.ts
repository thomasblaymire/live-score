/**
 * Creates a hyphenated match string from two given strings.
 * @param firstString - The first string
 * @param secondString - The second string
 * @returns A hyphenated match string in the format "firstString-vs-secondString"
 */
const hyphenateMatchString = (
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
const hyphenate = (string: string): string => {
  return string.replace(/\s+/g, '-').toLowerCase()
}

/**
 * Formats a slug by capitalizing the first letter of each word and replacing underscores with spaces.
 * @param slug - The input slug
 * @returns The formatted slug
 */
const formatSlug = (slug: string): string => {
  const formattedWord = (word: string) =>
    word?.charAt(0).toUpperCase() + word?.slice(1)

  const formattedSlug = slug?.includes('_')
    ? slug.split('_').map(formattedWord).join(' ')
    : formattedWord(slug)

  return formattedSlug
}

/**
 * Formats the team name for display in the UI.
 *
 * If the team name consists of two words (e.g., "Manchester United"),
 * it shortens the name to the "M. United" format, keeping only the
 * first letter of the first word followed by a period and the second word.
 * @param {string} name - The full team name to format.
 * @returns {string} The formatted team name.
 */
function formatTeamNameString(name: string): string {
  const words = name.split(' ')
  if (words.length > 1) {
    return `${words[0][0]}. ${words[1]}`
  }
  return name
}

export { hyphenateMatchString, hyphenate, formatSlug, formatTeamNameString }
