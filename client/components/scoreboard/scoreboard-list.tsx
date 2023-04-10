import Link from 'next/link'
import { Box, LinkBox, Text } from '@chakra-ui/react'
import { Favourite } from '../favourite'
import { hypenateMatchString } from '../../lib/string'
import { ScoreBoardTeams } from './scoreboard-teams'
import { ScoreBoardGoals } from './scoreboard-goals'
import { ScoreBoardStatus } from './scoreboard-status'
import { fixtureError } from './data'

interface ScoreBoardLiveProps {
  liveScores: Match[]
  error: Error | unknown
}

export function ScoreBoardList({ liveScores }: ScoreBoardLiveProps) {
  console.log('debug liveScores', liveScores)

  return (
    <>
      {liveScores.length === 0 ? (
        <Box
          margin={{ base: '0px' }}
          marginBottom={{ base: '1rem', md: '0' }}
          fontSize="1.25rem"
          fontWeight="600"
          color="white"
          borderRadius="5px"
          paddingY="1rem"
        >
          <Text fontSize="0.9rem" fontWeight="500" color="#747574">
            {fixtureError}
          </Text>
        </Box>
      ) : (
        liveScores.map((fixture: any, index: number) => (
          <Link
            href={{
              pathname: '/matches/[match]',
              query: {
                id: fixture.id,
              },
            }}
            passHref
            as={`/matches/${hypenateMatchString(
              fixture.homeTeam.name,
              fixture.awayTeam.name
            )}`}
            key={fixture.id}
          >
            <Box
              key={fixture.id}
              margin={{ base: '0px' }}
              marginBottom={{ base: '1rem', md: '0' }}
              fontSize="1.25rem"
              fontWeight="600"
              color="white"
              borderRadius="5px"
              background="#1b1b1b;"
              sx={{
                '&:hover': {
                  background: '#313131',
                  cursor: 'pointer',
                },
              }}
            >
              <LinkBox
                display="flex"
                padding={{ base: '0.5rem 1rem' }}
                marginBottom={index === liveScores.length - 1 ? '0rem' : '1rem'}
                fontWeight="500"
              >
                <Box
                  display="flex"
                  alignItems="center"
                  flex=" 1 1 0%"
                  fontSize={{ base: '14px', md: 'auto' }}
                >
                  {/* {session?.user.id ? (
                  <Favourite fixture={fixture} session={session} />
                ) : null} */}
                  <ScoreBoardStatus />

                  <ScoreBoardTeams
                    homeTeam={fixture.homeTeam}
                    awayTeam={fixture.awayTeam}
                  />

                  <ScoreBoardGoals
                    homeGoals={fixture.goals.home}
                    awayGoals={fixture.goals.away}
                  />
                </Box>
              </LinkBox>
            </Box>
          </Link>
        ))
      )}
    </>
  )
}
