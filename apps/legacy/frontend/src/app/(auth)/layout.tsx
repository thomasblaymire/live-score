import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header isBasic />
      <main>{children}</main>
      <Footer />
    </>
  )
}