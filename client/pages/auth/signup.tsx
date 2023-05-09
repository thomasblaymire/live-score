import { Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { SignupForm } from '@/components/features/user/signup-form'
import { Box } from '@chakra-ui/react'

function Signup() {
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
                Create an account
              </Heading>
              <Text
                color="gray.400"
                paddingBottom={{ base: 0, md: 0, lg: '2rem' }}
              >
                To sign up please complete the form below.
              </Text>
            </Stack>
            <SignupForm />
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

Signup.authPath = true

export default Signup
