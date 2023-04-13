import { Box, Button, List } from '@chakra-ui/react'
import { CarouselItem } from './carousel-item'
import { useCarousel } from '../../hooks/useCarousel'

interface CarouselProps {
  items: any
  show: any
  step: number
}

export function Carousel({ items, show, step }: CarouselProps) {
  const length = items?.length || 0
  const { currentIndex, handleNextClick, handlePrevClick } = useCarousel(
    length,
    show,
    step
  )

  return (
    <Box width="100%" display="flex" flex-direction="column">
      <Box display="flex" width="100%" position="relative">
        {currentIndex > 0 && (
          <Button left="24px" onClick={handlePrevClick}>
            Previous
          </Button>
        )}
        <Box overflow="hidden" width="100%" height="100%">
          <Box
            display="flex"
            transition="all 250ms linear"
            // _webkitScrollbar={{
            //   display: 'none',
            // }}
            css={{
              '& > *': {
                display: 'flex',
                flexShrink: 0,
                flexGrow: 1,
                width: `calc(100% / ${show})`,
              },

              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            {items?.map((item: any, index: any) => (
              <CarouselItem item={item} key={index} />
            ))}
          </Box>
        </Box>
        {currentIndex < length - show && (
          <Button right="24px" onClick={handleNextClick}>
            Next
          </Button>
        )}
      </Box>
    </Box>
  )
}
