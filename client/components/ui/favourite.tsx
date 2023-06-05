import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { IconButton } from '@chakra-ui/react'

interface FavoriteButtonProps {
  isFavorited: boolean
  onClick: () => void
}

export const FavoriteButton = ({
  isFavorited,
  onClick,
}: FavoriteButtonProps) => {
  return (
    <IconButton
      variant="unstyled"
      isRound={false}
      m={0}
      p={0}
      minW={0}
      aria-label="Add to favorites"
      icon={isFavorited ? <AiFillHeart fill="red" /> : <AiOutlineHeart />}
      onClick={onClick}
    />
  )
}
