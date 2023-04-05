import {
  Box,
  IconButton,
  Popover,
  PopoverContent,
  PopoverArrow,
  PopoverTrigger,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from '@chakra-ui/react'
import { HiOutlineBell, HiOutlineSearch } from 'react-icons/hi'

export function HeaderIcons({
  handleSearchOpen,
}: {
  handleSearchOpen: () => void
}) {
  return (
    <Box>
      <Popover>
        <PopoverTrigger>
          <IconButton
            variant="transparent"
            aria-label="Notification Button"
            data-test="notification-button"
            size="lg"
            icon={<HiOutlineBell />}
          />
        </PopoverTrigger>
        <PopoverContent
          background="#121212"
          color="white"
          fontSize="0.85rem"
          p="1rem"
          borderColor="gray.900"
        >
          <PopoverArrow bg="#121212" />
          <PopoverCloseButton />
          <PopoverHeader padding="0.5rem" fontWeight="600">
            Notifications
          </PopoverHeader>
          <PopoverBody padding="0">
            <Box listStyleType="none" margin="0" padding="0.5rem">
              <Box
                padding="0.5rem"
                borderRadius="10px"
                sx={{
                  '&:hover': {
                    bg: '#1a1a1a',
                    cursor: 'pointer',
                  },
                }}
              >
                Account created Succesfully!
              </Box>
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>

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
