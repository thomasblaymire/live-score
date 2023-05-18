import React, { ChangeEvent } from 'react'
import { Input, InputGroup, InputLeftElement, Box } from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'

interface SearchInputProps {
  onSearch: (event: ChangeEvent<HTMLInputElement>) => void
  value: string
}

export function SearchInput({ onSearch, value }: SearchInputProps) {
  return (
    <Box>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <FiSearch color="#353945" />
        </InputLeftElement>
        <Input
          _focusVisible={{ border: 'none' }}
          type="search"
          placeholder="Search..."
          area-label="Search"
          value={value}
          onChange={onSearch}
          pl="2.5rem"
          border="none"
          outline="none"
          focusBorderColor="none"
        />
      </InputGroup>
    </Box>
  )
}
