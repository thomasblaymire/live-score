import { SigninForm } from '../../components/forms/signin-form'
import { Flex, Box, Center, Button, Stack } from '@chakra-ui/react'
import { getProviders, getSession } from 'next-auth/react'
import { Provider } from '../../types'
import { signIn } from 'next-auth/react'

interface SigninProps {
  providers: Provider[]
}

function Signin({ providers }: SigninProps) {
  return (
    <Flex>
      <Box
        width="45vw"
        height="100vh"
        sx={{
          bgImage: `url(/images/football-login.jpg)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <Center width="55vw">
        {/* <SigninForm providers={providers} /> */}
        <Box>
          {Object.values(providers).map((provider: Provider) => (
            <Box key={provider.name}>
              <Stack direction="row" spacing={4}>
                <Button
                  width="100%"
                  onClick={() => signIn(provider.id)}
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
      </Center>
    </Flex>
  )
}

export async function getServerSideProps(context: any) {
  const { req } = context
  const session = await getSession({ req })

  console.log('debug session', session)

  if (session) {
    return {
      redirect: { destination: '/' },
    }
  }
  return {
    props: {
      providers: await getProviders(),
    },
  }
}

Signin.authPath = true

export default Signin
