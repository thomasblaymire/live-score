import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { Box } from '@chakra-ui/layout'
import { ChatBar } from './chat-bar'
import { ChatBody } from './chat-body'
import { ChatFooter } from './chat-footer'

const socket = io('http://localhost:3030')

export function LiveChat() {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [lastPong, setLastPong] = useState(null)

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true)
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
    })

    socket.on('pong', () => {
      setLastPong(new Date().toISOString() as any)
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('pong')
    }
  }, [])

  const sendPing = () => {
    socket.emit('ping')
  }

  return (
    <div>
      {/* {data?.user.name ? } */}
      <Box width="100%" height="100%" display="flex" alignItems="center">
        {/* <ChatBar /> */}
        <Box height="100%" width="100%">
          <ChatBody />
          <ChatFooter />
        </Box>
      </Box>
      {/* <p>Connected: {'' + isConnected}</p>
      <p>Last pong: {lastPong || '-'}</p>
      <button onClick={sendPing}>Send ping</button> */}
    </div>
  )
}
