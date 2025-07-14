import Head from 'next/head'
import { createCheckoutSession } from '../../lib/stripe'

export default function Onboarding() {
  async function handleUpgrade() {
    try {
      const res = await fetch('/api/checkout', { method: 'POST' })
      const { url } = await res.json()
      window.location.href = url
    } catch (err) {
      console.error(err)
      alert('Checkout failed')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-gray-950">
      <Head>
        <title>Upgrade to Creator</title>
      </Head>
      <h1 className="text-3xl font-bold mb-6">Creator Tools</h1>
      <p className="mb-4">Unlock uploads and analytics for $4/month.</p>
      <button onClick={handleUpgrade} className="bg-red-600 px-6 py-3 rounded-lg">
        Upgrade with Stripe
      </button>
    </div>
  )
}
