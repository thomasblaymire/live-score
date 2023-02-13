import { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Header } from '../components/header'
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { SessionProvider } from 'next-auth/react'
import { theme } from '../styles/theme'
import type { AppProps } from 'next/app'
import type { NextComponentType } from 'next'
import { Nunito } from '@next/font/google'
import 'reset-css'

const nunito = Nunito({ subsets: ['latin'] })

type CustomAppProps = AppProps & {
  Component: NextComponentType & { authPath?: boolean }
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider theme={theme}>
          <SessionProvider session={session}>
            <main className={nunito.className}>
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
      </Hydrate>
    </QueryClientProvider>
  )
}
