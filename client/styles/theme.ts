import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        color: 'gray.600',
        lineHeight: 'tall',
        background: '#161616',
      },
      fonts: {
        heading: `'Inter', sans-serif`,
        body: `'Inter', sans-serif`,
      },
      a: {
        color: 'teal.500',
      },
    },
  },
  colors: {
    gray: {
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },
  components: {
    Button: {
      variants: {
        link: {
          ':focus': {
            outline: 'none',
            boxShadow: 'none',
          },
        },
      },
    },
  },
})
