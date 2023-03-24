import { getFavourites, addFavourite } from '../lib/api-helpers'
import { useState, useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Box, Icon, useToast } from '@chakra-ui/react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

interface FavouriteMatch {
  matchId: number
}

interface FavouriteMatches {
  favourites: FavouriteMatch[]
}

interface FavouriteProps {
  fixture: { id: number }
  userId: number
}

export function Favourite({ fixture, userId }: FavouriteProps): JSX.Element {
  const [favourites, setFavourites] = useState<number[]>([])
  const toast = useToast()

  const { data } = useQuery<FavouriteMatches>({
    queryKey: ['favourites'],
    queryFn: getFavourites,
  })

  const mutation = useMutation((id: number) => addFavourite(id, userId))

  useEffect(() => {
    if (data?.favourites && userId) {
      updateMatchState(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, userId])

  const updateMatchState = (data: FavouriteMatches) => {
    const favouriteMatchIds = data.favourites.map(
      (match: FavouriteMatch) => match.matchId
    )
    setFavourites(favouriteMatchIds)
  }

  const addToFavorite = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    event.preventDefault()
    if (!userId) {
      return toast({
        title: 'Unable to add to favorites',
        description: 'Please create an account to get started.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }

    if (!favourites.includes(id)) {
      setFavourites((prevFavourites) => [...prevFavourites, id])
      mutation.mutate(id)
    }
  }

  const removeFavorite = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    event.preventDefault()

    mutation.mutate(id)

    const updatedFavourites = favourites.filter(
      (favouriteId) => favouriteId !== id
    )
    setFavourites(updatedFavourites)
  }

  return (
    <Box flex="0 0 50px" flexDirection="column" position="relative">
      <button
        type="button"
        style={{ display: 'flex' }}
        onClick={(event) =>
          favourites.includes(fixture.id)
            ? removeFavorite(event, fixture.id)
            : addToFavorite(event, fixture.id)
        }
      >
        <Icon
          as={favourites.includes(fixture.id) ? AiFillStar : AiOutlineStar}
          boxSize={5}
          fill={favourites.includes(fixture.id) ? '#029143' : undefined}
        />
      </button>
    </Box>
  )
}
