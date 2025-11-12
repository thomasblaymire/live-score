import { Box, Text } from '@chakra-ui/layout'

export const ChatBar = () => {
  return (
    <Box
      height="100%"
      backgroundColor="#f9f5eb"
      flex="0.2"
      padding="20px"
      borderRight="1px solid #fdfdfd"
    >
      <h2>Open Chat</h2>
      <div>
        <Text margin="30px 0 20px 0">ACTIVE USERS</Text>
        <Box marginBottom="10px" color="#607eaa" fontSize="14px">
          <p>User 1</p>
          <p>User 2</p>
          <p>User 3</p>
          <p>User 4</p>
        </Box>
      </div>
    </Box>
  )
}
