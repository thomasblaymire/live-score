import NextImage from 'next/image'
import Link from 'next/link'

export function Logo() {
  return (
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
  )
}
