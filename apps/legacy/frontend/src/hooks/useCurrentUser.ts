import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { API_URL } from '@/lib/constants'

interface User {
  id: string
  email: string
  name: string
}

export function useCurrentUser(fetchUser: boolean = false) {
  const api = axios.create({ baseURL: `${API_URL}`, withCredentials: true })

  return useQuery<User | null>(
    ['currentUser'],
    async () => {
      if (!fetchUser) {
        return null
      }
      const response = await api.get<{ user: User }>('/current-user')
      if (!response.data.user) {
        return null
      }
      return response.data.user
    },
    {
      initialData: null, // set initial value to null
      enabled: fetchUser, // only fetch data if fetchUser is true
    }
  )
}
