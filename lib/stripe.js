import Stripe from 'stripe'

const stripeKey = process.env.STRIPE_SECRET_KEY || ''
export const stripe = new Stripe(stripeKey, {
  apiVersion: '2022-11-15',
})

export async function createCheckoutSession(customerId, priceId) {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/account/creator`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/account/onboarding`,
  })
  return session
}
