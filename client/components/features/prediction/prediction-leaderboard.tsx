import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { FaCrown } from 'react-icons/fa'

interface PredictionLeaderboardProps {
  users: any[]
}

export function PredictionLeaderboard({ users }: PredictionLeaderboardProps) {
  return (
    <Box padding="1.5rem">
      {users.map((user: any, index: number) => (
        <Flex
          key={user.id}
          alignItems="center"
          justifyContent="space-between"
          mb={3}
          p={3}
          borderRadius="md"
          bg={index === 0 ? 'gray.700' : 'gray.800'}
        >
          <Flex alignItems="center">
            {index === 0 && (
              <Box mr={2}>
                <FaCrown color="gold" />
              </Box>
            )}
            <Image
              src={user.profilePicture}
              alt={user.username}
              boxSize="40px"
              borderRadius="full"
              mr={3}
            />
            <Text fontSize="sm" fontWeight="500" color="#FFF">
              {user.username}
            </Text>
          </Flex>
          <Text fontSize="md" fontWeight="bold">
            {user.points} points
          </Text>
        </Flex>
      ))}
    </Box>
  )
}
