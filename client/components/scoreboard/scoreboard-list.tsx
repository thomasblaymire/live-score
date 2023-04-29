import Link from 'next/link'
import { Box, LinkBox, Text } from '@chakra-ui/react'
import { Favourite } from '../favourite'
import { hyphenateMatchString } from '../../lib/string'
import { ScoreBoardTeams } from './scoreboard-teams'
import { ScoreBoardGoals } from './scoreboard-goals'
import { ScoreBoardStatus } from './scoreboard-status'
import { ScoreBoardEmpty } from './scoreboard-empty'

interface ScoreBoardLiveProps {
  fixtures: CustomFixture[]
  error: Error | unknown
}

export function ScoreBoardList({ fixtures }: ScoreBoardLiveProps) {
  return (
    <>
      {fixtures.length === 0 ? (
        <ScoreBoardEmpty />
      ) : (
        fixtures.map((fixture: any, index: number) => {
          const { id, homeTeam, awayTeam, goals } = fixture
          return (
            <Link
              href={{
                pathname: '/matches/[match]',
                query: {
                  id,
                },
              }}
              passHref
              as={`/matches/${hyphenateMatchString(
                homeTeam.name,
                awayTeam.name
              )}`}
              key={id}
            >
              <Box
                marginBottom={{ base: '1rem', md: '0' }}
                fontSize={{ base: '1rem', md: '1.25rem' }}
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
                  marginBottom={index === fixtures.length - 1 ? '0rem' : '1rem'}
                  fontWeight="500"
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    flex=" 1 1 0%"
                    fontSize={{ base: '14px', md: 'auto' }}
                  >
                    <ScoreBoardStatus />
                    <ScoreBoardTeams homeTeam={homeTeam} awayTeam={awayTeam} />
                    <ScoreBoardGoals
                      homeGoals={goals.home}
                      awayGoals={goals.away}
                    />
                  </Box>
                </LinkBox>
              </Box>
            </Link>
          )
        })
      )}
    </>
  )
}
