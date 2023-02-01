import { Box, Heading } from '@chakra-ui/layout'

interface CardProps {
  heading: string
  background?: string
  radius?: string
  height?: string
  children: React.ReactNode
  color?: string
  margin?: string
}

export function Card({
  heading,
  background = '#121212',
  radius = '15px',
  children,
  color = '#FFFFFF',
  margin,
}: CardProps) {
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
