import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { API_URL } from '../lib/constants'

interface User {
  id: string
  email: string
  name: string
}

export function useCurrentUser() {
  const api = axios.create({ baseURL: `${API_URL}`, withCredentials: true })

  return useQuery<User | null>(
    ['currentUser'],
    async () => {
      const response = await api.get<{ user: User }>('/current-user')
      if (!response.data.user) {
        return null
      }
      return response.data.user
    },
    {
      initialData: null, // set initial value to null
    }
  )
}
