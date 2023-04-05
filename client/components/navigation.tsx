import { useState } from 'react'
import { Box, Flex, List, ListItem } from '@chakra-ui/layout'
import { useDisclosure, IconButton } from '@chakra-ui/react'
import { ModalElement } from './modal'
import { navItems } from '../data/static'
import { RxHamburgerMenu } from 'react-icons/rx'
import { useMediaQuery } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

export function Navigation() {
  const [isTablet] = useMediaQuery('(min-width: 780px)')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [activeItem, setActiveItem] = useState<null | number>(null)
  const router = useRouter()

  const renderNavItems = () => {
    const isHomeRoute = router.pathname === '/'
    const activeColor = isHomeRoute || activeItem === null ? 'white' : '#029143'
    return (
      <List
        display="flex"
        alignItems="center"
        fontWeight="700"
        fontSize="0.9rem"
      >
        {navItems.map(({ id, name, href, icon }) => (
          <ListItem
            key={id}
            sx={{
              '&:not(:last-of-type)': {
                marginRight: '2rem',
              },
            }}
          >
            <NextLink href={href} passHref>
              <Box
                color={activeItem === id ? activeColor : 'white'}
                textDecoration="none"
                cursor="pointer"
                _hover={{
                  color: '#029143',
                }}
                onClick={() => setActiveItem(id)}
              >
                {icon}
                {name}
              </Box>
            </NextLink>
          </ListItem>
        ))}
      </List>
    )
  }

  return (
    <Flex alignItems="center">
      {!isTablet ? (
        <>
          <Box>
            <IconButton
              aria-label="Mobile Navigation"
              icon={<RxHamburgerMenu />}
              onClick={onOpen}
              data-test="hamburger-button"
              background="#313131"
              _hover={{
                bg: '#313131',
              }}
            />
          </Box>
          {isOpen && (
            <Box>
              <ModalElement isOpen={isOpen} onClose={onClose}>
                {renderNavItems()}
              </ModalElement>
            </Box>
          )}
        </>
      ) : (
        <Box>{renderNavItems()}</Box>
      )}
    </Flex>
  )
}
