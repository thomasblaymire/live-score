import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { MdSearch } from 'react-icons/md'

interface SearchProps {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function Search({ handleSearch }: SearchProps) {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <MdSearch color="gray.800" />{' '}
      </InputLeftElement>
      <Input
        border="none"
        outline="none"
        type="text"
        placeholder="Search..."
        onChange={(e) => handleSearch(e)}
      />
    </InputGroup>
  )
}
