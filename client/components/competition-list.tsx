import NextImage from 'next/image'
import Link from 'next/link'
import { Box, List, ListItem } from '@chakra-ui/layout'
import { SkeletonLoading } from './skeleton'
import { hypenate } from '../lib/string'
import { ErrorState } from './error'
import { useCompetitions } from '../hooks/useCompetitions'

interface CompetitionListProps {
  competitions: Competitions[]
  isLoading: boolean
  error?: Error | undefined
}

export function CompetitionList({
  competitions,
  isLoading,
  error,
}: CompetitionListProps) {
  return (
    <Box>
      <List
        background="#121212"
        borderBottomLeftRadius="15px"
        borderBottomRightRadius="15px"
        data-test="competition-list"
        sx={{
          'ul:last-child li': {
            borderBottomLeftRadius: '15px',
            borderBottomRightRadius: '15px',
          },
        }}
      >
        <SkeletonLoading loading={isLoading} ammount={12} height="35px" />

        {error && <ErrorState />}

        {competitions?.map((competition: Competitions) => (
          <Link
            key={competition.league.id}
            passHref
            href={{
              pathname: '/league/[league]',
              query: { league: `${hypenate(`${competition.league.name}`)}` },
            }}
          >
            <ListItem
              display="flex"
              alignItems="center"
              paddingY="0.5rem"
              paddingX="0.5rem"
              color="#FFF"
              fontWeight="500"
              fontSize="0.9rem"
              height="60px"
              borderBottom="solid 0.5px"
              borderColor="gray.900"
              sx={{
                '&:hover': {
                  bg: '#1a1a1a',
                  cursor: 'pointer',
                },
              }}
            >
              <Box marginX="10px" width="30px">
                <NextImage
                  src={competition.league.logo}
                  width={30}
                  height={30}
                  style={{ width: 'auto', height: 'auto' }}
                  alt={competition.league.name}
                />
              </Box>
              {competition.league.name}
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  )
}
