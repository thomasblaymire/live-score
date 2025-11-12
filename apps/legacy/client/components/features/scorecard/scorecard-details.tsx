import { ReactElement } from 'react'
import { Flex, Text } from '@chakra-ui/layout'

interface ScoreCardProps {
  icon: ReactElement
  detail: string
}

export function ScoreCardDetail({ icon, detail }: ScoreCardProps) {
  return (
    <Flex alignItems="center">
      {icon}
      <Text marginLeft="0.5rem">{detail}</Text>
    </Flex>
  )
}
