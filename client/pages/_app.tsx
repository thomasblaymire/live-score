import { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Header } from '../components/header'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { theme } from '../styles/theme'
import type { AppProps } from 'next/app'
import type { NextComponentType } from 'next'
import { Poppins } from '@next/font/google'
import 'reset-css'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'fallback',
  weight: ['400', '500', '600', '700', '800', '900'],
})

type CustomAppProps = AppProps & {
  Component: NextComponentType & { authPath?: boolean }
}

const queryClient = new QueryClient()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider theme={theme}>
          <main className={poppins.className}>
            {Component.authPath ? (
              <Component {...pageProps} />
            ) : (
              <>
                <Header />
                <Component {...pageProps} />
              </>
            )}
          </main>

          <ReactQueryDevtools initialIsOpen={false} />
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}
