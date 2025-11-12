import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="block w-[150px] md:w-[170px]">
      <Image
        src="/logo.svg"
        width={160}
        height={50}
        priority
        alt="Live Score Logo"
        className="w-full h-auto"
      />
    </Link>
  );
}
