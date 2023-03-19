import { Box, Heading } from '@chakra-ui/layout'
import { ResponsiveValue } from '@chakra-ui/react'

interface CardProps {
  heading: string | undefined
  background?: string
  radius?: string
  height?: string
  headingAlign?: ResponsiveValue<any> | undefined
  children: React.ReactNode
  color?: string
  margin?: string
  width?: string
}

export function Card({
  heading,
  background = '#121212',
  headingAlign = 'left',
  radius = '15px',
  children,
  color = '#FFFFFF',
  margin,
  width,
}: CardProps) {
  return (
    <Box
      background={background}
      borderRadius={radius}
      margin={margin}
      width={width}
    >
      {heading ? (
        <>
          <Box
            padding="1rem 1.5rem"
            background="#1F1F1F"
            borderTopLeftRadius="15px"
            borderTopRightRadius="15px"
          >
            <Heading
              color={color}
              fontSize="0.9rem"
              fontWeight="600"
              fontFamily="inherit"
              textAlign={headingAlign}
            >
              {heading}
            </Heading>
          </Box>
        </>
      ) : null}

      {children}
    </Box>
  )
}
