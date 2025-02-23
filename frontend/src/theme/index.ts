import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'gray.900',
      }
    }
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  }
})