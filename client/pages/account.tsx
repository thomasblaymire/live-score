import { withAuth } from '../components/require-auth'

const Account = ({ currentUser }: { currentUser: User }) => {
  return (
    <div>
      <h1>Protected Page</h1>
      <p>Welcome, {currentUser.name}!</p>
    </div>
  )
}

export default withAuth(Account)
