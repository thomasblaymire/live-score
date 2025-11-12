import React, { ChangeEvent } from 'react'
import {
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'
import { VscClose } from 'react-icons/vsc'

interface SearchInputProps {
  onSearch: (event: ChangeEvent<HTMLInputElement>) => void
  value: string
}

export function SearchInput({ onSearch, value }: SearchInputProps) {
  const clearInput = () => {
    onSearch({ target: { value: '' } } as ChangeEvent<HTMLInputElement>)
  }

  return (
    <Box>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <FiSearch color="#353945" />
        </InputLeftElement>
        <Input
          _focusVisible={{ border: 'none' }}
          css={{
            '::-webkit-search-decoration': { display: 'none' },
            '::-webkit-search-cancel-button': { display: 'none' },
            '::-webkit-search-results-button': { display: 'none' },
            '::-webkit-search-results-decoration': { display: 'none' },
          }}
          type="search"
          placeholder="Search..."
          area-label="Search"
          value={value}
          onChange={onSearch}
          pl="2.5rem"
          border="none"
          outline="none"
          focusBorderColor="none"
          data-testid="search-input"
        />
        {value && (
          <InputRightElement>
            <IconButton
              aria-label="Clear search"
              icon={<VscClose color="#353945" fontSize="1.25rem" />}
              size="sm"
              variant="unstyled"
              onClick={clearInput}
              data-testid="clear-search-button"
            />
          </InputRightElement>
        )}
      </InputGroup>
    </Box>
  )
}
