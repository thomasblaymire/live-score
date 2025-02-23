import { Header } from '@/components/layout/header'
import { Analytics } from '@vercel/analytics/react'
import { DM_Sans } from 'next/font/google'
import 'reset-css'
import { Providers } from './providers'

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'fallback',
  weight: ['400', '500', '700'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={dmSans.className}>
      <body>
        <Providers>
          <main>
            <Header />
            {children}
            <Analytics />
          </main>
        </Providers>
      </body>
    </html>
  )
}