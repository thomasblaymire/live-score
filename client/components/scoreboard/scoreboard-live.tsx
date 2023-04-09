import Link from 'next/link'
import { Box, LinkBox, Badge } from '@chakra-ui/react'
import { Favourite } from '../favourite'
import { hypenateMatchString } from '../../lib/string'
import { ScoreBoardTeams } from './scoreboard-teams'
import { keyframes } from '@emotion/react'

interface ScoreBoardLiveProps {
  liveScores: Match[]
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

export function ScoreBoardLive({ liveScores }: ScoreBoardLiveProps) {
  return (
    <>
      {liveScores.map((fixture: any, index: number) => (
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
          key={fixture.homeTeam.name}
        >
          <Box
            key={fixture.homeTeam.name}
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
                <Badge
                  borderRadius="50%"
                  bg="red"
                  width="12px"
                  height="12px"
                  boxShadow="0 0 5px red"
                  marginRight="2rem"
                  animation={`${pulse} 2s ease-in-out infinite`}
                />

                <ScoreBoardTeams
                  homeTeam={fixture.homeTeam}
                  awayTeam={fixture.awayTeam}
                />

                <Box
                  display="flex"
                  flexDirection="column"
                  minWidth="0"
                  marginLeft="auto"
                >
                  <Box display="flex" marginBottom="5px">
                    1{/* {goals.home} */}
                  </Box>
                  <Box display="flex">0{/* {goals.away} */}</Box>
                </Box>
              </Box>
            </LinkBox>
          </Box>
        </Link>
      ))}
    </>
  )
}
