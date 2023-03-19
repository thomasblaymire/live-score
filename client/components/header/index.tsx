import { useRef } from 'react'
import { Box, Flex } from '@chakra-ui/layout'
import { Avatar, WrapItem, useDisclosure } from '@chakra-ui/react'
import { AuthenticationButtons } from './header-auth'
import { Logo } from '../logo'
import { HeaderIcons } from './header-icons'
import { Navigation } from '../navigation'
import { AuthDropdown } from '../auth-dropdown'
import { useSession } from 'next-auth/react'
import { useMediaQuery } from '@chakra-ui/react'
import { Search } from '../search'

function AvatarWithDropdown({ user }: { user: any }) {
  return (
    <WrapItem>
      <AuthDropdown user={user} />
    </WrapItem>
  )
}

function UserAvatar() {
  return (
    <WrapItem>
      <Avatar />
    </WrapItem>
  )
}

export function Header(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data: session } = useSession()
  const [isTablet] = useMediaQuery('(min-width: 780px)')

  const handleSearchOpen = () => {
    onOpen()
  }

  return (
    <header>
      <Search isOpen={isOpen} onClose={onClose} />
      <Box height="4rem" position="sticky" background="#121212">
        <Flex
          justifyContent="space-between"
          width={{
            md: '720px',
            lg: '960px',
            xl: '1200px',
          }}
          margin="0 auto"
          height="100%"
          alignItems="center"
        >
          <Box>
            <Logo />
          </Box>

          <Navigation />

          {!session && isTablet && <AuthenticationButtons />}

          {session?.user && isTablet && (
            <Box>
              <Flex alignItems="center">
                <HeaderIcons handleSearchOpen={handleSearchOpen} />
                {session?.user?.image ? (
                  <AvatarWithDropdown user={session.user} />
                ) : (
                  <UserAvatar />
                )}
              </Flex>
            </Box>
          )}
        </Flex>
      </Box>
    </header>
  )
}
