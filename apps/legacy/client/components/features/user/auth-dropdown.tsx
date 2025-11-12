import { useCallback } from 'react'
import { QueryClient } from '@tanstack/react-query'
import {
  Avatar,
  AvatarBadge,
  Button,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuDivider,
  Icon,
} from '@chakra-ui/react'
import { AiOutlineExport } from 'react-icons/ai'
import { authMenuItems } from '../../../data/static'
import { deleteCookie } from '@/lib/cookie'
import { useRouter } from 'next/router'
import Link from 'next/link'

interface AuthDropdownProps {
  user: User
}

export function AuthDropdown({ user }: AuthDropdownProps) {
  const router = useRouter()

  const signOut = useCallback(() => {
    const queryClient = new QueryClient()
    deleteCookie('token')
    queryClient.removeQueries({ queryKey: ['currentUser'], exact: true })
    queryClient.setQueryData<User | null>(['currentUser'], null)
  }, [])

  const handleSignout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    signOut()
    router.push('/')
  }

  return (
    <Menu>
      <MenuButton
        as={Button}
        padding="0"
        background="transparent"
        _hover={{ bg: 'none' }}
        _expanded={{ bg: 'none' }}
        _focus={{ boxShadow: 'none' }}
      >
        <Avatar
          name={user.name || 'Avatar'}
          src={user.image ? user.image : ''}
          size="sm"
        >
          <AvatarBadge boxSize="1em" bg="green.500" />
        </Avatar>
      </MenuButton>
      <MenuList
        background="#121212"
        style={{ border: 'solid 2px #212121' }}
        padding="0"
      >
        <MenuGroup>
          {authMenuItems.map(({ href, name, id, icon }) => (
            <MenuItem
              key={id}
              background="#121212"
              _hover={{ bg: '#313131' }}
              transition-duration="0.2s"
              paddingY="10px"
            >
              <Icon as={icon} fontSize="lg" mr={2} />
              <Link href={href} style={{ color: 'white', fontSize: '0.9rem' }}>
                {name}
              </Link>
            </MenuItem>
          ))}
        </MenuGroup>
        <MenuDivider />
        <MenuGroup>
          <MenuItem
            background="#121212"
            _hover={{ bg: '#313131' }}
            paddingY="10px"
          >
            <Icon as={AiOutlineExport} fontSize="lg" mr={2} />
            <Link
              href={`/api/auth/signout`}
              onClick={(e) => handleSignout(e)}
              style={{ color: 'white', fontSize: '0.9rem' }}
            >
              Sign out
            </Link>
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}
