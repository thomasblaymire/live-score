import { Box } from '@chakra-ui/react';
import { useState } from 'react';

interface ScoreBoardTeamsProps {
  homeTeam: any
  awayTeam: any
}

function TeamLogo({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <Box
        width="25px"
        height="25px"
        minWidth="25px"
        minHeight="25px"
        marginRight="15px"
        backgroundColor="gray.700"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="sm"
        fontSize="xs"
        color="white"
      >
        {alt.charAt(0)}
      </Box>
    )
  }

  return (
    <Box
      width="25px"
      height="25px"
      minWidth="25px"
      minHeight="25px"
      marginRight="15px"
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <img
        src={src}
        alt={alt}
        style={{ 
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        onError={() => setError(true)}
      />
    </Box>
  )
}

export function ScoreBoardTeams({ homeTeam, awayTeam }: ScoreBoardTeamsProps) {
  return (
    <Box display="flex" flexDirection="column" flex="1 1" minWidth="0">
      <Box display="flex" marginBottom="0.25rem" alignItems="center">
        <TeamLogo src={homeTeam.logo} alt={homeTeam.name} />
        <Box as="span" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
          {homeTeam.name}
        </Box>
      </Box>
      <Box display="flex" alignItems="center">
        <TeamLogo src={awayTeam.logo} alt={awayTeam.name} />
        <Box as="span" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
          {awayTeam.name}
        </Box>
      </Box>
    </Box>
  )
}