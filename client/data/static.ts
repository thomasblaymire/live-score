import {
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineTeam,
  AiOutlineDollarCircle,
} from 'react-icons/ai'
import { IoIosFootball } from 'react-icons/io'

export const navItems: NavItem[] = [
  {
    id: 1,
    name: 'Matches',
    href: '/matches',
  },
  {
    id: 2,
    name: 'Teams',
    href: '/teams',
  },
  {
    id: 3,
    name: 'Predict',
    href: '/predict',
    secure: true,
  },
  {
    id: 4,
    name: 'News',
    href: '/news',
  },
  {
    id: 5,
    name: 'Transfers',
    href: '/transfers',
  },
]

export const authMenuItems: NavItem[] = [
  {
    id: 1,
    name: 'Dashboard',
    href: '/dashboard',
    icon: AiOutlineDashboard,
  },
  {
    id: 2,
    name: 'My Account',
    href: '/account',
    icon: AiOutlineUser,
  },
  {
    id: 3,
    name: 'Team',
    href: '/team',
    icon: IoIosFootball,
  },
  {
    id: 4,
    name: 'Payments',
    href: '/payments',
    icon: AiOutlineDollarCircle,
  },
]
