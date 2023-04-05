import {
  Box,
  Flex,
  Input,
  Button,
  Stack,
  FormControl,
  FormHelperText,
  FormErrorMessage,
  FormLabel,
  Center,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../hooks/useAuth'
import { setCookie } from '../../lib/cookie'

export const SignupForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const { signUpUser, signUpLoading, onSignUpError } = useAuth({
    onSignUpSuccess: (data) => {
      setCookie('token', data.token, { path: '/' })
      router.push('/')
    },
    onSignUpError: (error) => {
      console.log('debug signup hook error', error)
    },
  })

  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await signUpUser({ email, password, name })
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
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Name"
                  type="name"
                  data-test="signin-input-name"
                  onChange={(e) => setName(e.target.value)}
                />
                {onSignUpError && (
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isRequired marginBottom="1rem">
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Email"
                  type="email"
                  data-test="signin-input-email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {onSignUpError && (
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
                {onSignUpError ? (
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
              isLoading={signUpLoading}
              sx={{
                '&:hover': {
                  bg: 'green.300',
                },
              }}
            >
              Signup
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
          </form>
        </Box>
      </Flex>
    </Center>
  )
}
