import { Flex, Text, Box } from '@chakra-ui/react'
import { formatUTCDate } from '@/lib/time'
import NextImage from 'next/image'

interface MatchCardProps {
  match: CustomFixture
}

export function MatchCard({ match }: MatchCardProps) {
  return (
    <Box
      height="100%"
      cursor="pointer"
      borderRadius="5px"
      minHeight="150px"
      padding="1rem"
      color="white"
      background="#121212"
      border="solid 1px #353945"
      _hover={{ background: '#313131' }}
    >
      <Text align="center" paddingBottom="2rem" color="#888">
        {formatUTCDate(new Date(match.date))}
      </Text>
      <Flex key={match.id} alignItems="center" justifyContent="center">
        <Flex direction="column-reverse" alignItems="center">
          <Text>{match.homeTeam.name}</Text>
          <NextImage
            src={match.homeTeam.logo}
            width="55"
            height="30"
            sizes="100vw"
            style={{ width: '40%', height: 'auto', paddingBottom: '0.5rem' }}
            alt={match.homeTeam.name}
          />
        </Flex>
        <Text
          fontSize="xl"
          fontWeight="bold"
          paddingTop="0.5rem"
          padding="0.5rem 1rem"
        >
          VS
        </Text>
        <Flex direction="column-reverse" alignItems="center">
          <Text>{match.awayTeam.name}</Text>
          <NextImage
            src={match.awayTeam.logo}
            width="55"
            height="30"
            sizes="100vw"
            style={{ width: '40%', height: 'auto', paddingBottom: '0.5rem' }}
            alt={match.awayTeam.name}
          />
        </Flex>
      </Flex>
    </Box>
  )
}
