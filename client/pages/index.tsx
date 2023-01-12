import Head from 'next/head'
import {
  Container,
  Box,
  Flex,
  ListItem,
  LinkBox,
  Grid,
  GridItem,
} from '@chakra-ui/layout'
import Sidebar from '../components/Sidebar'
import { ScoreBoard } from '../components/Scoreboard'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Flex h="200px" marginTop="3rem" paddingX="4rem">
      <Box>
        <Sidebar />
      </Box>
      <Box flex="1 1 auto">{/* <ScoreBoard /> */}</Box>
      <Box>
        <Sidebar />
      </Box>
    </Flex>
  )
}
