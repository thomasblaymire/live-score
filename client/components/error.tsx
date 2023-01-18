import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

export const ErrorState = () => {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>An error occured!</AlertTitle>
      <AlertDescription>Please contact us for assistance.</AlertDescription>
    </Alert>
  )
}
