import { Flex, Box } from '@chakra-ui/layout'
import { useRouter } from 'next/router'
import { Player } from '../../components/player'

export default function Match() {
  const router = useRouter()
  const { match } = router.query

  console.log('deubg', match)

  return (
    <Flex
      marginTop={{ base: '1rem', md: '3rem' }}
      paddingX={{ md: '4rem' }}
      justifyContent="space-between"
      flexWrap="wrap"
    >
      <Box>
        <Player embedId="KReP8jeUgJE" />
      </Box>
      <Box minWidth="450px">
        <Box marginBottom="2rem" background="blue">
          ScoreCard
        </Box>

        <Box>Live Chat</Box>
      </Box>
    </Flex>
  )
}
