import { Divider, Heading } from '@chakra-ui/react'

interface CategoryProps {
  title: string
  children: React.ReactNode[]
}

export function Category({ title, children }: CategoryProps) {
  return (
    <>
      {children && children.length > 0 && (
        <>
          <Divider py="0.25rem" color="#353945" mb="0.25rem" />
          <Heading
            fontSize="0.9rem"
            fontFamily="inherit"
            color="gray.500"
            marginY="1rem"
          >
            {title}
          </Heading>
          {children}
        </>
      )}
    </>
  )
}
