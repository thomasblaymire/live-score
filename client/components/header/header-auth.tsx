import { Box, Stack, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export function AuthenticationButtons() {
  const router = useRouter()

  return (
    <Box>
      <Stack direction="row" spacing={6} align="center">
        <Button
          colorScheme="gray"
          variant="link"
          data-test="login-button"
          onClick={() => router.push('/auth/signin')}
        >
          Log In
        </Button>
        <Button
          colorScheme="gray"
          data-test="signup-button"
          onClick={() => router.push('/auth/signup')}
        >
          Sign Up
        </Button>
      </Stack>
    </Box>
  )
}
