import Head from 'next/head'
import { withAuth } from '@/components/features/user/require-auth'

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Create Live Score Baby</title>
      </Head>
      <main>We can see if authenticated.</main>
    </>
  )
}

export default withAuth(Dashboard)
