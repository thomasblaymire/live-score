import axios from 'axios'
import { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_URL } from '@/lib/constants'

interface Favourite {
  userId: string | undefined
  favItems: FavouriteItem[]
  initialIsFavoritedMap: Record<string, boolean>
}

interface FavouriteItem {
  favType: string
  favTypeId: number
}

interface FavouriteStatusResponse {
  userId: string
  favItems: FavouriteItem[]
}

interface useFavouriteResponse {
  isFavoritedMap: Record<string, boolean>
  toggleFavorite: (
    favType: string,
    favTypeId: number,
    isFavorited: boolean
  ) => void
}

interface MutationVariables extends FavouriteItem {
  userId: string | undefined
  isFavorited: boolean
}

export const useFavourite = ({
  userId,
  favItems,
  initialIsFavoritedMap,
}: Favourite): useFavouriteResponse => {
  const queryClient = useQueryClient()
  const [isFavoritedMap, setFavorited] = useState(initialIsFavoritedMap)

  // Effect to fetch initial favourite status
  useEffect(() => {
    const fetchInitialFavStatus = async () => {
      try {
        const { data } = await axios.post(
          `${API_URL}/favourites/status`,
          {
            userId,
            favItems,
          },
          {
            withCredentials: true,
          }
        )

        // If data is an object like { "Team_63": true }, use it directly
        if (typeof data === 'object' && !Array.isArray(data)) {
          setFavorited(data)
        } else if (Array.isArray(data.favItems)) {
          // Otherwise, if data has a favItems array, create a map from it
          const newFavoritedMap = favItems.reduce((acc, item) => {
            acc[`${item.favType}_${item.favTypeId}`] = Boolean(
              data.favItems.find(
                (favItem: any) =>
                  favItem.favType === item.favType &&
                  favItem.favTypeId === item.favTypeId
              )
            )
            return acc
          }, {} as Record<string, boolean>)

          setFavorited(newFavoritedMap)
        } else {
          console.error('Unexpected response data structure', data)
        }
      } catch (error) {
        console.error('Failed to fetch initial favorite status', error)
      }
    }

    fetchInitialFavStatus()
  }, [userId])

  const toggleFavoriteMutation = useMutation<
    any,
    unknown,
    MutationVariables,
    unknown
  >(
    async ({ isFavorited, ...variables }) => {
      // Depending on the current favourite status, send a POST or DELETE request
      if (isFavorited) {
        const response = await axios.delete(`${API_URL}/favourites`, {
          data: { ...variables },
          withCredentials: true,
        })
        return response.data
      } else {
        const response = await axios.post(
          `${API_URL}/favourites`,
          {
            ...variables,
          },
          {
            withCredentials: true,
          }
        )
        return response.data
      }
    },
    {
      onError: () => {
        console.error('Failed to toggle favorite')
      },
      onSettled: () => {
        // Invalidate queries to refetch the updated favourite status
        queryClient.invalidateQueries({ queryKey: ['favorite'] })
      },
    }
  )

  const toggleFavorite = (
    favType: string,
    favTypeId: number,
    isFavorited: boolean
  ) => {
    // Update the local favourite status map
    const newFavoritedMap = {
      ...isFavoritedMap,
      [`${favType}_${favTypeId}`]: isFavorited,
    }
    setFavorited(newFavoritedMap)

    // Send a mutation request to update favourite status in the server
    toggleFavoriteMutation.mutate({
      userId,
      favType,
      favTypeId,
      isFavorited: !isFavorited,
    })
  }

  // Return the map of favourite status and the function to toggle favourite
  return { isFavoritedMap, toggleFavorite }
}
