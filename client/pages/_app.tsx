import { ChakraProvider } from '@chakra-ui/react'
import { Header } from '../components/header'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { SessionProvider } from 'next-auth/react'
import { theme } from '../styles/theme'
import type { AppProps } from 'next/app'
import type { NextComponentType } from 'next'
import { Inter } from '@next/font/google'
import 'reset-css'

const inter = Inter({ subsets: ['latin'] })

const queryClient = new QueryClient()

type CustomAppProps = AppProps & {
  Component: NextComponentType & { authPath?: boolean }
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SessionProvider session={session}>
          <main className={inter.className}>
            {Component.authPath ? (
              <Component {...pageProps} />
            ) : (
              <>
                <Header />
                <Component {...pageProps} />
              </>
            )}
          </main>
        </SessionProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </ChakraProvider>
    </QueryClientProvider>
  )
}
