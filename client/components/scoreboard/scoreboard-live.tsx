import Link from 'next/link'
import { Box, LinkBox, Badge } from '@chakra-ui/react'
import { Favourite } from '../favourite'
import { hypenateMatchString } from '../../lib/string'
import { ScoreBoardTeams } from './scoreboard-teams'
import { keyframes } from '@emotion/react'
import { Session } from 'next-auth'

interface ScoreBoardLiveProps {
  liveScores: Match[]
  session: Session | null
}

const pulse = keyframes`
  0% {
    transform: scale(0.5);
    box-shadow: 0 0 0 0 red;
  }
  50% {
    transform: scale(0.95);
    box-shadow: 0 0 0 8px rgba(255, 82, 82, 0);
  }
  100% {
    transform: scale(0.5);
    box-shadow: 0 0 0 0 red;
  }
`

export function ScoreBoardLive({ liveScores, session }: ScoreBoardLiveProps) {
  return (
    <>
      {liveScores?.map(({ teams, fixture, goals }: any) => (
        <Link
          href={{
            pathname: '/matches/[match]',
            query: {
              id: fixture.id,
            },
          }}
          passHref
          as={`/matches/${hypenateMatchString(
            teams.home.name,
            teams.away.name
          )}`}
          key={teams.home.name}
        >
          <Box
            key={teams.home.name}
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
              marginBottom="1rem"
              fontWeight="500"
            >
              <Box
                display="flex"
                alignItems="center"
                flex=" 1 1 0%"
                fontSize={{ base: '14px', md: 'auto' }}
              >
                {session?.user.id ? (
                  <Favourite fixture={fixture} userId={session?.user.id} />
                ) : null}

                <Badge
                  borderRadius="50%"
                  bg="red"
                  width="12px"
                  height="12px"
                  boxShadow="0 0 5px red"
                  marginRight="2rem"
                  animation={`${pulse} 2s ease-in-out infinite`}
                />

                {teams ? <ScoreBoardTeams teams={teams} /> : null}

                <Box
                  display="flex"
                  flexDirection="column"
                  minWidth="0"
                  marginLeft="auto"
                >
                  <Box display="flex" marginBottom="5px">
                    {goals.home}
                  </Box>
                  <Box display="flex">{goals.away}</Box>
                </Box>
              </Box>
            </LinkBox>
          </Box>
        </Link>
      ))}
    </>
  )
}
