import Image from 'next/image'
import { useRouter } from 'next/router'
import {
  Table,
  TableContainer,
  Thead,
  Td,
  Th,
  Tr,
  Tbody,
  Flex,
  Text,
  Box,
} from '@chakra-ui/react'
import { SkeletonLoading } from '@/components/ui/skeleton'
import { ErrorState } from '@/components/ui/error'

interface StandingsProps {
  size?: string
  width?: string
  leagueId?: string
  standings: Standings
}

export function StandingsTable({ size, width, standings }: StandingsProps) {
  const router = useRouter()
  const isLoading = false

  const handleTeamSelection = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    team: Team
  ) => {
    event.preventDefault()
    const name = `${team.name}`.replace(/\s+/g, '_').toLowerCase()
    const id = team.id
    router.push(`/team/${name}/${id}`)
  }

  if (!standings || !Array.isArray(standings.league)) {
    return <ErrorState message="Standings data is not available." />
  }

  return (
    <Box width={width}>
      <TableContainer overflowX="scroll">
        <SkeletonLoading loading={isLoading} ammount={12} height="35px" />
        {standings.league && (
          <Table
            variant="unstyled"
            color="white"
            borderRadius="15px"
            size={size}
          >
            <Thead borderBottom="1px solid" borderColor="rgba(255,255,255,0.2)">
              <Tr>
                <Th>#</Th>
                <Th>Team</Th>
                <Th>GF</Th>
                <Th>GA</Th>
                <Th>GD</Th>
                <Th>PTS</Th>
                <Th>Form</Th>
              </Tr>
            </Thead>
            <Tbody>
              <SkeletonLoading loading={isLoading} ammount={12} height="35px" />
              {standings.league.map((standing: Standings, i: number) => (
                <Tr
                  sx={{
                    transition: 'all .3s',
                    '&:hover': {
                      bg: 'rgba(255,255,255,0.1)',
                    },
                  }}
                  key={standing.team.id}
                  onClick={(event) => handleTeamSelection(event, standing.team)}
                  cursor="pointer"
                >
                  <Td>{i + 1}</Td>
                  <Td verticalAlign="middle">
                    <Flex align="center">
                      <Image
                        width={20}
                        alt={standing.team.name}
                        height={20}
                        src={standing.team.logo}
                      />
                      <Text marginLeft="10px"> {standing.team.name}</Text>
                    </Flex>
                  </Td>

                  <Td>{standing.all.goals.for}</Td>
                  <Td>{standing.all.goals.against}</Td>
                  <Td>{standing.goalsDiff}</Td>
                  <Td>{standing.points}</Td>
                  <Td>{standing.form}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </TableContainer>
    </Box>
  )
}
