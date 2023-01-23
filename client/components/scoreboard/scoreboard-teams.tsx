import { Box } from '@chakra-ui/layout'
import NextImage from 'next/image'

interface ScoreBoardTeamsProps {
  teams: any
}

export function ScoreBoardTeams({ teams }: ScoreBoardTeamsProps) {
  return (
    <Box display="flex" flexDirection="column" flex=" 1 1" minWidth="0">
      <Box display="flex" marginBottom="10px">
        <NextImage
          src={teams.home.logo}
          color="white"
          alt={teams.home.name}
          width={25}
          height={25}
          style={{ marginRight: '15px' }}
        />
        {teams.home.name}
      </Box>
      <Box display="flex" alignItems="center">
        <NextImage
          src={teams.away.logo}
          color="white"
          alt={teams.away.name}
          width={25}
          height={25}
          style={{ marginRight: '15px' }}
        />
        {teams.away.name}
      </Box>
    </Box>
  )
}
