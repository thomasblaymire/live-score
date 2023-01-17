import Image from 'next/image'
import {
  Table,
  Thead,
  Td,
  Th,
  Tr,
  Tbody,
  IconButton,
  Flex,
  Text,
} from '@chakra-ui/react'
import { Box } from '@chakra-ui/layout'
import Link from 'next/link'

export function Standings({ standings }: any) {
  console.log('debug standings', standings)
  return (
    <div>
      <Table variant="unstyled">
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
          {standings.map((standing: any, i: any) => (
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
                    src={standing.team.crest}
                  />
                  <Text marginLeft="10px"> {standing.team.name}</Text>
                </Flex>
              </Td>

              <Td>{standing.goalsFor}</Td>
              <Td>{standing.goalsAgainst}</Td>
              <Td>{standing.goalDifference}</Td>
              <Td>{standing.points}</Td>
              <Td>{standing.form}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  )
}
