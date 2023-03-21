import { SignupForm } from '../../components/forms/signup-form'
import { Box } from '@chakra-ui/react'
import { Flex, Heading, Stack } from '@chakra-ui/react'

function Signup() {
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
              Sign Up
            </Heading>
          </Stack>
          <SignupForm />
        </Box>
      </Stack>
    </Flex>
  )
}

Signup.authPath = true

export default Signup
