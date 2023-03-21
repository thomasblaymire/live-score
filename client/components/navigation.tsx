import NextLink from 'next/link'
import { Box, List, ListItem, LinkBox } from '@chakra-ui/layout'
import { useDisclosure, IconButton } from '@chakra-ui/react'
import { ModalElement } from './modal'
import { navItems } from '../data/static'
import { RxHamburgerMenu } from 'react-icons/rx'
import { useMediaQuery } from '@chakra-ui/react'

function renderNavItems() {
  return (
    <Box>
      <nav>
        <List
          display="flex"
          alignItems="center"
          alignSelf="stretch"
          width="100%"
          fontWeight="700"
          fontSize="0.9rem"
        >
          {navItems.map(({ id, name, href }) => (
            <ListItem
              key={id}
              sx={{
                '&:not(:last-of-type)': {
                  marginRight: '2rem',
                },
              }}
            >
              <LinkBox>
                <NextLink href={href} passHref style={{ color: 'white' }}>
                  {name}
                </NextLink>
              </LinkBox>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  )
}

export function Navigation(): JSX.Element {
  const [isTablet] = useMediaQuery('(min-width: 780px)')
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
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
        <div>{renderNavItems()}</div>
      )}
    </>
  )
}
