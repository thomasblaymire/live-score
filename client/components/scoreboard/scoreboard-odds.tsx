import Link from 'next/link'
import { Box, LinkBox, Badge } from '@chakra-ui/react'
import { Favourite } from '../favourite'
import { hypenateMatchString } from '../../lib/string'
import { ScoreBoardTeams } from './scoreboard-teams'
import { Session } from 'next-auth'

interface ScoreBoardOddsProps {
  odds: Match[]
  session: Session | null
}

export function ScoreBoardOdds({ odds, session }: ScoreBoardOddsProps) {
  console.log('debug oddsMatches', odds)

  return (
    <>
      {odds?.map(({ teams, fixture }: any) => (
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

                {teams ? <ScoreBoardTeams teams={teams} /> : null}

                <Box
                  display="flex"
                  flexDirection="column"
                  minWidth="0"
                  marginLeft="auto"
                  alignItems="center"
                >
                  <Box display="flex" marginBottom="5px">
                    15:00
                  </Box>
                  <Box display="flex">SAT 15TH</Box>
                </Box>
              </Box>
            </LinkBox>
          </Box>
        </Link>
      ))}
    </>
  )
}
