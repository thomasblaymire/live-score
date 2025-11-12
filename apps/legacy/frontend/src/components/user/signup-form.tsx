import * as yup from 'yup'
import { useState, ChangeEvent, FormEvent } from 'react'
import {
  Center,
  Box,
  Stack,
  FormControl,
  Input,
  FormErrorMessage,
  FormLabel,
  Button,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { setCookie } from '@/lib/cookie'
import { useAuth } from '@/hooks/useAuth'
import { signupValidationSchema } from './validations'

interface Errors {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
}

export function SignupForm() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [errors, setErrors] = useState<Errors>({})
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const { signUpUser, signUpLoading } = useAuth({
    onSignUpSuccess: (data) => {
      setCookie('token', data.token, { path: '/' })
      router.push('/')
    },
    onSignUpError: (error) => {
      console.log('debug signup hook error', error)
    },
  })

  const router = useRouter()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    try {
      await signupValidationSchema.validate(
        { name, email, password, confirmPassword }, // Add confirmPassword here
        { abortEarly: false }
      )
      setErrors({})
      await signUpUser({ email, password, name })
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const validationErrors: Errors = {}
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path as keyof Errors] = error.message
          }
        })
        setErrors(validationErrors)
      } else {
        console.error('Error during sign up:', err)
      }
    }
  }

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value)
    }

  return (
    <Center color="white">
      <Box borderRadius="6px" width={{ base: '100%', md: '450px' }}>
        <form onSubmit={handleSubmit}>
          <Stack paddingBottom="25px" gap="1rem">
            <FormControl isRequired isInvalid={!!errors.name}>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Name"
                type="name"
                data-test="signin-input-name"
                onChange={handleInputChange(setName)}
              />
              {errors.name && (
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isRequired isInvalid={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                type="email"
                data-test="signin-input-email"
                onChange={handleInputChange(setEmail)}
              />
              {errors.email && (
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isRequired isInvalid={!!errors.password}>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="Password"
                type="password"
                data-test="signin-input-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            {password && (
              <FormControl isRequired isInvalid={!!errors.confirmPassword}>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  data-test="signin-input-confirm-password"
                  onChange={handleInputChange(setConfirmPassword)}
                />
                {errors.confirmPassword && (
                  <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                )}
              </FormControl>
            )}
          </Stack>

          <Button
            type="submit"
            data-test="sign-in-submit"
            width="100%"
            marginTop="1rem"
            marginBottom="1rem"
            bg="green.500"
            isLoading={signUpLoading}
            sx={{
              '&:hover': {
                bg: 'green.300',
              },
            }}
          >
            Signup
          </Button>
        </form>
      </Box>
    </Center>
  )
}
