import { useEffect, useState } from 'react'
import {
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Flex,
  Stack,
  Image,
  Heading,
  Card,
  StackDivider,
  CardBody,
} from '@chakra-ui/react'
import { useDebounce } from '../hooks/useDebounce'
import { getSearchResults } from '../lib/api-helpers'
import { MdSearch } from 'react-icons/md'

interface SearchProps {
  isOpen: boolean
  onClose: () => void
}

export function Search({ isOpen, onClose }: SearchProps) {
  const [value, setValue] = useState('')
  const [data, setData] = useState<SearchResult | undefined>()
  const debouncedValue = useDebounce<string>(value, 500)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value.toLowerCase())
  }

  useEffect(() => {
    const renderResults = async () => {
      const result = await getSearchResults(debouncedValue)
      setData(result)
    }
    if (value.length > 3) {
      renderResults()
    } else {
      setData(undefined)
    }
  }, [debouncedValue, value])

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay
        bg="none"
        backdropFilter="auto"
        backdropInvert="10%"
        backdropBlur="2px"
      />
      <ModalContent
        background="#000000e8"
        color="white"
        fontFamily="__Nunito_81bb96"
      >
        <ModalCloseButton />
        <Box width="70vw" margin="0 auto" position="relative" marginTop="6rem">
          <ModalBody>
            <Box>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <MdSearch color="gray.800" size="md" width="1.2rem" />{' '}
                </InputLeftElement>
                <Input
                  fontSize="1.75rem"
                  padding="1rem 3rem;"
                  placeholder="Search...."
                  outline="none"
                  border="none"
                  borderRadius="0px"
                  type="text"
                  borderBottom="solid 3px white"
                  data-test="search-input"
                  value={value}
                  onChange={handleChange}
                />
              </InputGroup>
            </Box>
            <Box paddingTop="2rem">
              {data
                ? data.response.map((result: SearchResponse) => (
                    <Card
                      color="white"
                      data-test="search-result"
                      key={result.team.name}
                    >
                      <CardBody padding="1rem 0rem">
                        <Stack divider={<StackDivider />} spacing="2">
                          <Flex alignItems="center">
                            <Image
                              src={result.team.logo}
                              alt={result.team.name}
                              width={35}
                              height={35}
                            />
                            <Heading
                              size="xs"
                              textTransform="uppercase"
                              marginLeft="1rem"
                            >
                              {result.team.name}
                            </Heading>
                          </Flex>
                        </Stack>
                      </CardBody>
                    </Card>
                  ))
                : null}
            </Box>
          </ModalBody>
        </Box>
      </ModalContent>
    </Modal>
  )
}
