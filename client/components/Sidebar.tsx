import { Box } from '@chakra-ui/layout'
import React from 'react'

interface SidebarProps {
  children: React.ReactNode
}

const Sidebar = ({ children }: SidebarProps) => (
  <Box borderRadius="15px">{children}</Box>
)

export default Sidebar
