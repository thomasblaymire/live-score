import { Box, Heading, Divider, Text } from '@chakra-ui/layout'

export function Card({
  heading,
  background,
  radius,
  children,
  color,
  margin,
}: any) {
  return (
    <Box
      background={background}
      borderRadius={radius}
      margin={margin}
      minHeight="300px"
    >
      {heading ? (
        <>
          <Box
            padding="1rem 1.5rem"
            background="#1F1F1F"
            borderTopLeftRadius="15px"
            borderTopRightRadius="15px"
          >
            <Heading color={color} fontSize="1rem" fontFamily="inherit">
              {heading}
            </Heading>
          </Box>
        </>
      ) : null}

      {children}
    </Box>
  )
}
