import { Loading } from '@/components/ui/loading'
import { hyphenateMatchString } from '@/lib/string'
import { Box, Center, LinkBox } from '@chakra-ui/react'
import Link from 'next/link'
import { ScoreBoardEmpty } from './scoreboard-empty'
import { ScoreBoardGoals } from './scoreboard-goals'
import { ScoreBoardStatus } from './scoreboard-status'
import { ScoreBoardTeams } from './scoreboard-teams'

interface ScoreBoardLiveProps {
  fixtures: any;
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

  console.log('debug fixtures XXX', fixtures)

  return (
    <Box>
      {fixtures.response.map((fixture: any) => {
        console.log('debug fixture', fixture)
        const matchId = fixture.fixture.id.toString()
        
        return (
          <Box
            key={matchId}
            fontSize={{ base: '1rem', md: '1.25rem' }}
            fontWeight="600"
            color="white"
            borderRadius="5px"
            background="#1b1b1b"
            id={matchId}
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
                base: '0.5rem',
                sm: '1rem',
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
                <ScoreBoardTeams 
                  homeTeam={fixture.teams.home} 
                  awayTeam={fixture.teams.away} 
                />
                <ScoreBoardGoals
                  homeGoals={fixture.goals.home}
                  awayGoals={fixture.goals.away}
                />
              </Box>
            </LinkBox>
          </Box>
        )
      })}
    </Box>
  )
}