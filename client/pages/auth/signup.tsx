import { LoginForm } from '../../components/Forms/LoginForm'
import { Flex, Box } from '@chakra-ui/react'

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
        Signup
      </Box>
    </Flex>
  )
}

Signup.authPath = true

export default Signup
