import { requireAuth } from '../lib/require-auth'

export default function Account() {
  return <div>Account</div>
}

export async function getServerSideProps(context: any) {
  return requireAuth(context, ({ session }: any) => {
    return {
      props: { session },
    }
  })
}
