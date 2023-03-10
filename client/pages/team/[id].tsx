import { useRouter } from 'next/router'
import { Box, Flex, Heading } from '@chakra-ui/react'

export default function Team() {
  const router = useRouter()
  const { code } = router.query

  return (
    <Box>
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
            Arsenal
          </Heading>
        </Flex>
      </Box>
      <Flex
        marginTop={{ base: '1rem', md: '3rem' }}
        justifyContent="space-between"
        margin="0 auto"
        width="1200px"
      ></Flex>
    </Box>
  )
}
