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
} from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import { HiOutlineMail } from 'react-icons/hi'
import { signIn } from 'next-auth/react'
import { Provider, PROVIDERS } from '../../types'

interface SigninFormProps {
  providers: Provider[]
}

export const SigninForm = ({ providers }: SigninFormProps) => {
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
        <Box
          borderRadius="6px"
          width="450px"
          padding="2rem"
          background="#121212"
        >
          <Heading
            fontSize="2rem"
            lineHeight="4rem"
            marginBottom="1.5rem"
            textAlign="center"
          >
            Login
          </Heading>
          <form onSubmit={handleSubmit}>
            <Stack paddingBottom="25px">
              <FormControl isInvalid={isError} marginBottom="1rem">
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Email"
                  type="email"
                  height="50px"
                  data-test="signin-input-email"
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
              bg="#029143"
              width="100%"
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
                      onClick={() => signIn(provider.id)}
                      leftIcon={renderProviderIcon(provider.name)}
                      data-test="sign-in-submit"
                      marginBottom="1rem"
                      border="solid 1.5px #7c8085"
                      background="none"
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
