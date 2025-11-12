import { Flex, Box, Text } from '@chakra-ui/layout'
import { Avatar, Heading } from '@chakra-ui/react'
import { Card } from '@/components/ui/card'
import { formatSlug } from '@/lib/string'
import { useQuery } from '@tanstack/react-query'
import { TeamFixtures } from './team-fixtures'
import { getNewsByTeam } from '@/lib/api-helpers'

export function Team({ id }: { id: string }) {
  // const {
  //   data: matches,
  //   isLoading: isLoadingMatches,
  //   isError: isErrorMatches,
  // } = useQuery({
  //   queryKey: ['teamFixtures'],
  //   queryFn: () => getMatchesByTeamName(id),
  // })

  const {
    data: news,
    isLoading: isLoadingNews,
    isError: isErrorNews,
  } = useQuery({
    queryKey: ['teamNews'],
    queryFn: () => getNewsByTeam(id, 1, 5),
  })

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        height="45vh"
        background="linear-gradient(to right, #1CB5E0, #000046)"
      >
        <Flex direction="column" gap="1rem" width="1200px" margin="0 auto">
          <Heading
            color="white"
            fontFamily="inherit"
            fontWeight={700}
            fontSize="3rem"
            lineHeight="1"
          >
            {formatSlug(id)}
          </Heading>
        </Flex>
      </Box>

      <Box
        marginTop={{ base: '1rem', md: '3rem' }}
        width="1200px"
        height="400vh"
        margin="0 auto"
      >
        <Flex justifyContent="center" gap="1.5rem" paddingBottom="2.5rem">
          <Box width="100%"></Box>
        </Flex>

        <Flex justifyContent="center" gap="1.5rem" paddingBottom="2.5rem">
          <Box width="60%">
            <Card
              heading="Latest Fixtures"
              headingAlign="left"
              background="#121212"
              height="45vh"
              radius="15px"
            >
              {/* <TeamFixtures
                fixtures={matches.response}
                isError={isErrorMatches}
                isLoading={isLoadingMatches}
              /> */}
            </Card>
          </Box>

          <Box width="40%">
            <Card
              heading="News"
              headingAlign="left"
              background="#121212"
              height="45vh"
              radius="15px"
            >
              {/* {news.data.map((article: any, i: number) => (
                <Box fontSize="0.75rem" color="white" padding="1rem" key={i}>
                  {article.title}
                </Box>
              ))} */}
            </Card>
          </Box>
        </Flex>
      </Box>
    </>
  )
}
