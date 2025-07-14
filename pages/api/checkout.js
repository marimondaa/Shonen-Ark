import { createCheckoutSession } from '../../lib/stripe'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method not allowed')
  }
  const session = await getServerSession(req, res, authOptions)
  if (!session) return res.status(401).end('Unauthorized')

  try {
    const checkout = await createCheckoutSession(session.user.id, process.env.STRIPE_PRICE_ID)
    res.status(200).json({ url: checkout.url })
  } catch (err) {
    console.error(err)
    res.status(500).end('Stripe error')
  }
}
