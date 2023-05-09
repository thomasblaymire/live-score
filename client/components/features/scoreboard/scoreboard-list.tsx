import Link from 'next/link'
import { Box, LinkBox, Center } from '@chakra-ui/react'
import { Loading } from '@/components/ui/loading'
import { ScoreBoardTeams } from './scoreboard-teams'
import { ScoreBoardGoals } from './scoreboard-goals'
import { ScoreBoardStatus } from './scoreboard-status'
import { ScoreBoardEmpty } from './scoreboard-empty'
import { hyphenateMatchString } from '@/lib/string'

interface ScoreBoardLiveProps {
  fixtures: CustomFixture[]
  isFetching: boolean
  error: Error | unknown
}

export function ScoreBoardList({ fixtures, isFetching }: ScoreBoardLiveProps) {
  if (isFetching) {
    return (
      <Center padding="1rem 0">
        <Loading loading={isFetching} size="md" />
      </Center>
    )
  }

  if (fixtures.length === 0) {
    return <ScoreBoardEmpty />
  }

  return (
    <>
      {fixtures.map((fixture: CustomFixture, index: number) => {
        const { apiId, homeTeam, awayTeam, goals } = fixture
        const id = apiId.toString()
        return (
          <Link
            href={{
              pathname: '/matches/[match]/[id]',
              query: { id },
            }}
            passHref
            as={`/matches/${hyphenateMatchString(
              homeTeam.name,
              awayTeam.name
            )}/${id}`}
            key={id}
          >
            <Box
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
                marginBottom={{
                  base: index === fixtures.length - 1 ? '0rem' : '0.5rem',
                  sm: index === fixtures.length - 1 ? '0rem' : '1rem',
                }}
                fontWeight="500"
              >
                <Box
                  display="flex"
                  alignItems="center"
                  flex="1 1 0%"
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
      })}
    </>
  )
}
