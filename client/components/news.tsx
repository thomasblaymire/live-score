import { useQuery } from '@tanstack/react-query'
import { getNews } from '../lib/api-helpers'
import { SkeletonLoading } from './skeleton'
import { Box } from '@chakra-ui/layout'
import { ErrorState } from './error'

export function News() {
  const {
    data: news,
    isLoading,
    error,
  } = useQuery<NewsItem[] | undefined>({
    queryKey: ['news'],
    queryFn: () => getNews(),
  })

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
