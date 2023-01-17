import { useState } from 'react'
import { Box } from '@chakra-ui/layout'

export const ChatFooter = () => {
  const [message, setMessage] = useState('')

  const handleSendMessage = (e: any) => {
    e.preventDefault()
    console.log({ userName: localStorage.getItem('userName'), message })
    setMessage('')
  }
  return (
    <Box padding="10px" backgroundColor="#f9f5eb" height="10vh">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </Box>
  )
}
