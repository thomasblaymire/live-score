import { useMutation, useQuery } from 'react-query'
import { getFavourites } from '../lib/api-helpers'
import { Box } from '@chakra-ui/layout'
import { useState, ChangeEvent, useEffect } from 'react'
import { Icon } from '@chakra-ui/react'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

export function Favourite({ fixture, userId }: any) {
  const [favourites, setFavourites]: any = useState([])
  const { data, error, isLoading } = useQuery({
    queryKey: ['favourites'],
    queryFn: getFavourites,
  })

  useEffect(() => {
    if (data) {
      const favouriteMatches = data.map((match: any) => match.matchId)
      const updatedMatches = [...favourites, ...favouriteMatches]
      if (favouriteMatches) setFavourites(updatedMatches)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const mutation = useMutation({
    mutationFn: (id: any) => {
      console.log('debug posting id', id)
      return fetch('http://localhost:3030/api/favourites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ matchId: id, userId: userId }),
      })
    },
    onSuccess: async () => {
      console.log("I'm first!")
    },
    onSettled: async () => {
      console.log("I'm second!")
    },
  })

  const addToFavorite = (e: any, id: number) => {
    e.preventDefault()
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
