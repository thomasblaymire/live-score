import Image from 'next/image'
import {
  Box,
  Table,
  TableContainer,
  Thead,
  Td,
  Th,
  Tr,
  Tbody,
  Flex,
  Text,
} from '@chakra-ui/react'

interface TopScorersProps {
  players: TopScorer[]
}

export function TopScorers({ players }: TopScorersProps) {
  return (
    <Box>
      <TableContainer overflowX="scroll">
        <Table variant="unstyled" color="white" borderRadius="15px" size="sm">
          <Thead borderBottom="1px solid" borderColor="rgba(255,255,255,0.2)">
            <Tr>
              <Th>#</Th>
              <Th>Player</Th>
              <Th>Goals</Th>
            </Tr>
          </Thead>
          <Tbody>
            {players.map((player: TopScorer, i: number) => (
              <Tr
                sx={{
                  transition: 'all .3s',
                  '&:hover': {
                    bg: 'rgba(255,255,255,0.1)',
                  },
                }}
                key={i}
                // onClick={(e) => handleTeamSelection(e, standing.team)}
                cursor="pointer"
              >
                <Td>{i + 1}</Td>
                <Td>
                  <Flex align="center">
                    <Box borderRadius="50px">
                      <Image
                        src={player.player.photo}
                        alt={player.player.name}
                        style={{ borderRadius: '50px' }}
                        width={25}
                        height={25}
                      />
                    </Box>
                    <Flex direction="column" marginLeft="1rem">
                      <Text>{player.player.name}</Text>
                      <Text>{player.statistics[0].team.name}</Text>
                    </Flex>
                  </Flex>
                </Td>

                <Td>{player.statistics[0].goals.total}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* {players.map((player: any, i: any) => (
        <Box key={i} width="300px">
          {player.player.name}
          
            {player.statistics[0].goals.total}
          </Box>
        </Box>
      ))} */}
    </Box>
  )
}
