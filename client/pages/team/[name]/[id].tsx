import { useRouter } from 'next/router'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { Team } from '../../../components/team'
import { Flex, Box, Text } from '@chakra-ui/layout'
import { Avatar, Heading } from '@chakra-ui/react'
import { Card } from '../../../components/card'
import { formatSlug } from '../../../lib/string'
import { useQuery } from '@tanstack/react-query'
import { TeamFixtures } from '../../../components/team/team-fixtures'
import { getFixturesByTeamId, getNewsByTeam } from '../../../lib/api-helpers'

interface TeamPageProps {
  fixtures: any
}

export default function TeamPage({ fixtures }: TeamPageProps) {
  const router = useRouter()
  const { id, name } = router.query as any

  console.log('debug props', fixtures)

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        height="45vh"
        backgroundImage="/images/team-hero.jpg"
      >
        <Flex direction="column" gap="1rem" width="1200px" margin="0 auto">
          <Heading
            color="white"
            fontFamily="inherit"
            fontWeight={700}
            fontSize="3rem"
            lineHeight="1"
          >
            {formatSlug(name)}
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
              <TeamFixtures fixtures={fixtures} />
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

export async function getServerSideProps({ params, query }: any) {
  const id = params?.id as string
  const name = params?.name as string
  const page = parseInt(query.page as string) || 1
  const pageSize = parseInt(query.pageSize as string) || 10

  const fixtures = await getFixturesByTeamId({ id, name, page, pageSize })

  return {
    props: {
      fixtures,
    },
  }
}
