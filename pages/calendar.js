import Navbar from '../components/Navbar'

export default function Calendar() {
  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <Navbar />
      <main className="max-w-5xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-4">Release Calendar</h2>
        <p className="text-gray-400">Track upcoming chapter and episode drops. Stay ahead of the arc.</p>
      </main>
    </div>
  )
}

