import {
  Box,
  Flex,
  Input,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Center,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ErrorState } from '../error'
import { AuthProviders } from './auth-providers'
import { useRouter } from 'next/router'
import { useAuth } from '../../hooks/useAuth'
import { setCookie } from '../../lib/cookie'
import { useAuthContext } from '../../context/auth-context'

interface SigninFormProps {
  providers: Provider[]
}

export const SigninForm = ({ providers }: SigninFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = useAuthContext()

  const router = useRouter()

  const { signInUser, signInLoading, onSignUpError } = useAuth({
    onSignInSuccess: (data) => {
      setCookie('token', data.token, { path: '/' })
      setUser(data.user)
      router.push('/')
    },
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await signInUser({ email, password })
  }

  return (
    <Center color="white">
      <Flex justify="center" align="center">
        <Box
          borderRadius="6px"
          width="450px"
          padding="2rem"
          background="#121212"
        >
          {onSignUpError ? <ErrorState /> : null}

          <form onSubmit={handleSubmit}>
            <Stack paddingBottom="25px">
              <FormControl isRequired marginBottom="1rem">
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Email"
                  type="email"
                  data-test="signin-input-email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  placeholder="Password"
                  type="password"
                  data-test="signin-input-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
            </Stack>

            <Button
              type="submit"
              data-test="sign-in-submit"
              width="100%"
              marginTop="1rem"
              bg="green.500"
              isLoading={signInLoading}
              sx={{
                '&:hover': {
                  bg: 'green.300',
                },
              }}
            >
              Login
            </Button>

            <Box
              width="100%"
              display="flex"
              alignItems="center"
              flexDirection="row"
              text-transform="uppercase"
              border="none"
              fontSize="12px"
              fontWeight="500"
              margin="0"
              padding="2rem 0"
              sx={{
                '&::before': {
                  content: '""',
                  borderBottom: '1px solid #7c8085',
                  flex: '1 0 auto',
                  margin: '0',
                },
                '&::after': {
                  content: '""',
                  borderBottom: '1px solid #7c8085',
                  flex: '1 0 auto',
                  margin: '0',
                },
              }}
            >
              <span
                style={{
                  textAlign: 'center',
                  flex: '0.2 0 auto',
                  margin: 0,
                  fontSize: '0.85rem',
                }}
              >
                OR
              </span>
            </Box>

            <Box>
              <AuthProviders providers={providers} />
            </Box>
          </form>
        </Box>
      </Flex>
    </Center>
  )
}
