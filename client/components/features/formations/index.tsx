import { Box, Text } from '@chakra-ui/react'
import { Circle } from '@chakra-ui/react'

interface Player {
  id: number
  name: string
  number: number
  pos: string
  grid: string
}

interface Team {
  formation: string
  startXI: Player[]
}

interface FormationProps {
  teams: any
}

export function Formations({}: FormationProps) {
  const teams = [
    {
      formation: '4-2-3-1',
      startXI: [
        {
          player: {
            id: 882,
            name: 'David de Gea',
            number: 1,
            pos: 'G',
            grid: '1:1',
          },
        },
        {
          player: {
            id: 889,
            name: 'V. Lindelöf',
            number: 2,
            pos: 'D',
            grid: '2:4',
          },
        },
        {
          player: {
            id: 2935,
            name: 'H. Maguire',
            number: 5,
            pos: 'D',
            grid: '2:3',
          },
        },
        {
          player: {
            id: 891,
            name: 'L. Shaw',
            number: 23,
            pos: 'D',
            grid: '2:2',
          },
        },
        {
          player: {
            id: 18846,
            name: 'A. Wan-Bissaka',
            number: 29,
            pos: 'D',
            grid: '2:1',
          },
        },
        {
          player: {
            id: 905,
            name: 'Fred',
            number: 17,
            pos: 'M',
            grid: '3:2',
          },
        },
        {
          player: {
            id: 899,
            name: 'Andreas Pereira',
            number: 15,
            pos: 'M',
            grid: '3:1',
          },
        },
        {
          player: {
            id: 903,
            name: 'S. McTominay',
            number: 39,
            pos: 'M',
            grid: '4:3',
          },
        },
        {
          player: {
            id: 908,
            name: 'A. Martial',
            number: 9,
            pos: 'F',
            grid: '4:2',
          },
        },
        {
          player: {
            id: 909,
            name: 'M. Rashford',
            number: 10,
            pos: 'M',
            grid: '4:1',
          },
        },
        {
          player: {
            id: 897,
            name: 'M. Greenwood',
            number: 26,
            pos: 'M',
            grid: '5:1',
          },
        },
      ],
    },
  ]

  return (
    <Box
      backgroundImage="url('/images/pitch.svg')"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      width="100%"
      height="400px"
      borderRadius="10px"
      position="relative"
    >
      {teams.map((team, index) => {
        const teamColor = index === 0 ? '#ffffff' : '#ffcb05'
        const sortedStartXI = team.startXI.sort((a, b) => {
          const [rowA, colA] = a.player.grid.split(':')
          const [rowB, colB] = b.player.grid.split(':')
          return parseInt(colA) - parseInt(colB)
        })
        return (
          <Box key={team.formation}>
            <Box
              position="absolute"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Text size="0.7rem" color="white">
                NAME
              </Text>
              <Circle
                style={{ width: '10px', height: '10px' }}
                bg={teamColor}
                borderColor="#000000"
                borderWidth="2px"
                cursor="pointer"
              />
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}
