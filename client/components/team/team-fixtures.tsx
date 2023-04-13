import { Flex, Box, Avatar, Heading, Text } from '@chakra-ui/react'
import { formatUTCDate } from '../../lib/time'

interface TeamFixturesProps {
  fixtures: any
  isError?: any
  isLoading?: any
}

const getMatchTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toTimeString().slice(0, 5)
}

export function TeamFixtures({
  fixtures,
  isLoading,
  isError,
}: TeamFixturesProps) {
  return (
    <>
      {fixtures.map((fixture: any, i: number) => (
        <Box key={fixture.id} marginBottom="1rem" background="#1a1a1a">
          <Box
            textAlign="center"
            color="white"
            paddingY="1rem"
            fontSize="0.8rem"
          >
            <Box>
              <h4>{formatUTCDate(fixture.date)}</h4>
            </Box>
            <Box>
              <p>{fixture.league.name}</p>
            </Box>
          </Box>

          <Flex
            justifyContent="space-between"
            paddingY="1rem"
            key={i}
            color="white"
            padding="1rem 6rem"
            fontWeight="500"
          >
            <Box flex="1" mr="2">
              <Box>
                <Text align="right">{fixture.homeTeam.name}</Text>
              </Box>
            </Box>
            <Box flex="1" mx="2" textAlign="center">
              {getMatchTime(fixture.date)}
            </Box>
            <Box flex="1" ml="2">
              <Flex alignItems="center">
                <Text align="left">{fixture.awayTeam.name}</Text>
              </Flex>
            </Box>
          </Flex>
        </Box>
      ))}
    </>
  )
}
