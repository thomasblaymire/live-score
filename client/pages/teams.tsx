import { useQuery } from 'react-query'
import Image from 'next/image'
import {
  Table,
  TableContainer,
  Thead,
  Td,
  Th,
  Tr,
  Tbody,
  Heading,
  Flex,
  Text,
  Box,
  Center,
  SimpleGrid,
} from '@chakra-ui/react'
import { getTeams } from '../lib/api-helpers'

export default function Teams() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['teams'],
    queryFn: () => getTeams(),
  })

  console.log('debug data', data)

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        height="45vh"
        background="linear-gradient(to right, #1CB5E0, #000046)"
      >
        <Flex direction="column" gap="1rem" width="1200px" margin="0 auto">
          <Heading
            color="white"
            fontFamily="inherit"
            fontWeight={700}
            fontSize="3rem"
            lineHeight="1"
          >
            Teams
          </Heading>
        </Flex>
      </Box>

      <Flex
        wrap="wrap"
        width="1200px"
        margin="0 auto"
        marginY="2rem"
        gap="1rem"
      >
        {data?.response.map(({ team }: any) => {
          console.log('debug team', team)
          return (
            <Box
              borderRadius="5px"
              flex="1 0 21%;"
              height="150px"
              key={team.id}
              cursor="pointer"
              color="white"
              padding="1rem"
              background="gray.900"
            >
              <Flex direction="column" justifyContent="center">
                <Image width={40} alt={team.name} height={20} src={team.logo} />
                <Text>{team.name}</Text>
              </Flex>
            </Box>
          )
        })}
      </Flex>
    </Box>
  )
}
