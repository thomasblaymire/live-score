import axios from 'axios'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { API_URL } from '../lib/constants'

interface AuthParams {
  email: string
  password: string
}

interface SignupParmas extends AuthParams {
  name: string
}

const signIn = async ({ email, password }: AuthParams) => {
  const { data } = await axios.post(`${API_URL}/signin`, {
    email: email,
    password: password,
  })
  return data
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
  onSignUpError?: (error: Error) => void
  onSignInSuccess?: (data: any) => void
  onSignInError?: (error: Error) => void
} = {}) {
  const signUpMutation = useMutation(['signup'], signUp, {
    onSuccess: onSignUpSuccess,
    onError: onSignUpError,
  })
  const signInMutation = useMutation(['signin'], signIn, {
    onSuccess: onSignInSuccess,
    onError: onSignInError,
  })

  const signUpUser = async ({ email, password, name }: SignupParmas) => {
    await signUpMutation.mutateAsync({ email, password, name })
  }

  const signInUser = async ({ email, password }: AuthParams) => {
    await signInMutation.mutateAsync({ email, password })
  }

  return {
    signUpUser,
    signInUser,
    signUpLoading: signUpMutation.isLoading,
    signInLoading: signInMutation.isLoading,
    onSignUpError: signUpMutation.error,
    onSignInError: signInMutation.error,
  }
}
