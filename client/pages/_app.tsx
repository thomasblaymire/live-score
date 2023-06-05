import { AuthProvider } from '../context/auth-context'
import { ModalProvider } from '../context/modal-context'
import { ChakraProvider } from '@chakra-ui/react'
import { Header } from '@/components/layout/header'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { theme } from '../styles/theme'
import type { AppProps } from 'next/app'
import type { NextComponentType } from 'next'
import { DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import 'reset-css'

const dm_Sans = DM_Sans({
  subsets: ['latin'],
  display: 'fallback',
  weight: ['400', '500', '700'],
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
          <AuthProvider>
            <ModalProvider>
              <main className={dm_Sans.className}>
                {Component.authPath ? (
                  <>
                    <Header isBasic={true} />
                    <Component {...pageProps} />
                  </>
                ) : (
                  <>
                    <Header />
                    <Component {...pageProps} />
                  </>
                )}
                <Analytics />
              </main>

              <ReactQueryDevtools initialIsOpen={false} />
            </ModalProvider>
          </AuthProvider>
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}
