// Search.tsx
import { useState } from 'react'
import {
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  Modal,
  Center,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react'
import { SearchResults } from './search-results'
import { ErrorState } from '@/components/ui/error'
import { Loading } from '@/components/ui/loading'
import { useSearch } from '@/hooks/useSearch'
import { useDebounce } from '@/hooks/useDebounce'
import { MdSearch } from 'react-icons/md'

interface SearchProps {
  isOpen: boolean
  onClose: () => void
}

export function Search({ isOpen, onClose }: SearchProps) {
  const [value, setValue] = useState<string>('')
  const debouncedValue = useDebounce<string>(value, 500)
  const { data: searchResults, isLoading, error } = useSearch(debouncedValue)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value.toLowerCase())
  }

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay
        bg="none"
        backdropFilter="auto"
        backdropInvert="10%"
        backdropBlur="2px"
        data-test="search-modal"
      />
      <ModalContent bg="#000000e8" color="white">
        <ModalCloseButton />
        <Box w="40vw" margin="0 auto" position="relative" mt="6rem">
          {isOpen && (
            <ModalBody>
              <Box>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <MdSearch color="gray.800" size="md" width="0.5rem" />
                  </InputLeftElement>
                  <Input
                    className="input-element"
                    fontSize="1.25rem"
                    p="1rem 2rem"
                    bg="#212121"
                    borderColor="#212121"
                    placeholder="Search...."
                    fontFamily="inherit"
                    borderRadius="10px"
                    pl="2.5rem"
                    type="text"
                    data-test="search-input"
                    value={value}
                    onChange={handleChange}
                    autoFocus
                  />
                </InputGroup>
              </Box>
              <Box mt="1rem" borderRadius="10px" bg="#212121">
                <Center>
                  <Loading loading={isLoading} size="md" />
                </Center>
                {error ? <ErrorState /> : null}
                {searchResults ? (
                  <SearchResults results={searchResults} />
                ) : null}
              </Box>
            </ModalBody>
          )}
        </Box>
      </ModalContent>
    </Modal>
  )
}
