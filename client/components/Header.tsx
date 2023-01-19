import { useRouter } from 'next/router'
import { Box, Flex } from '@chakra-ui/layout'
import { Avatar, WrapItem, Stack, Button } from '@chakra-ui/react'
import { Logo } from './logo'
import { Navigation } from './navigation'
import { AuthDropdown } from './auth-dropdown'
import { useSession } from 'next-auth/react'
import { useMediaQuery } from '@chakra-ui/react'

export function Header() {
  const router = useRouter()
  const { data: session } = useSession()
  const [isTablet] = useMediaQuery('(min-width: 780px)')

  return (
    <header>
      <Box height="4rem" position="sticky" background="#121212">
        <Flex
          justifyContent="space-between"
          width={{ sm: '1300px' }}
          margin="0 auto"
          height="100%"
          alignItems="center"
        >
          <Box>
            <Logo />
          </Box>

          <Navigation />

          {!session && isTablet && (
            <Box>
              <Stack direction="row" spacing={6} align="center">
                <Button
                  colorScheme="gray"
                  variant="link"
                  onClick={() => router.push('/api/auth/signin')}
                >
                  Log In
                </Button>
                <Button
                  colorScheme="gray"
                  onClick={() => router.push('/api/auth/signup')}
                >
                  Sign Up
                </Button>
              </Stack>
            </Box>
          )}

          {session?.user && isTablet && (
            <Box>
              <Flex alignItems="center">
                {session.user.image ? (
                  <WrapItem>
                    <AuthDropdown user={session.user} />
                  </WrapItem>
                ) : (
                  <WrapItem>
                    <Avatar />
                  </WrapItem>
                )}
              </Flex>
            </Box>
          )}
        </Flex>
      </Box>
    </header>
  )
}
