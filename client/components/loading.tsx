import { Spinner } from '@chakra-ui/react'

type LoadingProps = {
  loading?: boolean
  size?: string
}

export const Loading = ({ loading = true, size = 'lg' }: LoadingProps) => {
  if (!loading) return null
  return (
    <Spinner
      thickness="4px"
      speed="0.5s"
      emptyColor="gray.200"
      data-test="loading-spinner"
      color="#3772ff"
      size={size}
    />
  )
}
