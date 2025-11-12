import { Heading, Flex, Box, VStack } from '@chakra-ui/react'
import { getFixtures } from '@/hooks/useFixtures'
import { getWeekNumber, getDateRange } from '@/lib/time'
import { MatchList } from '@/components/features/match/match-list'

interface MatchesProps {
  fixtures: CustomFixture[]
}

export default function Matches({ fixtures }: MatchesProps) {
  function groupByWeek(fixtures: CustomFixture[]) {
    const weeks: CustomMatchesByWeek = {}
    fixtures.forEach((match) => {
      const date = new Date(match.date)
      const weekNumber = getWeekNumber(date)

      if (!weeks[weekNumber]) {
        weeks[weekNumber] = []
      }
      weeks[weekNumber].push(match)
    })
    return weeks
  }

  const matchesByWeek = groupByWeek(fixtures)

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        height="45vh"
        background="linear-gradient(to right, #1CB5E0, #000046)"
        sx={{
          height: {
            base: '20vh',
            md: '35vh',
          },
        }}
      >
        <Flex direction="column" gap="1rem" width="1200px" margin="0 auto">
          <Heading
            color="white"
            fontFamily="inherit"
            fontWeight={700}
            fontSize="3rem"
            lineHeight="1"
            padding="0 1rem"
            sx={{
              fontSize: {
                base: '2rem',
                md: '3rem',
              },
            }}
          >
            Matches
          </Heading>
        </Flex>
      </Box>

      <VStack
        spacing={6}
        width={{ base: '100%', lg: '1200px' }}
        margin="0 auto"
        marginY="2rem"
        padding={{ base: '1rem' }}
      >
        <Box>
          <MatchList matches={matchesByWeek} />
        </Box>
      </VStack>
    </Box>
  )
}

export async function getStaticProps() {
  const fixtureRange = getDateRange(2)

  try {
    const fixtures = await getFixtures(fixtureRange)
    return {
      props: {
        fixtures,
      },
    }
  } catch (error: unknown) {
    console.error('Error fetching fixture data:', error)
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred'
    return {
      redirect: {
        destination: `/error?message=${encodeURIComponent(errorMessage)}`,
        permanent: false,
      },
    }
  }
}
