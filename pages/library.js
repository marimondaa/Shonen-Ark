
import Navbar from '../components/Navbar'

export default function Library() {
  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <Navbar />
      <main className="max-w-5xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-4">Library</h2>
        <p className="text-gray-400">Browse past newsletters, magazines, and exclusive fan content.</p>
      </main>
    </div>
  )
}
