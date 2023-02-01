import { Box } from '@chakra-ui/layout'

interface PlayerProps {
  embedId: string
}

export function Player({ embedId }: PlayerProps) {
  return (
    <Box>
      <iframe
        width="800"
        height="480"
        style={{ borderRadius: '15px' }}
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </Box>
  )
}
