import { useState } from 'react'
import NextImage from 'next/image'
import { Heading, Flex, Text, Box, Grid } from '@chakra-ui/react'
import { ErrorState } from '../components/error'
import { getTeams } from '../lib/api-helpers'

interface TeamsProps {
  teams: AllTeams[]
  error: Error | undefined
}

export default function Teams({ teams, error }: TeamsProps) {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        setSelectedItemIndex((prevIndex) => prevIndex - 4)
        break
      case 'ArrowDown':
        setSelectedItemIndex((prevIndex) => prevIndex + 4)
        break
      case 'ArrowLeft':
        setSelectedItemIndex((prevIndex) => prevIndex - 1)
        break
      case 'ArrowRight':
        setSelectedItemIndex((prevIndex) => prevIndex + 1)
        break
      default:
        break
    }
  }

  const sortedTeams = teams?.sort(
    (a: { team: { name: string } }, b: { team: { name: string } }) =>
      a.team.name.localeCompare(b.team.name)
  )

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        height="45vh"
        background="linear-gradient(to right, #1CB5E0, #000046)"
        sx={{
          height: {
            base: '20vh',
            md: '35vh',
          },
        }}
      >
        <Flex direction="column" gap="1rem" width="1200px" margin="0 auto">
          <Heading
            color="white"
            fontFamily="inherit"
            fontWeight={700}
            fontSize="3rem"
            lineHeight="1"
            padding="0 1rem"
            sx={{
              fontSize: {
                base: '2rem',
                md: '3rem',
              },
            }}
          >
            Teams
          </Heading>
        </Flex>
      </Box>

      <Grid
        templateColumns={{
          base: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        width={{ base: '100%', lg: '1200px' }}
        margin="0 auto"
        marginY="2rem"
        padding={{ base: '1rem' }}
        gap="1rem"
        outline="none"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {error && <ErrorState />}
        {sortedTeams?.map(({ team }: AllTeams, index: number) => {
          return (
            <Box
              borderRadius="5px"
              minHeight="150px"
              key={team.id}
              cursor="pointer"
              padding="1rem"
              color="white"
              background="gray.900"
              bg={index === selectedItemIndex ? '#1a1a1a' : 'gray.900'}
              sx={{
                '&:hover': {
                  bg: '#1a1a1a',
                  cursor: 'pointer',
                },
              }}
            >
              <Flex
                direction="column"
                alignItems="center"
                justifyContent="center"
                height="100%"
                cursor="pointer"
              >
                <NextImage
                  src={team.logo}
                  width="55"
                  height="30"
                  sizes="100vw"
                  style={{ width: '30%', height: 'auto' }}
                  alt={team.name}
                />
                <Text paddingTop="0.5rem">{team.name}</Text>
              </Flex>
            </Box>
          )
        })}
      </Grid>
    </Box>
  )
}

export async function getStaticProps() {
  const { data, error } = await getTeams()

  return {
    props: {
      teams: data,
      error,
    },
  }
}
