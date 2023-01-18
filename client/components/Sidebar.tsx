import { Box } from '@chakra-ui/layout'
import React from 'react'

interface SidebarProps {
  children: React.ReactNode
}

const Sidebar = ({ children }: SidebarProps) => (
  <Box width="100%" borderRadius="15px">
    {children}
  </Box>
)

export default Sidebar
