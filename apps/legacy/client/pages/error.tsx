import { useRouter } from 'next/router'

function ErrorPage() {
  const router = useRouter()
  const errorMessage = router.query.message

  return (
    <div>
      <h1>Error</h1>
      <p>{errorMessage || 'An unknown error occurred'}</p>
    </div>
  )
}

export default ErrorPage
