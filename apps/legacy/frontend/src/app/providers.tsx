'use client'

import { AuthProvider } from '@/context/auth-context'
import { ModalProvider } from '@/context/modal-context'
import { theme } from '@/theme'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useEffect, useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 0,
            gcTime: 5 * 60 * 1000,
            retry: 3,
          },
        },
      })
  )

  // Mock server initialization
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
      import('@/mocks').then(({ initMockServer }) => {
        initMockServer()
      })
    }
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
      <ModalProvider>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </ModalProvider>
      </QueryClientProvider>
    </ChakraProvider>
  )
}