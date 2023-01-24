import { Box, Flex, Text, Heading } from '@chakra-ui/layout'

export function BetCard() {
  return (
    <Box
      height="35vh"
      background="#4161ed"
      borderRadius="15px"
      marginBottom="2rem"
      backgroundImage={`linear-gradient(105deg, #4161ed 0%, #4161ed 60%, transparent 50%),url(/images/bet-hero.jpg)`}
      backgroundSize="cover"
      boxShadow="0 1.5rem 4rem rgb(0 0 0 / 20%)"
      display="flex"
    >
      <Flex
        direction="column"
        color="white"
        justifyContent="center"
        paddingX="0.75rem"
      >
        <Text>Premier League</Text>
        <Heading fontSize="1.2rem" paddingY="0.75rem" fontFamily="inherit">
          Liverpool FC vs Manchester United
        </Heading>
        <Text maxWidth="290px" fontSize="0.9rem">
          Mohamed Salah is the first away player to score a hat-trick at Old
          Trafford since Ronaldo did so for Real Madrid in the UEFA Champions
          League.
        </Text>
      </Flex>
    </Box>
  )
}
