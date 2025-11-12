import { Box, Stack, Button } from '@chakra-ui/react'

interface AuthenticationButtonsProps {
  onLoginOpen: () => void
  onSignupOpen: () => void
}

export function AuthenticationButtons({
  onLoginOpen,
  onSignupOpen,
}: AuthenticationButtonsProps) {
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
          onClick={onLoginOpen}
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
          onClick={onSignupOpen}
        >
          Sign Up
        </Button>
      </Stack>
    </Box>
  )
}
