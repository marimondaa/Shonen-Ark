import Navbar from '../components/Navbar'

export default function Arcs() {
  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <Navbar />
      <main className="max-w-5xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-4">Featured Arcs</h2>
        <p className="text-gray-400">Explore fan theories and breakdowns by arc across all your favorite shonen series.</p>
        {/* You can later map arcs from JSON/API */}
      </main>
    </div>
  )
}

