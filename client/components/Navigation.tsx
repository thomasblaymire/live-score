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
          fontWeight="800"
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
            />
          </Box>
          {isOpen && (
            <ModalElement isOpen={isOpen} onClose={onClose}>
              {renderNavItems()}
            </ModalElement>
          )}
        </>
      ) : (
        <div>{renderNavItems()}</div>
      )}
    </>
  )
}
