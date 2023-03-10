import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { Box, Flex, Heading, Text, Avatar } from '@chakra-ui/react'
import { getMatchesByTeamName } from '../../lib/api-helpers'

export default function Team() {
  const router = useRouter()
  const { id } = router.query

  const { data, isLoading, error } = useQuery({
    queryKey: ['teamFixtures'],
    queryFn: () => getMatchesByTeamName(id),
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
            Arsenal
          </Heading>
        </Flex>
      </Box>

      {data?.response.map((fixture: any, i: number) => (
        <Flex width="100%" justifyContent="center" key={i}>
          <Flex
            alignItems="center"
            color="gray.500"
            width="100%"
            justifyContent="space-evenly"
          >
            <Flex alignItems="center" direction="column">
              <Avatar
                name={fixture.teams.home.name}
                size="sm"
                marginBottom="0.5rem"
                src={fixture.teams.home.logo}
              />
              <Text>{fixture.teams.home.name}</Text>
            </Flex>

            <Flex alignItems="center" direction="column">
              <Avatar
                name={fixture.teams.away.name}
                size="sm"
                marginBottom="0.5rem"
                src={fixture.teams.away.name}
              />
              <Text>{fixture.teams.away.name}</Text>
            </Flex>
          </Flex>
        </Flex>
      ))}
    </Box>
  )
}
