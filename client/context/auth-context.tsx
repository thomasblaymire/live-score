import { createContext, useContext, useState } from 'react'

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

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
