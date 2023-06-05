import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { API_URL } from '@/lib/constants'

interface AuthParams {
  email: string
  password: string
}

interface SignupParmas extends AuthParams {
  name: string
}

const signIn = async ({ email, password }: AuthParams) => {
  try {
    const { data } = await axios.post(`${API_URL}/signin`, {
      email: email,
      password: password,
    })
    return data
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      throw new Error('Invalid email or password')
    } else {
      throw error
    }
  }
}

const signUp = async ({ email, password, name }: SignupParmas) => {
  const { data } = await axios.post(`${API_URL}/signup`, {
    email,
    password,
    name,
  })
  return data
}

export function useAuth({
  onSignUpSuccess,
  onSignUpError,
  onSignInSuccess,
  onSignInError,
}: {
  onSignUpSuccess?: (data: any) => void
  onSignUpError?: (error: any) => void
  onSignInSuccess?: (data: any) => void
  onSignInError?: (error: any) => void
} = {}) {
  const signUpMutation = useMutation(['signup'], signUp, {
    onSuccess: onSignUpSuccess,
    onError: onSignUpError,
  })

  const signInMutation = useMutation(['signin'], signIn, {
    onSuccess: onSignInSuccess,
    onError: (error: any) => {
      console.error(error.message)
      if (onSignInError) {
        onSignInError(error)
      }
    },
  })

  const signUpUser = async ({ email, password, name }: SignupParmas) => {
    await signUpMutation.mutate({ email, password, name })
  }

  const signInUser = async ({ email, password }: AuthParams) => {
    signInMutation.mutate({ email, password })
  }

  return {
    signUpUser,
    signInUser,
    signUpLoading: signUpMutation.isLoading,
    signInLoading: signInMutation.isLoading,
    signUpError: signUpMutation.error,
    signInError: signInMutation.error,
  }
}
