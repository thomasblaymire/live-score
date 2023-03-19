import { Box, IconButton } from '@chakra-ui/react'
import { HiOutlineBell, HiOutlineSearch } from 'react-icons/hi'

export function HeaderIcons({
  handleSearchOpen,
}: {
  handleSearchOpen: () => void
}) {
  return (
    <Box>
      <IconButton
        variant="transparent"
        aria-label="Notification Button"
        data-test="notification-button"
        size="lg"
        icon={<HiOutlineBell />}
      />

      <IconButton
        variant="transparent"
        aria-label="Search Button"
        data-test="search-button"
        size="lg"
        icon={<HiOutlineSearch />}
        onClick={handleSearchOpen}
      />
    </Box>
  )
}
