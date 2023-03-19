import { GetServerSidePropsContext } from 'next'
import { SigninForm } from '../../components/forms/signin-form'
import { Box, Center } from '@chakra-ui/react'
import { getProviders, getSession } from 'next-auth/react'
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
} from '@chakra-ui/react'

interface SigninProps {
  providers: Provider[]
}

import {
  InputGroup,
  HStack,
  InputRightElement,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'

interface SigninProps {
  providers: Provider[]
}
function Signin({ providers }: SigninProps) {
  // return (
  //   <Flex>
  //     <Box
  //       width="45vw"
  //       height="100vh"
  //       sx={{
  //         bgImage: `url(/images/football-login.jpg)`,
  //         backgroundSize: 'cover',
  //         backgroundRepeat: 'no-repeat',
  //       }}
  //     />

  //     <Center width="55vw">
  //       <SigninForm providers={providers} />
  //     </Center>
  //   </Flex>
  // )

  console.log('debug in signin', providers)

  const [showPassword, setShowPassword] = useState(false)

  return (
    <Flex align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Box rounded={'lg'} bg="#121212" boxShadow={'lg'} color="white">
          <Stack align={'center'} color="white">
            <Heading
              fontSize={'2xl'}
              textAlign={'center'}
              fontFamily="inherit"
              paddingTop="2rem"
            >
              Signin
            </Heading>
          </Stack>
          <SigninForm providers={providers} />
        </Box>
      </Stack>
    </Flex>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context
  const session = await getSession({ req })

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
