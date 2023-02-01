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
} from '@chakra-ui/react'
import { authMenuItems } from '../data/static'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

interface User {
  name: string
  email: string
  image: string
}

interface AuthDropdownProps {
  user: User
}

export function AuthDropdown({ user }: AuthDropdownProps) {
  const handleSignout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    signOut()
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
        <Avatar name={user.name || 'Avatar'} src={user.image} size="sm">
          <AvatarBadge boxSize="1em" bg="green.500" />
        </Avatar>
      </MenuButton>
      <MenuList>
        <MenuGroup>
          {authMenuItems.map(({ href, name, id }) => (
            <MenuItem key={id}>
              <Link href={href}>{name}</Link>
            </MenuItem>
          ))}
        </MenuGroup>
        <MenuDivider />
        <MenuGroup>
          <MenuItem>
            <Link href={`/api/auth/signout`} onClick={(e) => handleSignout(e)}>
              Sign out
            </Link>
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}
