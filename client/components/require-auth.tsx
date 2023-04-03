import { useRouter } from 'next/router'
import { useCurrentUser } from '../hooks/useCurrentUser'

export const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const AuthenticatedComponent = (props: any) => {
    const router = useRouter()
    const { data: user, isFetching } = useCurrentUser()

    // If user data is not yet available and not fetching, redirect to home
    if (!user && !isFetching) {
      router.push('/')
      return null
    }

    // User data is available, render the wrapped component with the user data
    return <WrappedComponent {...props} currentUser={user} />
  }

  // Copy display name for easier debugging
  AuthenticatedComponent.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`

  return AuthenticatedComponent
}
