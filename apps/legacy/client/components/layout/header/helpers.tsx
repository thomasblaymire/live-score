import { useEffect, useState } from 'react'
import { getProviders } from 'next-auth/react'

export const useNextAuthProvider = () => {
  const [providers, setProviders] = useState<any>()

  useEffect(() => {
    ;(async () => {
      const res = await getProviders()
      setProviders(res)
    })()
  }, [])

  return providers
}
