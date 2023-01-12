import {
  Box,
  Flex,
  Input,
  Button,
  InputGroup,
  Stack,
  Text,
  Center,
} from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    // await auth({ email, password })
    signIn()
    router.push('/')
  }

  return (
    <Center color="white">
      <Flex justify="center" align="center" height="100vh">
        <Box padding="50px" borderRadius="6px" minWidth="500px" height="400px">
          <Text fontSize="2rem" lineHeight="4rem" marginBottom="1.5rem">
            Login
          </Text>
          <form onSubmit={handleSubmit}>
            <Stack paddingBottom="25px">
              <InputGroup marginBottom="15px">
                <Input
                  placeholder="Email"
                  type="email"
                  height="50px"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
              <InputGroup>
                <Input
                  placeholder="Password"
                  type="password"
                  height="50px"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
            </Stack>

            <Text marginBottom="2rem">
              By continuing, you agree to the{' '}
              <a
                href="https://www.okta.com/auth0-pss-self-service/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Self Service PSS
              </a>{' '}
              and{' '}
              <a
                href="https://www.okta.com/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
              >
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
          </form>
        </Box>
      </Flex>
    </Center>
  )
}
