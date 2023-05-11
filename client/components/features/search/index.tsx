import { SearchInput } from './search-input'
import { Box, Divider } from '@chakra-ui/react'
import { SearchResults } from './search-results'

export function Search() {
  function onSearch(e: any) {
    console.log(e)
  }

  return (
    <Box height="400px">
      <SearchInput onSearch={onSearch} />
      <Divider py="0.25rem" color="#353945" />
      <SearchResults />
    </Box>
  )
}
