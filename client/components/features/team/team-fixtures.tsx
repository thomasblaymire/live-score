import NextImage from 'next/image'
import { Flex, Box, Text } from '@chakra-ui/react'
import { formatUTCDate } from '../../../lib/time'

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
    <Box gap="1rem">
      {fixtures.map((fixture: any, i: number) => (
        <Box key={fixture.id} marginBottom="1rem" border="solid 1px #353945;">
          <Box
            textAlign="center"
            color="white"
            paddingY="0.5rem"
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
            alignItems="center"
            paddingY="0.5rem"
            key={i}
            color="white"
            padding="1rem"
            fontWeight="500"
          >
            <Box
              flex="1"
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <NextImage
                src={fixture.homeTeam.logo}
                color="white"
                alt={fixture.homeTeam.name}
                width={50}
                height={25}
                style={{ marginBottom: '10px' }}
              />
              <Text align="right">{fixture.homeTeam.name}</Text>
            </Box>
            <Box flex="1" mx="2" textAlign="center">
              {getMatchTime(fixture.date)}
            </Box>
            <Box flex="1" ml="2">
              <Flex alignItems="center">
                <Box display="flex" alignItems="center" flexDirection="column">
                  <NextImage
                    src={fixture.awayTeam.logo}
                    color="white"
                    alt={fixture.awayTeam.name}
                    width={50}
                    height={25}
                    style={{ marginBottom: '10px' }}
                  />
                  <Text align="left">{fixture.awayTeam.name}</Text>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Box>
      ))}
    </Box>
  )
}
