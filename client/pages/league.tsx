import Image from 'next/image'
import { getStandings } from '../lib/api-helpers'
import { StandingsTable } from '../components/standings'
import { Flex, Box, Heading } from '@chakra-ui/layout'
import { Standings, Competition } from '../types'

interface LeagueProps {
  standings: Standings[]
  competition: Competition
}

export default function League({ standings, competition }: any) {
  console.log('debug stangings', { standings, competition })

  return (
    <>
      <Box
        paddingX={{ md: '4rem' }}
        background="teal.300"
        display="flex"
        alignItems="center"
        height="50vh"
        sx={{
          bgImage: `url(/images/league-hero.jpg)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Box>
          <Image
            src={competition.emblem}
            alt={competition.name}
            width={100}
            height={100}
          />
          <Heading
            color="white"
            fontWeight={700}
            fontSize="3rem"
            lineHeight="1"
          >
            {competition.name}
          </Heading>
        </Box>
      </Box>
      <Flex
        marginTop={{ base: '1rem', md: '3rem' }}
        paddingX={{ md: '4rem' }}
        justifyContent="space-between"
      >
        <StandingsTable standings={standings} />
      </Flex>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const { code } = context.query
  const data = await getStandings(code)

  return {
    props: {
      standings: data.standings[0].table,
      competition: data.competition,
    },
  }
}
