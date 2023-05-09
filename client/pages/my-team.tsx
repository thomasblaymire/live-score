import { withAuth } from '@/components/features/user/require-auth'

const MyTeam = () => {
  return (
    <div>
      <h1>Protected Page</h1>
    </div>
  )
}

export default withAuth(MyTeam)
