import { keyframes } from '@emotion/react'
import { Badge } from '@chakra-ui/react'

const pulse = keyframes`
0% {
  transform: scale(0.5);
  box-shadow: 0 0 0 0 #59ff00;
}
50% {
  transform: scale(0.95);
  box-shadow: 0 0 0 4px rgba(255, 82, 82, 0);
}
100% {
  transform: scale(0.5);
  box-shadow: 0 0 0 0 #59ff00;
}
`

export function ScoreBoardStatus() {
  return (
    <Badge
      borderRadius="50%"
      bg="#59ff00"
      width="12px"
      height="12px"
      boxShadow="0 0 5px #59ff00"
      marginRight="2rem"
      animation={`${pulse} 2s ease-in-out infinite`}
    />
  )
}
