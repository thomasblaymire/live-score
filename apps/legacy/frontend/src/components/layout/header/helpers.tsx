import { getProviders } from 'next-auth/react'
import { useEffect, useState } from 'react'

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
