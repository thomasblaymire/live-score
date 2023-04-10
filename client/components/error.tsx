import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

interface ErrorStateProps {
  message?: string
}

export const ErrorState = ({ message }: ErrorStateProps) => {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>An error occurred!</AlertTitle>
      <AlertDescription>
        {message || 'Please contact us for assistance.'}
      </AlertDescription>
    </Alert>
  )
}
