import { useMutation, useQuery } from 'react-query'
import { getFavourites, addFavourite } from '../lib/api-helpers'
import { Favourite, Fixture } from '../types'
import { Box } from '@chakra-ui/layout'
import { useState, ChangeEvent, useEffect } from 'react'
import { Icon, useToast } from '@chakra-ui/react'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

interface FavouriteProps {
  userId: string
  fixture: Fixture
}

export function Favourite({ fixture, userId }: FavouriteProps) {
  const [favourites, setFavourites] = useState<Favourite>([])
  const toast = useToast()

  console.log('debug fixture', fixture)

  const { data } = useQuery({
    queryKey: ['favourites'],
    queryFn: getFavourites,
  })

  const mutation = useMutation({
    mutationFn: (id: number) => addFavourite(id, userId),
  })

  useEffect(() => {
    if (data && userId) {
      const favouriteMatches = data.map((match: any) => match.matchId)
      const updatedMatches = [...favourites, ...favouriteMatches]
      if (favouriteMatches) setFavourites(updatedMatches)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, userId])

  const addToFavorite = (e: any, id: number) => {
    e.preventDefault()
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
      console.log('debug id', id)
      mutation.mutate(id)
    }
  }

  const removeFavorite = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    e.preventDefault()
    const arr = favourites
    arr.splice(favourites.indexOf(id), 1)
    setFavourites([...arr])
  }

  return (
    <Box flex="0 0 50px" flexDirection="column" position="relative">
      {favourites.includes(fixture.id) ? (
        <button
          type="button"
          onClick={(e: any) => removeFavorite(e, fixture.id)}
        >
          <Icon as={AiFillStar} boxSize={5} fill="#029143" />
        </button>
      ) : (
        <button type="button" onClick={(e) => addToFavorite(e, fixture.id)}>
          <Icon as={AiOutlineStar} boxSize={5} />
        </button>
      )}
    </Box>
  )
}
