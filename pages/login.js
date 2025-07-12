import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Navbar from '../components/Navbar'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Implement NextAuth login logic
    setTimeout(() => setIsLoading(false), 1000) // Simulate loading
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      <Head>
        <title>Login - Shonen Ark</title>
        <meta name="description" content="Login to your Shonen Ark account to access exclusive content and join the community." />
      </Head>

      <Navbar />

      <main className="flex flex-col items-center justify-center min-h-[80vh] px-6">
        <div className="w-full max-w-md">
          {/* Logo/Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-400">Login to continue your shonen journey</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="bg-gray-900 rounded-2xl p-8 shadow-xl">
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-400">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 py-3 rounded-lg font-semibold transition-colors"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </div>

            {/* Social Login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 py-3 rounded-lg font-semibold transition-colors"
                >
                  🔵 Discord
                </button>
                <button
                  type="button"
                  className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 py-3 rounded-lg font-semibold transition-colors"
                >
                  🌐 Google
                </button>
              </div>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-8">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link href="/register" className="text-blue-400 hover:text-blue-300 font-semibold">
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
