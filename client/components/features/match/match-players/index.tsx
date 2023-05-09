import { Flex, Stack, Divider } from '@chakra-ui/layout'
import { MatchPlayerTeam } from './match-player-team'
import { MatchPlayerList } from './match-players-list'
import { Card } from '@/components/ui/card'

interface PlayersProps {
  heading?: string
  homePlayers: StartXI[] | Substitute[]
  awayPlayers: StartXI[] | Substitute[]
  homeTeam: Team2
  awayTeam: Team2
}

export function MatchPlayers({
  heading,
  homePlayers,
  awayPlayers,
  homeTeam,
  awayTeam,
}: PlayersProps) {
  return (
    <Card
      heading={heading ? heading : ''}
      background="transparent"
      headingAlign="center"
      height="45vh"
      radius="15px"
    >
      <Flex padding="1rem" justifyContent="space-between">
        <MatchPlayerTeam name={homeTeam.name} logo={homeTeam.logo} />
        <MatchPlayerTeam
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
          <MatchPlayerList list={homePlayers} />
          <Divider orientation="vertical" />
          <MatchPlayerList list={awayPlayers} />
        </Flex>
      </Stack>
    </Card>
  )
}
