import { ListItem, Image, Box, Flex } from '@chakra-ui/react'

interface FeedItemProps {
  item: any
}

export function CarouselItem({ item }: FeedItemProps) {
  console.log('debug in carousel item', item)
  return (
    <Box
      data-testid="carousel-item"
      cursor="pointer"
      padding="8px"
      width="300px"
      height="300px"
      background="#EEE"
    >
      <Flex>
        <Box>
          <Image
            display="block"
            width="20%"
            height="20%"
            src={item.homeTeam.logo}
            alt={item.homeTeam.name}
          />
          <p>{item.homeTeam.name}</p>
        </Box>
        <Box>
          <Image
            display="block"
            width="20%"
            height="20%"
            src={item.awayTeam.logo}
            alt={item.awayTeam.name}
          />
          <p>{item.awayTeam.name}</p>
        </Box>
      </Flex>
    </Box>
  )
}
