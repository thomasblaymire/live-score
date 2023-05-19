import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_URL } from '@/lib/constants'

interface Favourite {
  userId: string | undefined
  favType: string
  favTypeId: string | number
  initialIsFavorited: boolean
}

interface useFavouriteResponse {
  isFavorited: boolean
  toggleFavorite: () => void
}

export const useFavourite = ({
  userId,
  favType,
  favTypeId,
  initialIsFavorited,
}: Favourite): useFavouriteResponse => {
  const queryClient = useQueryClient()
  const [isFavorited, setFavorited] = useState(initialIsFavorited)

  const toggleFavoriteMutation = useMutation(
    () =>
      fetch(`${API_URL}/favourites`, {
        method: isFavorited ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          favType,
          favTypeId,
        }),
      }),
    {
      onError: (error: any) => {
        console.error('Failed to toggle favorite', error)
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['favorite'] })
      },
    }
  )

  const toggleFavorite = () => {
    setFavorited((prevFavorited: any) => !prevFavorited)
    toggleFavoriteMutation.mutate()
  }

  return { isFavorited, toggleFavorite }
}
