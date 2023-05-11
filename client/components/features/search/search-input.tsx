import React, { ChangeEvent, useState } from 'react'
import { Input, InputGroup, InputLeftElement, Box } from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'

interface SearchInputProps {
  onSearch: (searchValue: string) => void
}

export const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [value, setValue] = useState<string>('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    onSearch(event.target.value)
  }

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
          onChange={handleChange}
          pl="2.5rem"
          border="none"
          outline="none"
          focusBorderColor="none"
        />
      </InputGroup>
    </Box>
  )
}
