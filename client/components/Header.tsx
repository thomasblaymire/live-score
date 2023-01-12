import Image from 'next/image'
import { useRouter } from 'next/router'
import { Box, Flex } from '@chakra-ui/layout'
import { Avatar, WrapItem, Stack, Button } from '@chakra-ui/react'
import { Navigation } from './Navigation'
import { AuthDropdown } from './AuthDropdown'
import { useSession } from 'next-auth/react'

export function Header() {
  const router = useRouter()
  const { data: session } = useSession()

  return (
    <header>
      <Box width="100%" height="4rem" position="sticky" background="#111111">
        <Flex
          justifyContent="space-between"
          height="100%"
          alignItems="center"
          paddingX="4rem"
        >
          <Box>
            <Image
              src="/logo.svg"
              alt="Live Score Logo"
              width={170}
              height={50}
              priority
            />
          </Box>
          <Navigation />
          <Box>
            {!session && (
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
            )}
            {session?.user && (
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
            )}
          </Box>
        </Flex>
      </Box>
    </header>
  )
}
