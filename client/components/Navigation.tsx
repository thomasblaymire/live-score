import NextLink from 'next/link'
import { Box, List, ListItem, LinkBox } from '@chakra-ui/layout'
import { navItems } from '../data/static'

export function Navigation() {
  return (
    <Box>
      <nav>
        <List
          display="flex"
          alignItems="center"
          alignSelf="stretch"
          width="100%"
          fontWeight="600"
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
