import NextImage from 'next/image'
import { Flex, Box, Avatar, Heading, Grid, Text } from '@chakra-ui/react'
import { formatUTCDate } from '../../lib/time'
import { Carousel } from '../carousel/Carousel'

interface TeamFixturesProps {
  fixtures: any
  isError?: any
  isLoading?: any
}

const getMatchTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toTimeString().slice(0, 5)
}

export function TeamFixtures({
  fixtures,
  isLoading,
  isError,
}: TeamFixturesProps) {
  return (
    <Box>
      {fixtures ? <Carousel items={fixtures} show={4} step={2} /> : null}
    </Box>

    // <Flex gap="1rem">
    //   {fixtures.map((fixture: any, i: number) => (
    //     <Box key={fixture.id} marginBottom="1rem" background="#1a1a1a">
    //       <Box
    //         textAlign="center"
    //         color="white"
    //         paddingY="1rem"
    //         fontSize="0.8rem"
    //       >
    //         <Box>
    //           <h4>{formatUTCDate(fixture.date)}</h4>
    //         </Box>
    //         <Box>
    //           <p>{fixture.league.name}</p>
    //         </Box>
    //       </Box>

    //       <Flex
    //         justifyContent="space-between"
    //         paddingY="1rem"
    //         key={i}
    //         color="white"
    //         padding="1rem"
    //         fontWeight="500"
    //       >
    //         <Box flex="1" mr="2">
    //           <Box>
    //             <NextImage
    //               src={fixture.homeTeam.logo}
    //               color="white"
    //               alt={fixture.homeTeam.name}
    //               width={25}
    //               height={25}
    //               style={{ marginRight: '15px' }}
    //             />
    //             <Text align="right">{fixture.homeTeam.name}</Text>
    //           </Box>
    //         </Box>
    //         <Box flex="1" mx="2" textAlign="center">
    //           {getMatchTime(fixture.date)}
    //         </Box>
    //         <Box flex="1" ml="2">
    //           <Flex alignItems="center">
    //             <Box>
    //               <NextImage
    //                 src={fixture.awayTeam.logo}
    //                 color="white"
    //                 alt={fixture.awayTeam.name}
    //                 width={25}
    //                 height={25}
    //                 style={{ marginRight: '15px' }}
    //               />
    //               <Text align="left">{fixture.awayTeam.name}</Text>
    //             </Box>
    //           </Flex>
    //         </Box>
    //       </Flex>
    //     </Box>
    //   ))}
    // </Flex>
  )
}
