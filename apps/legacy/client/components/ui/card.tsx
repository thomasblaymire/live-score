import { Box, Heading } from '@chakra-ui/layout'
import { ResponsiveValue } from '@chakra-ui/react'

interface CardProps {
  heading?: string | undefined
  background?: string
  radius?: string
  height?: string
  border?: string
  headingAlign?: ResponsiveValue<any> | undefined
  children?: React.ReactNode
  color?: string
  margin?: string
  width?: string
}

export function Card({
  heading,
  background = '#121212',
  border = 'solid 1px #353945;',
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
      border={border}
      margin={margin}
      width={width}
    >
      {heading ? (
        <>
          <Box
            padding="1rem 1.5rem"
            borderBottom="solid 1px #353945"
            borderTopLeftRadius="16px"
            borderTopRightRadius="16px"
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
