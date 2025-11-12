import { Box, Flex, Text, Heading, useMediaQuery } from '@chakra-ui/react'

export function HeroCard() {
  const [isMobile] = useMediaQuery('(max-width: 768px)')

  const mobileStyles = {
    height: '15vh',
    backgroundImage:
      'linear-gradient(105deg, #08154e 0%, #4161ed 100%, transparent 50%)',
    maxWidth: '100%',
    margin: '0.5rem',
  }

  const desktopStyles = {
    height: '35vh',
    backgroundImage: `linear-gradient(105deg, #08154e 0%, #4161ed 60%, transparent 50%),url(/images/bet-hero.jpg)`,
    backgroundSize: 'cover',
  }

  const headingFontSize = isMobile ? '0.8rem' : '1rem'
  const textFontSize = isMobile ? '0.7rem' : '0.8rem'

  return (
    <Box
      background="#4161ed"
      borderRadius="15px"
      marginBottom="2rem"
      boxShadow="0 1.5rem 4rem rgb(0 0 0 / 20%)"
      display="flex"
      {...(isMobile ? mobileStyles : desktopStyles)}
    >
      <Flex
        direction="column"
        color="white"
        justifyContent="center"
        paddingX="0.75rem"
      >
        <Text fontSize={textFontSize} fontWeight="500">
          Premier League
        </Text>
        <Heading
          fontSize={headingFontSize}
          paddingY="0.75rem"
          fontFamily="inherit"
          fontWeight="700"
        >
          Liverpool FC vs Manchester United
        </Heading>
        <Text
          sx={{
            maxWidth: {
              base: '100%',
              md: '290px',
            },
          }}
          fontSize={textFontSize}
          fontWeight="500"
        >
          Mohamed Salah is the first away player to score a hat-trick at Old
          Trafford since Ronaldo did so for Real Madrid in the UEFA Champions
          League.
        </Text>
      </Flex>
    </Box>
  )
}
