import { Card, CardHeader, CardFooter, Avatar, Button } from '@chakra-ui/react'
import { Flex, Box, Text } from '@chakra-ui/layout'
import { BiLike, BiChat, BiShare } from 'react-icons/bi'

export function ScoreCard({ homeTeam, awayTeam, score }: any) {
  return (
    <Card maxW="md" border="solid 0.5px #eee">
      <CardHeader>
        <Flex width="100%" justifyContent="center">
          <Flex
            alignItems="center"
            color="gray.500"
            width="100%"
            justifyContent="space-evenly"
          >
            <Flex alignItems="center" direction="column">
              <Avatar
                name={homeTeam.name}
                size="sm"
                marginBottom="0.5rem"
                src={homeTeam.crest}
              />
              <Text>{homeTeam.name}</Text>
            </Flex>

            <Box>
              <Flex>
                <Box>{score.fullTime.home}</Box>
                <Box>{score.fullTime.away}</Box>
              </Flex>
            </Box>

            <Flex alignItems="center" direction="column">
              <Avatar
                name={awayTeam.name}
                size="sm"
                marginBottom="0.5rem"
                src={awayTeam.crest}
              />
              <Text>{awayTeam.name}</Text>
            </Flex>
          </Flex>
        </Flex>
      </CardHeader>

      <CardFooter
        justify="space-between"
        color="gray.500"
        sx={{
          '& > button': {
            minW: '136px',
          },
        }}
      >
        <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
          Like
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
          Comment
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
          Share
        </Button>
      </CardFooter>
    </Card>
  )
}
