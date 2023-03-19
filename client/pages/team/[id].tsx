import { Flex, Box, Text } from '@chakra-ui/layout'
import { Avatar, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Card } from '../../components/card'
import { formatSlug } from '../../lib/string'
import { useQuery } from 'react-query'
import { getMatchesByTeamName } from '../../lib/api-helpers'

export default function Team() {
  const router = useRouter()
  const { id } = router.query as { id: string }

  const { data, isLoading, error } = useQuery({
    queryKey: ['teamFixtures'],
    queryFn: () => getMatchesByTeamName(id),
  })

  return (
    <>
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
            {formatSlug(id)}
          </Heading>
        </Flex>
      </Box>
      <Box
        marginTop={{ base: '1rem', md: '3rem' }}
        width="1200px"
        height="400vh"
        margin="0 auto"
      >
        <Flex justifyContent="center" gap="1.5rem" paddingBottom="2.5rem">
          <Box width="40%"></Box>
          <Box width="40%"></Box>
        </Flex>

        <Flex justifyContent="center" gap="1.5rem" paddingBottom="2.5rem">
          <Box width="60%">
            {data ? (
              <Card
                heading="Fixtures"
                headingAlign="center"
                background="#121212"
                height="45vh"
                radius="15px"
              >
                {data?.response.map((fixture: any, i: number) => (
                  <>
                    <div>
                      <Flex justifyContent="space-between">
                        <Box flex="1" mr="2">
                          <Flex alignItems="center">
                            <Avatar
                              name={fixture.teams.home.name}
                              size="sm"
                              marginBottom="0.5rem"
                              src={fixture.teams.home.logo}
                            />
                            <Text align="center">
                              {fixture.teams.home.name}
                            </Text>
                          </Flex>
                        </Box>
                        <Box flex="1" mx="2" textAlign="center">
                          VS
                        </Box>
                        <Box flex="1" ml="2">
                          <Flex alignItems="center" direction="column">
                            <Avatar
                              name={fixture.teams.away.name}
                              size="sm"
                              marginBottom="0.5rem"
                              src={fixture.teams.away.logo}
                            />
                            <Text align="center">
                              {fixture.teams.away.name}
                            </Text>
                          </Flex>
                        </Box>
                      </Flex>
                    </div>

                    {/* <Flex width="100%" justifyContent="center" key={i}>
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
                    </Flex> */}
                  </>
                ))}
              </Card>
            ) : null}
          </Box>

          <Box width="40%">
            <Card
              heading="Venue"
              headingAlign="center"
              background="#121212"
              height="45vh"
              radius="15px"
            ></Card>
          </Box>
        </Flex>
      </Box>
    </>
  )
}
