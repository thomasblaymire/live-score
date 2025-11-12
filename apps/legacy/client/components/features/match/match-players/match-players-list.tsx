import { Box, OrderedList } from '@chakra-ui/layout'
import { ListItem } from '@chakra-ui/react'

interface MatchPlayerListProps {
  list: any
}

export function MatchPlayerList({ list }: MatchPlayerListProps) {
  return (
    <Box>
      <OrderedList color="#FFF">
        {list.map((individual: StartXI) => (
          <ListItem key={individual.player.id} paddingBottom="0.5rem">
            {individual.player.name}
          </ListItem>
        ))}
      </OrderedList>
    </Box>
  )
}
