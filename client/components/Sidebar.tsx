import { useState } from 'react'
import { useQuery } from 'react-query'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { Box, List, ListItem, Text, Divider } from '@chakra-ui/layout'
import { MdSearch } from 'react-icons/md'
import {
  Stack,
  Skeleton,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { getCompetitions } from '../lib/competitions'

const Sidebar = ({ children }) => {
  return (
    <Box
      width="100%"
      border="solid 1px"
      borderColor="gray.800"
      borderRadius="15px"
    >
      {children}
    </Box>
  )
}

export default Sidebar
