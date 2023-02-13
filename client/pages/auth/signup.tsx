import { Flex, Box } from '@chakra-ui/react'
import {
  Button,
  Checkbox,
  HStack,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Link,
  Stack,
  Text,
  Image,
} from '@chakra-ui/react'

const Signup = () => {
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
        <Stack spacing={4}>
          <HStack>
            <Box>
              <FormControl id="firstName" isRequired>
                <FormLabel>First Name</FormLabel>
                <Input type="text" />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="lastName">
                <FormLabel>Last Name</FormLabel>
                <Input type="text" />
              </FormControl>
            </Box>
          </HStack>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              {/* <Input type={showPassword ? 'text' : 'password'} /> */}
            </InputGroup>
          </FormControl>
          <Stack spacing={8} pt={6}>
            <Button
              loadingText="Submitting"
              size="md"
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
            >
              Sign up
            </Button>
          </Stack>
          <Stack pt={6}>
            <Text align={'center'}>
              Already a user?{' '}
              <Link href="/auth/signin" color={'blue.400'}>
                Signin
              </Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Flex>
  )
}

Signup.authPath = true

export default Signup
