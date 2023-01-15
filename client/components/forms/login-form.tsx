import {
  Box,
  Flex,
  Input,
  Button,
  Stack,
  Text,
  FormControl,
  FormHelperText,
  FormErrorMessage,
  FormLabel,
  Center,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import { HiOutlineMail } from 'react-icons/hi'
import { signIn } from 'next-auth/react'
import { Provider, PROVIDERS } from '../../types'

interface LoginProps {
  providers: Provider[]
}

export const LoginForm = ({ providers }: LoginProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const isError = false

  function renderProviderIcon(name: string): JSX.Element {
    if (name === PROVIDERS.GITHUB) return <BsGithub />
    if (name === PROVIDERS.GOOGLE) return <BsGoogle />
    return <HiOutlineMail />
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
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
              <Link href="/" target="_blank" rel="noopener noreferrer">
                Terms & Conditions
              </Link>
              and
              <Link href="/" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </Link>
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
              {Object.values(providers).map((provider: Provider) => (
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
              ))}
            </Box>
          </form>
        </Box>
      </Flex>
    </Center>
  )
}
