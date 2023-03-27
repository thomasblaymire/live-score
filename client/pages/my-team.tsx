import { requireAuth } from '../lib/require-auth'

export default function MyTeam() {
  return <div>My Team </div>
}

export async function getServerSideProps(context: any) {
  return requireAuth(context, ({ session }: any) => {
    return {
      props: { session },
    }
  })
}
