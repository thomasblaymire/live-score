import Image from 'next/image'
import Link from 'next/link'

export function Logo() {
  return (
    <Link href="/" passHref>
      <Image
        src="/logo.svg"
        alt="Live Score Logo"
        width={170}
        height={50}
        priority
      />
    </Link>
  )
}
