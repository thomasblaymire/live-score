'use client'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <div className="layout-wrapper">
        <Sidebar />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}