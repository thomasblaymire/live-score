import { Box, Button } from '@chakra-ui/react'
import { Card } from '@/components/ui/card'
import { PredictionList } from '.'

interface PredictionFixturesProps {
  fixtures: CustomFixture[]
  predictions: Prediction
  updatePrediction: (
    matchId: number,
    teamAScore: number,
    teamBScore: number
  ) => void
  handlePredictionsSubmit: () => void
}

export function PredictionFixtures({
  fixtures,
  predictions,
  updatePrediction,
  handlePredictionsSubmit,
}: PredictionFixturesProps) {
  return (
    <Card
      heading="Latest Fixtures"
      headingAlign="left"
      background="#121212"
      height="45vh"
      radius="15px"
    >
      {fixtures?.map((fixture: any) => {
        return (
          <PredictionList
            key={fixture.id}
            matchId={fixture.id}
            teamA={fixture.homeTeam.name}
            teamALogo={fixture.homeTeam.logo}
            teamB={fixture.awayTeam.name}
            teamBLogo={fixture.awayTeam.logo}
            teamAScore={predictions[fixture.id]?.teamA || 0}
            teamBScore={predictions[fixture.id]?.teamB || 0}
            onScoreChange={updatePrediction}
          />
        )
      })}

      <Box width="45%" margin="0 auto" padding="1rem 0">
        <Button
          width="100%"
          data-test="prediction-submit"
          onClick={handlePredictionsSubmit}
          bg="green.500"
          color="#FFF"
          sx={{
            '&:hover': {
              bg: 'green.300',
            },
          }}
        >
          Submit Predictions
        </Button>
      </Box>
    </Card>
  )
}
