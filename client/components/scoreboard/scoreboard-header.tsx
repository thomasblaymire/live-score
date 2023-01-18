import { ButtonGroup, Button } from '@chakra-ui/react'

export function ScoreBoardHeader() {
  return (
    <ButtonGroup size="lg" isAttached variant="ghost" width="100%">
      <Button width="100%" borderBottomLeftRadius="0" fontSize="1rem">
        Live Matches
      </Button>
      <Button width="100%" fontSize="1rem">
        All Games
      </Button>
      <Button width="100%" fontSize="1rem">
        Odds
      </Button>
      <Button width="100%" fontSize="1rem" borderBottomRightRadius="0">
        Finished
      </Button>
    </ButtonGroup>
  )
}
