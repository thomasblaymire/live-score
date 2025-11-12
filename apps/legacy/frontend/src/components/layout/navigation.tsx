'use client'

import { ModalElement } from '@/components/ui/modal'
import { navItems } from '@/data/static'
import { Box, Flex, IconButton, List, ListItem, useDisclosure, useMediaQuery } from '@chakra-ui/react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'

interface NavigationProps {
  user: User | null
}

export function Navigation({ user }: NavigationProps) {
  const [isTablet] = useMediaQuery('(min-width: 780px)')
  const [activeItem, setActiveItem] = useState<null | number>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const pathname = usePathname()

  const renderNavItems = () => {
    const isHomeRoute = pathname === '/'
    const activeColor = isHomeRoute || activeItem === null ? 'white' : '#0e2aa8'

    return (
      <List
        display="flex"
        alignItems="center"
        fontWeight="700"
        fontSize="0.9rem"
        flexDirection={!isTablet ? 'column' : 'row'}
      >
        {navItems.map(({ id, name, href, icon, secure }) => {
          if (secure && !user) return null
          return (
            <ListItem
              key={id}
              sx={{
                '&:not(:last-of-type)': {
                  marginRight: isTablet ? '2rem' : '0',
                  marginBottom: !isTablet ? '2rem' : '0',
                },
              }}
            >
              <NextLink href={href}>
                <Box
                  color={activeItem === id ? activeColor : 'white'}
                  textDecoration="none"
                  cursor="pointer"
                  _hover={{
                    color: '#3772ff',
                    transition: 'color .2s',
                  }}
                  onClick={() => {
                    setActiveItem(id)
                    !isTablet && onClose()
                  }}
                >
                  {icon}
                  {name}
                </Box>
              </NextLink>
            </ListItem>
          )
        })}
      </List>
    )
  }

  return (
    <Flex alignItems="center">
      {!isTablet ? (
        <>
          <IconButton
            aria-label="Mobile Navigation"
            icon={<RxHamburgerMenu />}
            onClick={onOpen}
            minWidth="initial"
            data-test="hamburger-button"
            background="transparent"
            _hover={{
              bg: 'transparent',
            }}
            fontSize="20px"
            color="white"
          />
          {isOpen && (
            <ModalElement isOpen={isOpen} onClose={onClose}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
                {renderNavItems()}
              </Box>
            </ModalElement>
          )}
        </>
      ) : (
        <Box>{renderNavItems()}</Box>
      )}
    </Flex>
  )
}