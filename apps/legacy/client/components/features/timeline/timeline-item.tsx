import { Flex, useColorModeValue } from '@chakra-ui/react'
import { FiCheckCircle } from 'react-icons/fi'
import { Box, BoxProps, Circle } from '@chakra-ui/react'

interface TimeLineItemProps extends BoxProps {
  icon?: any
  boxProps?: BoxProps
  first?: boolean
  last?: boolean
  isHomeTeam: boolean
}

export function TimeLineItem({
  icon = FiCheckCircle,
  boxProps = {},
  children,
  first = false,
  last = false,
  isHomeTeam,
  ...props
}: TimeLineItemProps) {
  const color = useColorModeValue('gray.700', 'gray.500')
  const direction = isHomeTeam ? 'row-reverse' : 'row'
  return (
    <Flex
      {...props}
      color="white"
      alignItems="center"
      fontSize="0.8rem"
      fontWeight="500"
      direction={direction}
      justifyContent="flex-end"
      borderTopLeftRadius={first && isHomeTeam ? '15px' : '0'}
      borderTopRightRadius={first && !isHomeTeam ? '15px' : '0'}
      borderBottomLeftRadius={last && isHomeTeam ? '15px' : '0'}
      borderBottomRightRadius={last && !isHomeTeam ? '15px' : '0'}
    >
      <Flex
        flexDir="column"
        alignItems="center"
        marginRight={isHomeTeam ? '0' : '0.5rem'}
        marginLeft={isHomeTeam ? '0.5rem' : '0'}
        pos="relative"
      >
        <Circle
          size={6}
          bg={useColorModeValue('gray.600', 'gray.500')}
          opacity={useColorModeValue(0.07, 0.15)}
        />
        <Box
          as={icon}
          size="1rem"
          color={color}
          pos="absolute"
          left="0.25rem"
          top="0.25rem"
        />
      </Flex>
      <Box {...boxProps}>{children}</Box>
    </Flex>
  )
}
