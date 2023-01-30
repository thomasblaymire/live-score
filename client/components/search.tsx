// import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Flex,
  Stack,
  Image,
  Heading,
  Card,
  StackDivider,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  SimpleGrid,
} from '@chakra-ui/react'
import { getSearchResults } from '../lib/api-helpers'
import { MdSearch } from 'react-icons/md'

interface SearchProps {
  // handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  isOpen: any
  onOpen: any
  onClose: any
}

// Lets split this up into seperate components
export function Search({ isOpen, onClose }: SearchProps) {
  const [searchField, setSearchField] = useState('')
  const [data, setData] = useState()

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearchField(value.toLowerCase())
  }

  useEffect(() => {
    if (searchField.length > 3) {
      renderResults()
    }
  }, [searchField])

  const renderResults = async () => {
    const result = await getSearchResults(searchField)
    setData(result)
  }

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
        {' '}
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
                  onChange={(e) => handleSearch(e)}
                />
              </InputGroup>
            </Box>
            <Box paddingTop="2rem">
              {data &&
                //@ts-ignore
                data.response.map((result: any, i: any) => {
                  return (
                    <>
                      <Card color="white" data-test="search-result">
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
                    </>
                  )
                })}
            </Box>
          </ModalBody>
        </Box>
      </ModalContent>
    </Modal>
  )
}
