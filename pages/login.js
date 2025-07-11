import Navbar from '../components/Navbar'

export default function Login() {
  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-[70vh] px-6">
        <h2 className="text-2xl font-bold mb-4">Login to Shonen Ark</h2>
        <input type="email" placeholder="Email" className="p-2 rounded mb-2 w-full max-w-sm text-black" />
        <input type="password" placeholder="Password" className="p-2 rounded mb-4 w-full max-w-sm text-black" />
        <button className="bg-red-500 px-6 py-2 rounded text-white font-semibold">Login</button>
      </main>
    </div>
  )
}
