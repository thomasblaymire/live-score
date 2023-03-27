import { Box, Flex } from '@chakra-ui/layout'
import {
  Avatar,
  WrapItem,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react'
import { AuthenticationButtons } from './header-auth'
import { Logo } from '../logo'
import { HeaderIcons } from './header-icons'
import { Navigation } from '../navigation'
import { AuthDropdown } from '../auth-dropdown'
import { useSession } from 'next-auth/react'
import { Search } from '../search'

export function Header(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data: session } = useSession()
  const [isTablet] = useMediaQuery('(min-width: 780px)')
  const [isMobile] = useMediaQuery('(max-width: 768px)')

  const handleSearchOpen = () => {
    onOpen()
  }

  return (
    <header>
      <Search isOpen={isOpen} onClose={onClose} />
      <Box
        height="4rem"
        position="sticky"
        padding={isMobile ? 4 : undefined}
        background="#121212"
      >
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
                <WrapItem>
                  <AuthDropdown user={session.user} />
                </WrapItem>
              </Flex>
            </Box>
          )}
        </Flex>
      </Box>
    </header>
  )
}
