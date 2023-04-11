import { keyframes } from '@emotion/react'
import { Badge } from '@chakra-ui/react'

const pulse = keyframes`
0% {
  transform: scale(0.5);
  box-shadow: 0 0 0 0 red;
}
50% {
  transform: scale(0.95);
  box-shadow: 0 0 0 8px rgba(255, 82, 82, 0);
}
100% {
  transform: scale(0.5);
  box-shadow: 0 0 0 0 red;
}
`

export function ScoreBoardStatus() {
  return (
    <Badge
      borderRadius="50%"
      bg="red"
      width="12px"
      height="12px"
      boxShadow="0 0 5px red"
      marginRight="2rem"
      animation={`${pulse} 2s ease-in-out infinite`}
    />
  )
}
