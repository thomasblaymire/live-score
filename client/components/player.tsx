import { Box } from '@chakra-ui/layout'

export function Player({ embedId }: any) {
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
