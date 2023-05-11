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

  function onSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  console.log('debug results', results)

  return (
    <Box>
      <SearchInput onSearch={onSearch} value={value} />
      {results ? <SearchResults results={results} /> : null}
    </Box>
  )
}
