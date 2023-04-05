import { useState } from 'react'
import Image from 'next/image'
import { Heading, Flex, Text, Box, Container, Button } from '@chakra-ui/react'
import { ErrorState } from '../components/error'
import { getTeams } from '../lib/api-helpers'
import { PredictionTeam } from '../components/prediction/prediction-team'
import { useFixtures } from '../hooks/useFixtures'
import { PredictionList } from '../components/prediction'
import { Card } from '../components/card'

export default function Predict() {
  const { data: fixtures, isLoading, isError } = useFixtures()

  const handlePredictionsSubmit = async () => {
    // Collect predictions from local state
    // POST request to /api/fixtures with the data
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
            Score Guess
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
              {fixtures?.fixturesByDate.map((fixture: any) => {
                console.log('debug fixture', fixture)
                return (
                  <PredictionList
                    key={fixture.fixture.id}
                    teamA={fixture.teams.home.name}
                    teamALogo={fixture.teams.home.logo}
                    teamB={fixture.teams.away.name}
                    teamBLogo={fixture.teams.away.logo}
                  />
                )
              })}

              <Button
                onClick={handlePredictionsSubmit}
                colorScheme="teal"
                mt={4}
              >
                Submit Predictions
              </Button>
            </Card>
          </Box>

          <Box width="40%">
            <Card
              heading="Leaderboard"
              headingAlign="left"
              background="#121212"
              height="45vh"
              radius="15px"
            ></Card>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}
