import NextImage from 'next/image'
import Link from 'next/link'
import { Box } from '@chakra-ui/react'

export function Logo() {
  return (
    <Box w={{ base: '150px', md: '170px' }}>
      <Link href="/" passHref>
        <NextImage
          src="/logo.svg"
          width={160}
          height={50}
          sizes="100vw"
          priority
          style={{ width: '100%', height: 'auto' }}
          alt="Currentscore Live Logo"
        />
      </Link>
    </Box>
  )
}
