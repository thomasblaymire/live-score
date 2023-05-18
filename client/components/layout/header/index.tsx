import { useEffect } from 'react'
import { Box, Flex } from '@chakra-ui/layout'
import { WrapItem, useDisclosure, useMediaQuery } from '@chakra-ui/react'
import { AuthenticationButtons } from './header-auth'
import { useNextAuthProvider } from './helpers'
import { Logo } from '@/components/ui/logo'
import { HeaderIcons } from './header-icons'
import { Navigation } from '../navigation'
import { AuthDropdown } from '@/components/features/user/auth-dropdown'
import { Search } from '@/components/features/full-search'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useAuthContext } from '@/context/auth-context'
import { HeaderBasic } from './header-basic'
import { AuthModal } from '@/components/features/user/auth-modal'
import { SigninForm } from '@/components/features/user/signin-form'
import { SignupForm } from '@/components/features/user/signup-form'

interface HeaderProps {
  isBasic?: boolean
}

export function Header({ isBasic }: HeaderProps) {
  const { user, setUser } = useAuthContext()
  const { data: fetchedUser } = useCurrentUser()
  const providers = useNextAuthProvider()

  useEffect(() => {
    if (fetchedUser) {
      setUser(fetchedUser)
    }
  }, [fetchedUser, setUser])

  const {
    isOpen: isSearchOpen,
    onOpen: onSearchOpen,
    onClose: onSearchClose,
  } = useDisclosure()
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure()
  const {
    isOpen: isSignupOpen,
    onOpen: onSignupOpen,
    onClose: onSignupClose,
  } = useDisclosure()
  const [isTablet] = useMediaQuery('(min-width: 780px)')
  const [isMobile] = useMediaQuery('(max-width: 768px)')

  if (isBasic) {
    return <HeaderBasic />
  }

  return (
    <header>
      <Search isOpen={isSearchOpen} onClose={onSearchClose} />
      <Box
        height={isMobile ? '4rem' : '5rem'}
        position="sticky"
        padding={isMobile ? 4 : undefined}
        borderBottom="solid 1px #353945"
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

          <Navigation user={user} />

          {!user && isTablet && (
            <AuthenticationButtons
              onLoginOpen={onLoginOpen}
              onSignupOpen={onSignupOpen}
            />
          )}

          {user && isTablet && (
            <Box>
              <Flex alignItems="center">
                <HeaderIcons handleSearchOpen={onSearchOpen} />
                <WrapItem>
                  <AuthDropdown user={user} />
                </WrapItem>
              </Flex>
            </Box>
          )}
        </Flex>

        <AuthModal isOpen={isLoginOpen} onClose={onLoginClose} title="Sign In">
          <SigninForm providers={providers} onLoginSuccess={onLoginClose} />
        </AuthModal>

        <AuthModal
          isOpen={isSignupOpen}
          onClose={onSignupClose}
          title="Sign Up"
        >
          <SignupForm />
        </AuthModal>
      </Box>
    </header>
  )
}
