import Navbar from '../components/Navbar'

export default function Terms() {
  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-4">Terms & Conditions</h2>
        <p className="text-gray-400">Standard legal terms for users, content uploads, and AI-generated data on Shonen Ark.</p>
      </main>
    </div>
  )
}
