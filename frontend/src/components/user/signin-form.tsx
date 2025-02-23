import {
  Box,
  Text,
  Input,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Center,
} from '@chakra-ui/react'
import { useState } from 'react'
import { AuthProviders } from './auth-providers'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'
import { setCookie } from '@/lib/cookie'
import { useAuthContext } from '@/context/auth-context'
import { InputField } from '@/components/ui/input'

interface SigninFormProps {
  providers?: Provider[]
  onLoginSuccess?: () => void
}

export const SigninForm = ({ providers, onLoginSuccess }: SigninFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = useAuthContext()
  const router = useRouter()

  const { signInUser, signInLoading, signInError } = useAuth({
    onSignInSuccess: (data) => {
      setCookie('token', data.token, { path: '/' })
      setUser(data.user)
      router.push('/')

      if (onLoginSuccess) onLoginSuccess()
    },
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await signInUser({ email, password })
  }

  return (
    <Center color="white">
      <Box borderRadius="6px" width={{ base: '100%', md: '450px' }}>
        <form onSubmit={handleSubmit}>
          <Stack paddingBottom="25px">
            <FormControl isRequired marginBottom="1rem">
              <FormLabel fontSize="0.9rem">Email</FormLabel>
              <InputField
                type="email"
                placeholder="Email"
                dataTest="signin-input-email"
                value={email}
                setValue={setEmail}
                error={signInError}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="0.9rem">Password</FormLabel>
              <InputField
                type="password"
                placeholder="Password"
                dataTest="signin-input-password"
                value={password}
                setValue={setPassword}
                error={signInError}
              />
            </FormControl>
          </Stack>

          {signInError && (
            <Box>
              <Text color="#ff1749" fontSize="0.8rem">
                {signInError.message}
              </Text>
            </Box>
          )}

          <Button
            type="submit"
            data-test="sign-in-submit"
            width="100%"
            marginTop="1rem"
            bg="#3772ff"
            isLoading={signInLoading}
            _hover={{ background: '#0e2aa8' }}
          >
            Login
          </Button>

          {providers ? (
            <Box>
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
              <AuthProviders providers={providers} />
            </Box>
          ) : null}
        </form>
      </Box>
    </Center>
  )
}
