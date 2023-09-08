import Image from "next/image"
import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col justify-center items-center ">
      <div className="flex flex-col gap-10 justify-center items-center rounded-3xl bg-white px-16 py-10 m-2">
        <Link href="/"><Image
          src="/next.svg"
          alt="Vercel Logo"
          className=""
          width={100}
          height={50}
          priority
        /></Link>
        {children}
      </div>
    </div>
  )
}
