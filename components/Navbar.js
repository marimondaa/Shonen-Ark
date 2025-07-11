import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="p-4 border-b border-gray-800 flex justify-between items-center sticky top-0 bg-gray-950 z-50">
      <h1 className="text-2xl font-bold text-red-500">Shonen Ark</h1>
      <nav className="space-x-6 text-sm">
        <Link href="/arcs">Arcs</Link>
        <Link href="/discover">Discover</Link>
        <Link href="/calendar">Calendar</Link>
        <Link href="/library">Library</Link>
        <Link href="/login">Login</Link>
      </nav>
    </header>
  )
}

