import {
  Box,
  Flex,
  Input,
  Button,
  InputGroup,
  Stack,
  Text,
  FormControl,
  FormHelperText,
  FormErrorMessage,
  FormLabel,
  Center,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import { HiOutlineMail } from 'react-icons/hi'
import { getProviders, signIn, getSession, getCsrfToken } from 'next-auth/react'

import { useState } from 'react'

export const LoginForm = ({ providers }: any) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const isError = false

  function renderProviderIcon(name: any) {
    if (name === 'GitHub') return <BsGithub />
    if (name === 'Google') return <BsGoogle />
    return <HiOutlineMail />
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    // await auth({ email, password })
    signIn()
    router.push('/')
  }

  return (
    <Center color="white">
      <Flex justify="center" align="center" height="100vh">
        <Box padding="50px" borderRadius="6px" minWidth="500px">
          <Text fontSize="2rem" lineHeight="4rem" marginBottom="1.5rem">
            Login
          </Text>
          <form onSubmit={handleSubmit}>
            <Stack paddingBottom="25px">
              <FormControl isInvalid={isError} marginBottom="1rem">
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Email"
                  type="email"
                  height="50px"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {isError && (
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={isError}>
                <FormLabel>Password</FormLabel>
                <Input
                  placeholder="Password"
                  type="password"
                  height="50px"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {isError ? (
                  <FormHelperText>
                    Enter the email you would like to receive the newsletter on.
                  </FormHelperText>
                ) : (
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
              </FormControl>
            </Stack>

            <Text marginBottom="2rem">
              By continuing, you agree to the
              <a href="/" target="_blank" rel="noopener noreferrer">
                Terms & Conditions
              </a>
              and
              <a href="/" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
              .
            </Text>

            <Button
              type="submit"
              bg="green.500"
              sx={{
                '&:hover': {
                  bg: 'green.300',
                },
              }}
            >
              Login
            </Button>

            <Box>
              {Object.values(providers).map((provider: any) => {
                return (
                  <Box key={provider.name}>
                    <Stack direction="row" spacing={4}>
                      <Button
                        width="100%"
                        onClick={() => signIn(provider.id)}
                        leftIcon={renderProviderIcon(provider.name)}
                        colorScheme="teal"
                        variant="solid"
                        marginBottom="1rem"
                      >
                        Sign in with {provider.name}
                      </Button>
                    </Stack>
                  </Box>
                )
              })}
            </Box>
          </form>
        </Box>
      </Flex>
    </Center>
  )
}
