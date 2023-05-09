import { Progress, Box, Flex, Text, Stack } from '@chakra-ui/react'

export function Stats() {
  return (
    <>
      <Box padding="1rem">
        <Text align="center">Possession</Text>
        <Flex align="center">
          <Text marginRight="0.5rem">25%</Text>
          <Progress width="100%" value={64} />
          <Text marginLeft="0.5rem">75%</Text>
        </Flex>
      </Box>
      <Box padding="1rem">
        <Text align="center">Possession</Text>
        <Flex align="center">
          <Text marginRight="0.5rem">25%</Text>
          <Progress width="100%" value={64} />
          <Text marginLeft="0.5rem">75%</Text>
        </Flex>
      </Box>
      <Box padding="1rem">
        <Text align="center">Possession</Text>
        <Flex align="center">
          <Text marginRight="0.5rem">25%</Text>
          <Progress width="100%" value={64} />
          <Text marginLeft="0.5rem">75%</Text>
        </Flex>
      </Box>
      <Box padding="1rem">
        <Text align="center">Possession</Text>
        <Flex align="center">
          <Text marginRight="0.5rem">25%</Text>
          <Progress width="100%" value={64} />
          <Text marginLeft="0.5rem">75%</Text>
        </Flex>
      </Box>
    </>
  )
}
