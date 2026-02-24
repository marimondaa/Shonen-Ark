import { supabase } from '../supabase';

export type SubscriptionTier = 'free' | 'premium' | 'creator';

export interface SubscriptionUpdate {
    customerId: string;
    subscriptionId?: string;
    status?: string;
    tier?: SubscriptionTier;
    priceId?: string;
}

/**
 * Service to handle subscription and payment logic
 */
export const subscriptionService = {
    /**
     * Maps Stripe Price IDs to internal subscription tiers
     */
    getTierFromPriceId(priceId: string | undefined): SubscriptionTier {
        if (!priceId) return 'free';

        const mapping: Record<string, SubscriptionTier> = {
            [process.env.STRIPE_PRICE_CREATOR || '']: 'creator',
            [process.env.STRIPE_PRICE_PREMIUM || '']: 'premium',
        };

        return mapping[priceId] || 'free';
    },

    /**
     * Updates a user's subscription status based on Stripe events
     */
    async updateSubscription(update: SubscriptionUpdate) {
        const { customerId, subscriptionId, status, tier } = update;

        // Get user by Stripe customer ID
        const { data: user, error: userError } = await supabase
            .from('users')
            .select('id, email')
            .eq('stripe_customer_id', customerId)
            .single();

        if (userError || !user) {
            console.error(`[Subscription Service] User not found for customerId: ${customerId}`);
            throw new Error(`User not found for customer ID: ${customerId}`);
        }

        // Update user record
        const { error: updateError } = await supabase
            .from('users')
            .update({
                subscription_tier: tier || 'free',
                subscription_status: status || 'inactive',
                stripe_subscription_id: subscriptionId || null,
                updated_at: new Date().toISOString()
            })
            .eq('id', user.id);

        if (updateError) {
            console.error(`[Subscription Service] Failed to update user ${user.id}:`, updateError);
            throw updateError;
        }

        console.log(`[Subscription Service] Updated user ${user.id} to tier: ${tier}, status: ${status}`);
        return user;
    },

    /**
     * Records a successful payment
     */
    async recordPaymentSuccess(customerId: string) {
        const { error } = await supabase
            .from('users')
            .update({
                last_payment_date: new Date().toISOString(),
                payment_status: 'paid'
            })
            .eq('stripe_customer_id', customerId);

        if (error) {
            console.error(`[Subscription Service] Failed to record payment for ${customerId}:`, error);
            throw error;
        }
    },

    /**
     * Records a failed payment
     */
    async recordPaymentFailure(customerId: string) {
        const { error } = await supabase
            .from('users')
            .update({
                payment_status: 'failed'
            })
            .eq('stripe_customer_id', customerId);

        if (error) {
            console.error(`[Subscription Service] Failed to record payment failure for ${customerId}:`, error);
            throw error;
        }
    }
};
