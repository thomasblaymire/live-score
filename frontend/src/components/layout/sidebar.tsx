import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface SidebarProps {
  children: ReactNode
}

const Sidebar = ({ children }: SidebarProps) => (
  <Box borderRadius="15px">{children}</Box>
)

export default Sidebar
