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
          fontSize="0.9rem"
          fontWeight="600"
          data-test="login-button"
          sx={{ '&:hover': { color: '#3772ff', textDecoration: 'none' } }}
          onClick={() => router.push('/auth/signin')}
        >
          Log In
        </Button>
        <Button
          background="#3772ff"
          fontWeight="600"
          color="white"
          fontSize="0.9rem"
          _hover={{ background: '#0e2aa8' }}
          data-test="signup-button"
          onClick={() => router.push('/auth/signup')}
        >
          Sign Up
        </Button>
      </Stack>
    </Box>
  )
}
