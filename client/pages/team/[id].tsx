import { useRouter } from 'next/router'

export default function Team() {
  const router = useRouter()
  const { code } = router.query

  return <h3>TEAM PAGE</h3>
}
