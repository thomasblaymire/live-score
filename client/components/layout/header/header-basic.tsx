import { Logo } from '@/components/ui/logo'
import { Box, Flex } from '@chakra-ui/react'

export function HeaderBasic() {
  return (
    <header>
      <Box height="4rem" position="sticky" background="#121212">
        <Flex
          margin="0 auto"
          height="100%"
          alignItems="center"
          justifyContent="center"
        >
          <Box>
            <Logo />
          </Box>
        </Flex>
      </Box>
    </header>
  )
}
