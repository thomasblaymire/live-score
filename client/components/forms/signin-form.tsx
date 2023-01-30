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
import { BsGithub, BsGoogle } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { MdOutlineMail } from 'react-icons/md'
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { Provider, PROVIDERS } from '../../types'

interface SigninFormProps {
  providers: Provider[]
}

export const SigninForm = ({ providers }: SigninFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loadingProvider, setLoadingProvider] = useState(new Set())

  const router = useRouter()

  const isError = false

  function renderProviderIcon(name: string): JSX.Element {
    if (name === PROVIDERS.GITHUB) return <BsGithub />
    if (name === PROVIDERS.GOOGLE) return <FcGoogle />
    return <MdOutlineMail />
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    console.log('debug handleSubmit', {
      email,
      password,
    })

    const response = await fetch('http://localhost:3030/api/signin', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
    const data = await response.json()
    console.log('dbueeeee', data)
    // signIn()
    router.push('/')
  }

  const handleProviderSignin = (providerId: string) => {
    setLoadingProvider(() => new Set([providerId]))
    signIn(providerId)
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
              <FormControl isRequired isInvalid={isError} marginBottom="1rem">
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Email"
                  type="email"
                  data-test="signin-input-email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {isError && (
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isRequired isInvalid={isError}>
                <FormLabel>Password</FormLabel>
                <Input
                  placeholder="Password"
                  type="password"
                  data-test="signin-input-password"
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

            <Button
              type="submit"
              data-test="sign-in-submit"
              width="100%"
              marginTop="1rem"
              bg="green.500"
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
              {Object.values(providers).map((provider: Provider) => (
                <Box key={provider.name}>
                  <Stack direction="row" spacing={4}>
                    <Button
                      width="100%"
                      isLoading={loadingProvider.has(provider.id)}
                      spinner={
                        <Spinner
                          thickness="4px"
                          speed="0.65s"
                          emptyColor="gray.200"
                          color="#029143"
                          size="lg"
                        />
                      }
                      onClick={() => handleProviderSignin(provider.id)}
                      leftIcon={renderProviderIcon(provider.name)}
                      data-test="provider-sign-in-submit"
                      marginBottom="1rem"
                      border="solid 1.5px #7c8085"
                      background="none"
                      sx={{
                        '&:hover': {
                          bg: 'green.300',
                          border: 'solid 1.5px',
                          borderColor: 'green.300',
                        },
                      }}
                    >
                      {loadingProvider.has(provider.id) && <div>Loading..</div>}
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
