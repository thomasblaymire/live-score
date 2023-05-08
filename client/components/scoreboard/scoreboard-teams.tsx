import { Box } from '@chakra-ui/layout'
import NextImage from 'next/image'

interface ScoreBoardTeamsProps {
  homeTeam: any
  awayTeam: any
}

export function ScoreBoardTeams({ homeTeam, awayTeam }: ScoreBoardTeamsProps) {
  return (
    <Box display="flex" flexDirection="column" flex=" 1 1" minWidth="0">
      <Box display="flex" marginBottom="0.25rem">
        <NextImage
          src={homeTeam.logo}
          color="white"
          alt={homeTeam.name}
          width={25}
          height={25}
          style={{ marginRight: '15px' }}
        />
        {homeTeam.name}
      </Box>
      <Box display="flex" alignItems="center">
        <NextImage
          src={awayTeam.logo}
          color="white"
          alt={awayTeam.name}
          width={25}
          height={25}
          style={{ marginRight: '15px' }}
        />
        {awayTeam.name}
      </Box>
    </Box>
  )
}
