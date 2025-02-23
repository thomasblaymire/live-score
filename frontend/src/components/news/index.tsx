import { ErrorState } from '@/components/ui/error'
import { SkeletonLoading } from '@/components/ui/skeleton'
import { getNews } from '@/lib/api-helpers'
import { Box } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

interface NewsProps {
  news: NewsItem[]
  isLoading: boolean
  error: Error | undefined
}

export function News({ news, isLoading, error }: NewsProps) {
  console.log('debug news', news)

  return (
    <Box>
      {news?.map((article: NewsItem, i: number) => (
        <Box fontSize="0.75rem" color="white" padding="1rem" key={i}>
          {article.title}
        </Box>
      ))}

      <SkeletonLoading loading={isLoading} ammount={3} height="35px" />

      {error && <ErrorState />}
    </Box>
  )
}
