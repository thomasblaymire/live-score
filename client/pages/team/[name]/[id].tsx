import { useState } from 'react'
import { useRouter } from 'next/router'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { Team } from '../../../components/team'
import { Flex, Box, Text } from '@chakra-ui/layout'
import { Avatar, Heading, IconButton } from '@chakra-ui/react'
import { Card } from '../../../components/card'
import { formatSlug } from '../../../lib/string'
import { TeamFixtures } from '../../../components/team/team-fixtures'
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi'
import {
  useTeamFixtures,
  getFixturesByTeamId,
} from '../../../hooks/useTeamFixtures'
import { getNewsByTeam } from '../../../lib/api-helpers'

interface TeamPageProps {
  fixtures: any
}

export default function TeamPage({ fixtures }: TeamPageProps) {
  const router = useRouter()
  const { name } = router.query as any

  const [currentPage, setCurrentPage] = useState(1)

  const {
    data: fetchedFixtures,
    isLoading,
    error,
    refetch,
  } = useTeamFixtures({
    teamId: router.query.id as string,
    page: currentPage,
    pageSize: 10,
  })

  const displayedFixtures = currentPage === 1 ? fixtures : fetchedFixtures

  console.log('debug displayedFixtures', displayedFixtures)

  const handlePagination = (direction: 'next' | 'prev') => {
    const nextPage = direction === 'next' ? currentPage + 1 : currentPage - 1

    if (nextPage >= 1) {
      setCurrentPage(nextPage)
      refetch()
    }
  }

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
        style={{
          maxWidth: 1400,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {isLoading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>Error: {error}</Text>
        ) : (
          <TeamFixtures fixtures={displayedFixtures} />
        )}

        {/* <Box width="40%">
          <Card
            heading="News"
            headingAlign="left"
            background="#121212"
            height="45vh"
            radius="15px"
          > */}
        {/* {news.data.map((article: any, i: number) => (
                <Box fontSize="0.75rem" color="white" padding="1rem" key={i}>
                  {article.title}
                </Box>
              ))} */}
        {/* </Card>
        </Box> */}
      </Box>
    </>
  )
}

export async function getServerSideProps({ params, query }: any) {
  const id = params?.id as string
  const page = parseInt(query.page as string) || 1
  const pageSize = parseInt(query.pageSize as string) || 10

  const fixtures = await getFixturesByTeamId({ id, page, pageSize })

  return {
    props: {
      fixtures,
    },
  }
}

{
  /* <Flex justifyContent="space-between" paddingX="0.5rem">
<IconButton
  background="transparent"
  sx={{
    '&:hover': {
      background: 'transparent',
    },
  }}
  aria-label="Previous Fixtures"
  icon={<HiChevronLeft />}
  onClick={() => handlePagination('prev')}
/>
<IconButton
  background="transparent"
  sx={{
    '&:hover': {
      background: 'transparent',
    },
  }}
  aria-label="Next Fixtures"
  icon={<HiChevronRight />}
  onClick={() => handlePagination('next')}
/>
</Flex> */
}
