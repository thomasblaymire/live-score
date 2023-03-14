import { Flex, Box, OrderedList, Stack, Divider, Text } from '@chakra-ui/layout'
import { ListItem, Avatar } from '@chakra-ui/react'
import { Card } from '../card'

interface PlayerListProps {
  lineups: Lineup[]
  heading?: string
}

export function PlayerList({ lineups, heading }: PlayerListProps) {
  console.log('debug', lineups)

  const homeLineup = lineups[0].startXI
  const awayLineup = lineups[1].startXI
  const homeTeam = lineups[0].team
  const awayTeam = lineups[1].team

  return (
    <Card
      heading={heading}
      headingAlign="center"
      background="#121212"
      height="45vh"
      radius="15px"
    >
      <Flex padding="1rem" justifyContent="space-between">
        <Flex align="center">
          <Avatar
            name="Coach"
            size="sm"
            marginBottom="0.5rem"
            src={homeTeam.logo}
            marginRight="0.5rem"
          />
          <Text fontWeight="500" color="white">
            {homeTeam.name}
          </Text>
        </Flex>
        <Flex align="center">
          <Text fontWeight="500" color="white" paddingRight="0.5rem">
            {awayTeam.name}
          </Text>
          <Avatar
            name="Coach"
            size="sm"
            marginBottom="0.5rem"
            src={awayTeam.logo}
            marginRight="0.5rem"
          />
        </Flex>
      </Flex>

      <Stack direction="row">
        <Flex
          padding="0 1rem 1rem 1rem"
          justifyContent="space-between"
          width="100%"
        >
          <Box>
            <OrderedList color="#FFF">
              {homeLineup.map((individual: StartXI) => (
                <ListItem key={individual.player.id} paddingBottom="0.5rem">
                  {individual.player.name}
                </ListItem>
              ))}
            </OrderedList>
          </Box>
          <Divider orientation="vertical" />
          <Box>
            <OrderedList color="#FFF">
              {awayLineup.map((individual: StartXI) => (
                <ListItem key={individual.player.id} paddingBottom="0.5rem">
                  {individual.player.name}
                </ListItem>
              ))}
            </OrderedList>
          </Box>
        </Flex>
      </Stack>
    </Card>
  )
}
