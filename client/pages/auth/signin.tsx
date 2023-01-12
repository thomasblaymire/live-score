import { LoginForm } from '../../components/Forms/LoginForm'
import { Flex, Box } from '@chakra-ui/react'
import { getProviders, signIn, getSession, getCsrfToken } from 'next-auth/react'

function Signin({ providers }: any) {
  return (
    <Flex>
      <Box
        width="40vw"
        height="100vh"
        sx={{
          bgImage: `url(/images/football-login.jpg)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <Box width="60vw" height="100vh">
        <LoginForm />
        <div>
          {Object.values(providers).map((provider: any) => {
            return (
              <div key={provider.name}>
                <button onClick={() => signIn(provider.id)}>
                  Sign in with {provider.name}
                </button>
              </div>
            )
          })}
        </div>
      </Box>
    </Flex>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      providers: await getProviders(),
    },
  }
}

Signin.authPath = true

export default Signin
