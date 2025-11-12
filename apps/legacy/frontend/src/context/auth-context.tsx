import { createContext, useContext, useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { API_URL } from '@/lib/constants'
import { getCookie } from '@/lib/cookie'
import { isClient } from '@/lib/api-helpers'

interface User {
  id: string
  email: string
  name: string
}

interface AuthProviderProps {
  children: React.ReactNode
}

interface AuthContextData {
  user: User | null
  setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextData>({
  user: null,
  setUser: () => {},
})

export const useAuthContext = () => useContext(AuthContext)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const token = isClient() ? getCookie('token') : undefined
  const api = axios.create({ baseURL: `${API_URL}`, withCredentials: true })

  const { data: fetchedUser } = useQuery<User | null>(
    ['currentUser'],
    async () => {
      if (!token) {
        return null
      }
      const response = await api.get<{ user: User }>('/current-user', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.data.user) {
        return null
      }
      return response.data.user
    },
    {
      initialData: null,
      enabled: !!token, // only fetch data if token is present
    }
  )

  useEffect(() => {
    if (fetchedUser) {
      setUser(fetchedUser)
    }
  }, [fetchedUser])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
