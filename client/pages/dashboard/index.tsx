import type { NextPage } from 'next'
import Head from 'next/head'
import { requireAuth } from '../../lib/require-auth'

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Live Score Baby</title>
      </Head>
      <main>We can see if authenticated.</main>
    </>
  )
}

export async function getServerSideProps(context: any) {
  return requireAuth(context, ({ session }: any) => {
    return {
      props: { session },
    }
  })
}

export default Dashboard
