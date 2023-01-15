import { LoginForm } from '../../components/forms/login-form'
import { Flex, Box, Center } from '@chakra-ui/react'
import { getProviders } from 'next-auth/react'
import { Provider } from '../../types'

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
        <LoginForm providers={providers} />
      </Center>
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
