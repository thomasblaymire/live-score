import { Box, Text } from '@chakra-ui/react'
import { fixtureError } from './data'

export function ScoreBoardEmpty() {
  return (
    <Box
      margin={{ base: '0px' }}
      marginBottom={{ base: '1rem', md: '0' }}
      fontSize={{ base: '1rem', md: '1.25rem' }}
      fontWeight="600"
      color="white"
      borderRadius="5px"
      paddingY="1rem"
    >
      <Text
        fontSize={{ base: '0.8rem', md: '0.9rem' }}
        fontWeight="500"
        color="#a1a1a1"
      >
        {fixtureError}
      </Text>
    </Box>
  )
}
