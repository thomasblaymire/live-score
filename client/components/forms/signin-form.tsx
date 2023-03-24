import {
  Box,
  Flex,
  Input,
  Heading,
  Button,
  Stack,
  FormControl,
  FormHelperText,
  FormErrorMessage,
  FormLabel,
  Center,
  Spinner,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from 'next/router'

import { signIn } from 'next-auth/react'
import { AuthProviders } from './auth-providers'

interface SigninFormProps {
  providers: Provider[]
}

export const SigninForm = ({ providers }: SigninFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<unknown>(null)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      setLoading(true)
      const success = await signIn('credentials', { email, password })
      if (success) {
        router.push('/')
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Sign in error:', error)
        setError(error)
      }
    } finally {
      setLoading(false)
    }
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
                {error && (
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  placeholder="Password"
                  type="password"
                  data-test="signin-input-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error ? (
                  <FormHelperText>
                    Enter the email you would like to receive the newsletter on.
                  </FormHelperText>
                ) : (
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
              </FormControl>
            </Stack>

            <Button
              type="submit"
              data-test="sign-in-submit"
              width="100%"
              marginTop="1rem"
              bg="green.500"
              isLoading={loading}
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
