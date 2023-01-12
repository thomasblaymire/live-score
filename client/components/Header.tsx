import Image from 'next/image'
import Link from 'next/link'
import { Box, Flex } from '@chakra-ui/layout'
import { Avatar, WrapItem } from '@chakra-ui/react'
import { Navigation } from './Navigation'
import { useRouter } from 'next/router'
import { AuthDropdown } from './AuthDropdown'
import { useSession } from 'next-auth/react'

export function Header() {
  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname

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
              <>
                <Link href="/api/auth/signup" legacyBehavior>
                  <a data-active={isActive('/api/auth/signup')}>Signup</a>
                </Link>
                <Link href="/api/auth/signin" legacyBehavior>
                  <a data-active={isActive('/api/auth/signin')}>Log in</a>
                </Link>
              </>
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
