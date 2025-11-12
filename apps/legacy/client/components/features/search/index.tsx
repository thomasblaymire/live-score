import { useState } from 'react'
import { SearchInput } from './search-input'
import { Box } from '@chakra-ui/react'
import { SearchResults } from './search-results'
import { useSearch } from '@/hooks/useSearch'
import { useDebounce } from '@/hooks/useDebounce'

export function Search() {
  const [value, setValue] = useState<string>('')
  const debouncedValue = useDebounce<string>(value, 500)
  const { data: results, isLoading, error } = useSearch(debouncedValue)

  const hasResults =
    results &&
    (results.players.length > 0 ||
      results.teams.length > 0 ||
      results.venues.length > 0)

  function onSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  return (
    <Box>
      <SearchInput onSearch={onSearch} value={value} />
      {hasResults ? <SearchResults results={results} /> : null}
    </Box>
  )
}
