import Image from 'next/image'
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
import { Standings } from '../types/index'

interface StandingsProps {
  standings: any
  size?: any
  width?: any
}

export function StandingsTable({ standings, size, width }: StandingsProps) {
  return (
    <Box paddingY="1rem" width={width}>
      <TableContainer overflowX="scroll">
        <Table variant="unstyled" color="white" borderRadius="15px" size={size}>
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
            {standings[0].map((standing: any, i: any) => (
              <Tr
                sx={{
                  transition: 'all .3s',
                  '&:hover': {
                    bg: 'rgba(255,255,255,0.1)',
                  },
                }}
                key={i}
                //onClick => team page
                cursor="pointer"
              >
                <Td>{i + 1}</Td>
                <Td>
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
      </TableContainer>
    </Box>
  )
}
