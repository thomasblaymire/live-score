import { Box, Text, Flex } from '@chakra-ui/layout'
import { parse } from '@/lib/time'

enum MATCH_STATUS {
  IN_PLAY = 'IN_PLAY',
  FINISHED = 'FT',
  TIMED = 'TIMED',
}

interface ScoreboardStatusProps {
  status: Status
}

export function ScoreboardStatus({ status }: ScoreboardStatusProps) {
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
          minWidth="65px"
          borderRadius="5px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            background="white"
            borderRadius="50%"
            width="7px"
            height="7px"
            marginRight="0.25rem"
          />
          <Text fontWeight="600" textTransform="uppercase">
            Live
          </Text>
        </Box>
      )}
    </Box>
  )
}
