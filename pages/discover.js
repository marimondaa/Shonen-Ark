import Navbar from '../components/Navbar'

export default function Discover() {
  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <Navbar />
      <main className="max-w-5xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-4">AI Discovery</h2>
        <p className="text-gray-400">See what's trending with AI-enhanced insights, character analysis, and fan-powered theories.</p>
      </main>
    </div>
  )
}

