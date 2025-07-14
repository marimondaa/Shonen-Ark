import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <header className="p-4 border-b border-gray-800 flex justify-between items-center sticky top-0 bg-gray-950 z-50">
      <Link href="/" className="flex items-center">
        <Image 
          src="/images/logo/shonen-ark/symbol-32x32.png" 
          alt="Shonen Ark" 
          width={32} 
          height={32}
          className="mr-2"
        />
        <span className="text-xl font-bold text-red-500 hidden sm:inline">Shonen Ark</span>
      </Link>
      <nav className="space-x-6 text-sm">
        <Link href="/theories" className="hover:text-red-400 transition-colors">Theories</Link>
        <Link href="/discover" className="hover:text-red-400 transition-colors">Discover</Link>
        <Link href="/calendar" className="hover:text-red-400 transition-colors">Calendar</Link>
        <Link href="/about" className="hover:text-red-400 transition-colors">About</Link>
        <Link href="/login" className="hover:text-red-400 transition-colors">Login</Link>
        <Link href="/register" className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition-colors">Join</Link>
      </nav>
    </header>
  )
}

