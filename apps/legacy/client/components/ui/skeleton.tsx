import { Stack, Skeleton } from '@chakra-ui/react'
import { uniqueId } from '@/lib/generators'

interface SkeletonLoadingProps {
  loading: boolean
  ammount: number
  height: string
  startColor?: string
  endColor?: string
  borderRadius?: string
}

export function SkeletonLoading({
  loading,
  ammount,
  height,
  startColor = '#1b1b1b',
  endColor = 'gray.800',
  borderRadius,
}: SkeletonLoadingProps) {
  return (
    <>
      {loading ? (
        <Stack spacing={5}>
          {new Array(ammount).fill(1).map((i: number) => (
            <Skeleton
              key={uniqueId()}
              height={height}
              startColor={startColor}
              borderRadius={borderRadius}
              endColor={endColor}
            />
          ))}
        </Stack>
      ) : null}
    </>
  )
}
