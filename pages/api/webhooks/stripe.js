import Stripe from 'stripe';
import serverSupabase from '../../../src/lib/supabase-server';
import { allowMethods } from '../../../src/lib/api-helpers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = { api: { bodyParser: false } };

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const buf = await new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });

  let event;

  try {
  event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionChange(event.data.object);
        break;
      
      case 'customer.subscription.deleted':
        await handleSubscriptionCancellation(event.data.object);
        break;
      
      case 'invoice.payment_succeeded':
        await handlePaymentSuccess(event.data.object);
        break;
      
      case 'invoice.payment_failed':
        await handlePaymentFailure(event.data.object);
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
}

export default allowMethods(['POST'], handler);

async function handleSubscriptionChange(subscription) {
  const customerId = subscription.customer;
  const subscriptionId = subscription.id;
  const status = subscription.status;
  const priceId = subscription.items.data[0]?.price?.id;
  
  // Map price IDs to subscription tiers
  const tierMapping = {
    [process.env.STRIPE_PRICE_CREATOR]: 'creator',
    [process.env.STRIPE_PRICE_PREMIUM]: 'premium',
  };
  
  const tier = tierMapping[priceId] || 'free';
  
  // Get user by Stripe customer ID
  const { data: user, error: userError } = await serverSupabase
    .from('users')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single();
    
  if (userError || !user) {
    console.error('User not found for customer ID:', customerId);
    return;
  }
  
  // Update user subscription
  const { error: updateError } = await serverSupabase
    .from('users')
    .update({
      subscription_tier: tier,
      subscription_status: status,
      stripe_subscription_id: subscriptionId,
      subscription_updated_at: new Date().toISOString()
    })
    .eq('id', user.id);
    
  if (updateError) {
    console.error('Failed to update user subscription:', updateError);
  }
  
  console.log(`Updated subscription for user ${user.id}: ${tier} (${status})`);
}

async function handleSubscriptionCancellation(subscription) {
  const customerId = subscription.customer;
  
  // Get user by Stripe customer ID
  const { data: user, error: userError } = await serverSupabase
    .from('users')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single();
    
  if (userError || !user) {
    console.error('User not found for customer ID:', customerId);
    return;
  }
  
  // Downgrade to free tier
  const { error: updateError } = await serverSupabase
    .from('users')
    .update({
      subscription_tier: 'free',
      subscription_status: 'canceled',
      stripe_subscription_id: null,
      subscription_updated_at: new Date().toISOString()
    })
    .eq('id', user.id);
    
  if (updateError) {
    console.error('Failed to cancel user subscription:', updateError);
  }
  
  console.log(`Canceled subscription for user ${user.id}`);
}

async function handlePaymentSuccess(invoice) {
  const customerId = invoice.customer;
  const subscriptionId = invoice.subscription;
  
  // Update payment status
  const { error } = await serverSupabase
    .from('users')
    .update({
      last_payment_date: new Date().toISOString(),
      payment_status: 'paid'
    })
    .eq('stripe_customer_id', customerId);
    
  if (error) {
    console.error('Failed to update payment status:', error);
  }
  
  console.log(`Payment succeeded for customer ${customerId}`);
}

async function handlePaymentFailure(invoice) {
  const customerId = invoice.customer;
  
  // Update payment status
  const { error } = await serverSupabase
    .from('users')
    .update({
      payment_status: 'failed'
    })
    .eq('stripe_customer_id', customerId);
    
  if (error) {
    console.error('Failed to update payment failure:', error);
  }
  
  console.log(`Payment failed for customer ${customerId}`);
}
