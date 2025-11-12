import { Box, AspectRatio } from '@chakra-ui/react'

interface MatchVideoProps {
  embedId: string
}

export function MatchVideo({ embedId }: MatchVideoProps) {
  return (
    <Box>
      <AspectRatio ratio={16 / 9} maxW="100%">
        <iframe
          src={`https://www.youtube.com/embed/${embedId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
          style={{
            borderBottomLeftRadius: '15px',
            borderBottomRightRadius: '15px',
          }}
        />
      </AspectRatio>
    </Box>
  )
}
