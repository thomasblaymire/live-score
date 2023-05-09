import { Box } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/react'

export const ChatBody = () => {
  const handleLeaveChat = () => {
    // localStorage.removeItem('userName');
    // window.location.reload();
  }

  return (
    <>
      <Box
        width="100%"
        height="10vh"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding="20px"
        backgroundColor="#f9f5eb"
      >
        <p>Football Chat</p>
        <Button
          padding="10px"
          width="150px"
          border="none"
          outline="none"
          backgroundColor="#d1512d"
          cursor="pointer"
          color="#eae3d2"
          onClick={handleLeaveChat}
        >
          LEAVE CHAT
        </Button>
      </Box>

      {/*This shows messages sent from you*/}
      <Box
        width="100%"
        backgroundColor="#fff"
        padding="20px"
        overflowY="scroll"
      >
        <div className="message__chats">
          <p className="sender__name">You</p>
          <div className="message__sender">
            <p>Hello there</p>
          </div>
        </div>

        {/*This shows messages received by you*/}
        <div className="message__chats">
          <p>Other</p>
          <div className="message__recipient">
            <p>Hey, Im good, you?</p>
          </div>
        </div>

        {/*This is triggered when a user is typing*/}
        <div className="message__status">
          <p>Someone is typing...</p>
        </div>
      </Box>
    </>
  )
}
