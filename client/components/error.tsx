import {
  Alert,
  Box,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

interface ErrorStateProps {
  message?: string
}

export const ErrorState = ({ message }: ErrorStateProps) => {
  return (
    <Alert status="error" borderRadius="10px">
      <AlertIcon />
      <Box>
        <AlertTitle mr={2}>An error occurred!</AlertTitle>
        <AlertDescription>
          {message || 'Please refrash the page and try again.'}
        </AlertDescription>
      </Box>
    </Alert>
  )
}
