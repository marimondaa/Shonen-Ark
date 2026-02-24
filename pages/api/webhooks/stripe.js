import Stripe from 'stripe';
import { allowMethods, getRawBody, sendSuccess, sendError, Logger } from '../../../src/lib/api-helpers';
import { subscriptionService } from '../../../src/lib/services/subscription';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16', // Recommended to pin API version
});

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req, res, context) {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    const buf = await getRawBody(req);
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    context.logger.error('Stripe webhook signature verification failed', err);
    return res.status(400).json({
      success: false,
      error: {
        code: 'WEBHOOK_VERIFICATION_FAILED',
        message: err.message
      },
      cid: context.cid
    });
  }

  try {
    const object = event.data.object;
    context.logger.info(`Stripe webhook received: ${event.type}`, { eventId: event.id });

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await subscriptionService.updateSubscription({
          customerId: object.customer,
          subscriptionId: object.id,
          status: object.status,
          tier: subscriptionService.getTierFromPriceId(object.items.data[0]?.price?.id)
        });
        context.logger.info('Subscription updated', { customerId: object.customer, status: object.status });
        break;

      case 'customer.subscription.deleted':
        await subscriptionService.updateSubscription({
          customerId: object.customer,
          status: 'canceled',
          tier: 'free'
        });
        context.logger.info('Subscription canceled', { customerId: object.customer });
        break;

      case 'invoice.payment_succeeded':
        await subscriptionService.recordPaymentSuccess(object.customer);
        context.logger.info('Payment succeeded recorded', { customerId: object.customer });
        break;

      case 'invoice.payment_failed':
        await subscriptionService.recordPaymentFailure(object.customer);
        context.logger.warn('Payment failure recorded', { customerId: object.customer });
        break;

      default:
        context.logger.debug(`Unhandled Stripe event type: ${event.type}`);
    }

    return sendSuccess(res, { received: true }, 200, context.cid);
  } catch (error) {
    return sendError(res, error, context.cid);
  }
}

export default allowMethods(['POST'], handler);
