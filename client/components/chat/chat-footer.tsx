import { useState } from 'react'
import { Box } from '@chakra-ui/layout'

export const ChatFooter = (): JSX.Element => {
  const [message, setMessage] = useState<string>('')

  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage('')
  }
  return (
    <Box padding="10px" backgroundColor="#f9f5eb" height="10vh">
      <form className="form" onSubmit={(event) => handleSendMessage(event)}>
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
