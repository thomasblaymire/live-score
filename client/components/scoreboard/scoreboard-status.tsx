import { Box } from '@chakra-ui/layout'
import { parse } from '../../lib/time'

enum MATCH_STATUS {
  IN_PLAY = 'IN_PLAY',
  FINISHED = 'FINISHED',
  TIMED = 'TIMED',
}

interface ScoreBoardProps {
  status: MATCH_STATUS
  utcDate: string
}

export function ScoreBoardStatus({ status, utcDate }: ScoreBoardProps) {
  const renderStatus = () => {
    switch (status) {
      case MATCH_STATUS.IN_PLAY:
        return (
          <Box
            background="green"
            borderRadius="50%"
            width="10px"
            height="10px"
          />
        )
      case MATCH_STATUS.FINISHED:
        return <span>FT</span>
      case MATCH_STATUS.TIMED:
        return <span>{parse(utcDate)}</span>
      default:
        return <span></span>
    }
  }

  return (
    <Box flex="0 0 50px" flexDirection="column" position="relative">
      {renderStatus()}
    </Box>
  )
}
