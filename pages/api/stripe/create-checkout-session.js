import Stripe from 'stripe';
import { getSession } from 'next-auth/react';
import serverSupabase from '../../../src/lib/supabase-server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { priceId, successUrl, cancelUrl } = req.body;

    if (!priceId) {
      return res.status(400).json({ error: 'Price ID is required' });
    }

    // Get user data
    const { data: user, error: userError } = await serverSupabase
      .from('users')
      .select('stripe_customer_id, email')
      .eq('id', session.user.id)
      .single();

    if (userError || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let customerId = user.stripe_customer_id;

    // Create Stripe customer if doesn't exist
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          userId: session.user.id,
        },
      });

      customerId = customer.id;

      // Update user with customer ID
      await serverSupabase
        .from('users')
        .update({ stripe_customer_id: customerId })
        .eq('id', session.user.id);
    }

    // Create checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url:
        successUrl ||
        `${process.env.NEXTAUTH_URL}/account/${session.user.role || 'fan'}?success=true`,
      cancel_url:
        cancelUrl ||
        `${process.env.NEXTAUTH_URL}/account/${session.user.role || 'fan'}?canceled=true`,
      metadata: {
        userId: session.user.id,
      },
    });

    return res.status(200).json({ url: checkoutSession.url });
  } catch (error) {
    console.error('Checkout session error:', error);
    return res.status(500).json({ error: 'Failed to create checkout session' });
  }
}
