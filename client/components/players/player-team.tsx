import { Flex, Text } from '@chakra-ui/layout'
import { Avatar } from '@chakra-ui/react'

interface PlayerTeamProps {
  name: string
  logo: string
  alignment?: string
}

export function PlayerTeam({ name, logo, alignment }: PlayerTeamProps) {
  const renderText = () => (
    <Text fontWeight="500" color="white" paddingRight="0.5rem">
      {name}
    </Text>
  )

  return (
    <Flex align="center">
      {alignment === 'left' && renderText()}
      <Avatar
        name="Coach"
        size="sm"
        marginBottom="0.5rem"
        src={logo}
        marginRight="0.5rem"
      />
      {!alignment && renderText()}
    </Flex>
  )
}
