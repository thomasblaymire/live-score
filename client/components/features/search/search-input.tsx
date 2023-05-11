import React, { ChangeEvent, useState } from 'react'
import { Input, InputGroup, InputLeftElement, Box } from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'

interface SearchInputProps {
  onSearch: (event: ChangeEvent<HTMLInputElement>) => void
  value: string
}

export const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  value,
}) => {
  return (
    <Box>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <FiSearch color="#353945" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search..."
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
