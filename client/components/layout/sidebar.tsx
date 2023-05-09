import { ReactNode } from 'react'
import { Box } from '@chakra-ui/layout'

interface SidebarProps {
  children: ReactNode
}

const Sidebar = ({ children }: SidebarProps) => (
  <Box borderRadius="15px">{children}</Box>
)

export default Sidebar
