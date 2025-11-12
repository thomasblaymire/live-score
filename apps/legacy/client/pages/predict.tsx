import { Heading, Flex, Box } from '@chakra-ui/react'
import { fakeUsers } from '../data/users'
import { PredictionLeaderboard } from '@/components/features/prediction/prediction-leaderboard'
import { useFixtures } from '@/hooks/useFixtures'
import { useStoredPredictions } from '@/hooks/useStoredPredictions'
import { usePredictionsSubmit } from '@/hooks/usePredictionsSubmit'
import { PredictionFixtures } from '@/components/features/prediction/prediction-fixtures'
import { Card } from '@/components/ui/card'
import { Loading } from '@/components/ui/loading'
import { withAuth } from '@/components/features/user/require-auth'
import { ErrorState } from '@/components/ui/error'

function Predict() {
  const {
    data: fixtures,
    isFetching,
    error,
  } = useFixtures({ startDate: '2023-04-08', endDate: '2023-04-08' })
  const { predictions, updatePrediction } = useStoredPredictions()
  const handlePredictionsSubmit = usePredictionsSubmit(predictions)

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        height="45vh"
        background="linear-gradient(to right, #1CB5E0, #000046)"
      >
        <Flex direction="column" gap="1rem" width="1200px" margin="0 auto">
          <Heading
            color="white"
            fontFamily="inherit"
            fontWeight={700}
            fontSize="3rem"
            lineHeight="1"
          >
            Prediction
          </Heading>
          <Heading as="h3" size="md" color="#FFF" fontWeight="500">
            Guess the correct score for fixtures each weak to be in with a
            chance to win!
          </Heading>
        </Flex>
      </Box>

      <Box
        marginTop={{ base: '1rem', md: '3rem' }}
        width="1200px"
        height="400vh"
        margin="0 auto"
      >
        <Flex justifyContent="center" gap="1.5rem" paddingBottom="2.5rem">
          <Box width="60%">
            {fixtures ? (
              <PredictionFixtures
                fixtures={fixtures}
                predictions={predictions}
                updatePrediction={updatePrediction}
                handlePredictionsSubmit={handlePredictionsSubmit}
              />
            ) : null}

            <Loading loading={isFetching} />
            {error ? <ErrorState /> : null}
          </Box>

          <Box width="40%">
            <Card
              heading="Leaderboard"
              headingAlign="left"
              background="#121212"
              height="45vh"
              radius="15px"
            >
              <PredictionLeaderboard users={fakeUsers} />
            </Card>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default withAuth(Predict)
