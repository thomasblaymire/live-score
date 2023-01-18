// TODO: Refactor everyting about this this
export const hypenateMatchString = (
  url: string,
  id: string,
  firstString: string,
  secondString: string
): string => {
  return `${url}${firstString}-vs-${secondString}/${id}`
    .replace(/\s+/g, '-')
    .toLowerCase()
}
