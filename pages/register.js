import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'fan'
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Implement NextAuth registration logic
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
        <title>Sign Up - Shonen Ark</title>
        <meta name="description" content="Join the Shonen Ark community and start sharing your passion for anime and manga." />
      </Head>


      <main className="flex flex-col items-center justify-center min-h-[90vh] px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo/Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Join Shonen Ark</h1>
            <p className="text-gray-400">Create your account and dive into the community</p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="bg-gray-900 rounded-2xl p-8 shadow-xl">
            <div className="space-y-6">
              {/* Account Type Selection */}
              <div>
                <label className="block text-sm font-medium mb-3">Account Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="accountType"
                      value="fan"
                      checked={formData.accountType === 'fan'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`border-2 rounded-lg p-4 text-center transition-colors ${
                      formData.accountType === 'fan' 
                        ? 'border-blue-500 bg-blue-500 bg-opacity-20' 
                        : 'border-gray-600 hover:border-gray-500'
                    }`}>
                      <span className="text-2xl block mb-2">🎌</span>
                      <span className="font-semibold">Fan</span>
                      <p className="text-xs text-gray-400 mt-1">Follow & discover</p>
                    </div>
                  </label>
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="accountType"
                      value="creator"
                      checked={formData.accountType === 'creator'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`border-2 rounded-lg p-4 text-center transition-colors ${
                      formData.accountType === 'creator' 
                        ? 'border-purple-500 bg-purple-500 bg-opacity-20' 
                        : 'border-gray-600 hover:border-gray-500'
                    }`}>
                      <span className="text-2xl block mb-2">✨</span>
                      <span className="font-semibold">Creator</span>
                      <p className="text-xs text-gray-400 mt-1">Share & monetize</p>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="YourUsername"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

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

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 mt-1 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                  required
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-400">
                  I agree to the{' '}
                  <Link href="/terms" className="text-blue-400 hover:text-blue-300">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-blue-400 hover:text-blue-300">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 py-3 rounded-lg font-semibold transition-colors"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>

            {/* Social Registration */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-900 text-gray-400">Or sign up with</span>
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

          {/* Login Link */}
          <div className="text-center mt-8">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-400 hover:text-blue-300 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
