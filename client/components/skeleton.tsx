import { Stack, Skeleton } from '@chakra-ui/react'

interface SkeletonLoadingProps {
  loading: boolean
  ammount: number
  height: string
  startColor: string
  endColor: string
  borderRadius?: string
}

export function SkeletonLoading({
  loading,
  ammount,
  height,
  startColor,
  endColor,
  borderRadius,
}: SkeletonLoadingProps) {
  return (
    <>
      {loading ? (
        <Stack spacing={5} padding="1rem">
          {new Array(ammount).fill(1).map((i: number) => (
            <Skeleton
              key={i}
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
