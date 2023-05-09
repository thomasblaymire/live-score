import { Flex, Stack, Divider } from '@chakra-ui/layout'
import { PlayerTeam } from './player-team'
import { PlayerList } from './player-list'
import { Card } from '../card'

interface PlayersProps {
  heading?: string
  homePlayers: StartXI[] | Substitute[]
  awayPlayers: StartXI[] | Substitute[]
  homeTeam: Team2
  awayTeam: Team2
}

export function Players({
  heading,
  homePlayers,
  awayPlayers,
  homeTeam,
  awayTeam,
}: PlayersProps) {
  return (
    <Card
      heading={heading ? heading : ''}
      headingAlign="center"
      background="#121212"
      height="45vh"
      radius="15px"
    >
      <Flex padding="1rem" justifyContent="space-between">
        <PlayerTeam name={homeTeam.name} logo={homeTeam.logo} />
        <PlayerTeam
          name={awayTeam.name}
          logo={awayTeam.logo}
          alignment="left"
        />
      </Flex>

      <Stack direction="row">
        <Flex
          padding="0 1rem 1rem 1rem"
          justifyContent="space-between"
          width="100%"
        >
          <PlayerList list={homePlayers} />
          <Divider orientation="vertical" />
          <PlayerList list={awayPlayers} />
        </Flex>
      </Stack>
    </Card>
  )
}
