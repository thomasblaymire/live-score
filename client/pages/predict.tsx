import { useState, useEffect } from 'react'
import { Heading, Flex, Box, Button, css } from '@chakra-ui/react'
import { fakeUsers } from '../data/users'
import { Leaderboard } from '../components/leaderboard'
import { useFixtures } from '../hooks/useFixtures'
import { PredictionList } from '../components/prediction'
import { Card } from '../components/card'
import { API_URL } from '../lib/constants'
import { getCookie } from '../lib/cookie'
import { withAuth } from '../components/require-auth'
import axios from 'axios'

type PredictionsType = {
  [matchId: number]: {
    teamA: number
    teamB: number
  }
}

function Predict() {
  // const { data: fixtures, isLoading, isError } = useFixtures()
  const [predictions, setPredictions] = useState<PredictionsType>({})
  const [fixtures, setFixtures] = useState<any>([])

  const getFixtures = async (startDate: string, endDate: string) => {
    try {
      const { data } = await axios.get(
        `${API_URL}/fixtures-all/date?start=${startDate}&end=${endDate}`
      )
      setFixtures(data)
      return data
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching fixture data:', error.message)
        return { data: { data: {} }, error: error.message }
      } else {
        console.error('Error fetching fixture data:', error)
        return { data: { data: {} }, error: 'An unknown error occurred' }
      }
    }
  }

  console.log('fixtures', fixtures)

  useEffect(() => {
    // Example date range
    const startDate = '2023-04-08'
    const endDate = '2023-04-08'
    getFixtures(startDate, endDate)
  }, [])

  useEffect(() => {
    const storedPredictions = localStorage.getItem('predictions')
    if (storedPredictions) {
      setPredictions(JSON.parse(storedPredictions))
    }
  }, [])

  const updatePrediction = (
    matchId: number,
    teamAScore: number,
    teamBScore: number
  ) => {
    setPredictions((prevPredictions) => {
      const newPredictions = {
        ...prevPredictions,
        [matchId]: { teamA: teamAScore, teamB: teamBScore },
      }
      localStorage.setItem('predictions', JSON.stringify(newPredictions))
      return newPredictions
    })
  }

  const handlePredictionsSubmit = async () => {
    // Collect predictions from local state
    const storedPredictions = localStorage.getItem('predictions')
    const predictions: PredictionsType = storedPredictions
      ? JSON.parse(storedPredictions)
      : {}

    // Convert predictions to the required format
    const formattedPredictions = Object.entries(predictions).map(
      ([matchId, scores]) => {
        return {
          matchId: parseInt(matchId),
          teamAScore: scores.teamA,
          teamBScore: scores.teamB,
        }
      }
    )

    const token = getCookie('token')

    try {
      const response = await fetch(`${API_URL}/predictions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ predictions: formattedPredictions }),
      })
      console.log('debug, response: ', response)
    } catch (error) {
      console.error(error)
    }
  }

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
          <Box width="100%"></Box>
        </Flex>

        <Flex justifyContent="center" gap="1.5rem" paddingBottom="2.5rem">
          <Box width="60%">
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
          </Box>

          <Box width="40%">
            <Card
              heading="Leaderboard"
              headingAlign="left"
              background="#121212"
              height="45vh"
              radius="15px"
            >
              <Leaderboard users={fakeUsers} />
            </Card>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default withAuth(Predict)
