import { useMutation, useQuery } from 'react-query'
import { getFavourites, addFavourite } from '../lib/api-helpers'
import { Box } from '@chakra-ui/layout'
import { useState, useEffect } from 'react'
import { Icon, useToast } from '@chakra-ui/react'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

interface FavouriteProps {
  userId: number | undefined | unknown
  fixture: Fixture
}

export function Favourite({ fixture, userId }: FavouriteProps): JSX.Element {
  const [favourites, setFavourites] = useState<Number[]>([])
  const toast = useToast()

  const { data } = useQuery<FavouriteMatches, Error>({
    queryKey: ['favourites'],
    queryFn: getFavourites,
  })

  const mutation = useMutation({
    mutationFn: (id: number) => addFavourite(id, userId),
  })

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
    if (favouriteMatchIds)
      setFavourites((prevFavourites) => [
        ...prevFavourites,
        ...favouriteMatchIds,
      ])
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
      setFavourites(favourites.concat(id))
      mutation.mutate(id)
    }
  }

  const removeFavorite = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    event.preventDefault()

    event.preventDefault()
    mutation.mutate(id)

    const arr = favourites
    arr.splice(favourites.indexOf(id), 1)
    setFavourites([...arr])
  }

  return (
    <Box flex="0 0 50px" flexDirection="column" position="relative">
      {favourites.includes(fixture.id) ? (
        <button
          type="button"
          onClick={(event) => removeFavorite(event, fixture.id)}
        >
          <Icon as={AiFillStar} boxSize={5} fill="#029143" />
        </button>
      ) : (
        <button
          type="button"
          onClick={(event) => addToFavorite(event, fixture.id)}
        >
          <Icon as={AiOutlineStar} boxSize={5} />
        </button>
      )}
    </Box>
  )
}
