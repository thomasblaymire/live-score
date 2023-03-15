import { Box, Text, Flex } from '@chakra-ui/layout'
import { parse } from '../lib/time'

enum MATCH_STATUS {
  IN_PLAY = 'IN_PLAY',
  FINISHED = 'FT',
  TIMED = 'TIMED',
}

interface ScoreBoardProps {
  status: Status
}

export function Status({ status }: ScoreBoardProps) {
  return (
    <Box flex="0 0 50px" flexDirection="column" position="relative">
      {status.short !== 'FT' ? (
        <>
          <Box background="green" />
          <Text fontWeight="600">FULL TIME</Text>
        </>
      ) : (
        <Box
          background="red"
          minWidth="60px"
          borderRadius="5px"
          display="flex"
          justifyContent="center"
        >
          <Text fontWeight="600">Live</Text>
        </Box>
      )}
    </Box>
  )
}
