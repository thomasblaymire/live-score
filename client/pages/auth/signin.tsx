import { LoginForm } from '../../components/forms/login-form'
import { Flex, Box, Stack, Button, Center } from '@chakra-ui/react'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import { HiOutlineMail } from 'react-icons/hi'
import { getProviders, signIn, getSession, getCsrfToken } from 'next-auth/react'

function Signin({ providers }: any) {
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
