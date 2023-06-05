import { GetServerSidePropsContext } from 'next'
import { SigninForm } from '@/components/features/user/signin-form'
import { Box, Flex, Heading, Stack } from '@chakra-ui/react'
import { getProviders, getSession } from 'next-auth/react'

interface SigninProps {
  providers: Provider[]
}

import { Text } from '@chakra-ui/react'

interface SigninProps {
  providers: Provider[]
}
function Signin({ providers }: SigninProps) {
  return (
    <Box
      height={{ base: 'auto', md: '100vh' }}
      overflowY={{ base: 'unset', md: 'auto' }}
    >
      <Flex
        align={'center'}
        justify={'center'}
        style={{
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
        height={{ sm: '100%' }}
        background={{ base: '100%', sm: `url('/images/auth-hero.jpg')` }}
        width="100%"
      >
        <Box
          height="100%"
          width={{ base: '100%', sm: 'auto' }}
          px={{ md: 2 }}
          py={{ md: 2 }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            width={{ base: '100%', md: 'lg' }}
            bg="#121212"
            boxShadow={'lg'}
            rounded={'lg'}
            color="white"
            p={{ base: 6, md: 12 }}
          >
            <Stack
              align="center"
              color="white"
              paddingBottom={{ base: '2rem', sm: '0' }}
            >
              <Heading
                fontSize={{ base: 'xl', md: '2xl' }}
                textAlign={'center'}
                fontFamily="inherit"
                fontWeight="500"
                paddingTop={{ base: 0, sm: 0 }}
              >
                Welcome Back!
              </Heading>
              <Text
                color="gray.400"
                paddingBottom={{ base: 0, md: 0, lg: '2rem' }}
              >
                Please sign in to use your account
              </Text>
            </Stack>
            <SigninForm providers={providers} />
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context
  const session = await getSession({ req })

  try {
    const providers = await getProviders()
    console.log('debug providers in get server side', providers)
  } catch (err) {
    console.log('debug error', err)
  }

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
