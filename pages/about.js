import Navbar from '../components/Navbar'

export default function About() {
  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-4">About Shonen Ark</h2>
        <p className="text-gray-400">Shonen Ark is an AI-powered fan platform for deep dives, community commentary, and arc breakdowns across top anime/manga series.</p>
      </main>
    </div>
  )
}
