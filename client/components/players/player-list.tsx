import { Box, OrderedList } from '@chakra-ui/layout'
import { ListItem } from '@chakra-ui/react'

interface PlayerListProps {
  list: any
}

export function PlayerList({ list }: PlayerListProps) {
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
