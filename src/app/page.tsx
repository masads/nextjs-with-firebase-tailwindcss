import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-5 gap-[16rem] ">
      <div className="flex flex-row justify-between items-center w-3/4 py-8">
        <Image
          src="/next.svg"
          alt="Vercel Logo"
          className="p-5 bg-white rounded-full"
          width={100}
          height={60}
          priority
        />
        <Link href="/signup" className="btn-primary" >Get Started</Link>
      </div>
      <div className="flex flex-col justify-center items-center h-full text-center">
        <div className="flex flex-col items-center justify-center mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            nextjs-Firebase-tailwind
          </h1>
          <p className="text-lg md:text-xl mb-8 w-10/12 text-center">
            Welcome to My nextjs-Firebase-tailwind, where personalized communication is just a step away.
            Sign in with Google to unlock a world of tailored experiences.
          </p>
          <Link href="/signup" className="btn-primary">
            Get Started
          </Link>
        </div>
      </div>
    </main>

  )
}
