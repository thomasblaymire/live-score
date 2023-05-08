import { Box } from '@chakra-ui/react'

interface ScoreBoardGoalsProps {
  homeGoals: number
  awayGoals: number
}

export function ScoreBoardGoals({
  homeGoals,
  awayGoals,
}: ScoreBoardGoalsProps) {
  return (
    <Box display="flex" flexDirection="column" minWidth="0" marginLeft="auto">
      {homeGoals !== null && awayGoals !== null ? (
        <>
          <Box display="flex" justifyContent="center" marginBottom="5px">
            {homeGoals}
          </Box>
          <Box display="flex" justifyContent="center">
            {awayGoals}
          </Box>
        </>
      ) : (
        <Box>TBC</Box>
      )}
    </Box>
  )
}
