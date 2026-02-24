/**
 * Environment Validation Layer
 * Ensures required environment variables are present and valid.
 * Warns for optional but recommended variables.
 */

const requiredEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'NEXTAUTH_URL',
    'NEXTAUTH_SECRET',
    'N8N_URL',
    'N8N_API_KEY',
    'WEBHOOK_SECRET',
] as const;

const optionalEnvVars = [
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'OPENAI_API_KEY',
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET',
    'ANILIST_CLIENT_ID',
    'ANILIST_CLIENT_SECRET',
] as const;

export type RequiredEnvVar = (typeof requiredEnvVars)[number];
export type OptionalEnvVar = (typeof optionalEnvVars)[number];

export const validateEnv = () => {
    const isDev = process.env.NODE_ENV === 'development';

    // 1. Check Required Variables
    const missingRequired = requiredEnvVars.filter((key) => !process.env[key]);
    if (missingRequired.length > 0) {
        const errorMsg = `❌ Missing REQUIRED environment variables: ${missingRequired.join(', ')}`;
        if (isDev) {
            throw new Error(errorMsg);
        } else {
            console.error(errorMsg);
        }
    }

    // 2. Check Optional Variables
    if (isDev) {
        const missingOptional = optionalEnvVars.filter((key) => !process.env[key]);
        if (missingOptional.length > 0) {
            console.warn(`⚠️ Missing OPTIONAL environment variables: ${missingOptional.join(', ')}`);
            console.warn('   Features relying on these (Stripe, AI, Cloudinary) may not function correctly.');
        }
    }

    // 3. Specific format validations
    if (process.env.NEXTAUTH_URL && !process.env.NEXTAUTH_URL.startsWith('http')) {
        console.warn('⚠️ NEXTAUTH_URL should start with http:// or https://');
    }

    return {
        isSupabaseConfigured: !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
        isNextAuthConfigured: !!(process.env.NEXTAUTH_URL && process.env.NEXTAUTH_SECRET),
        isN8NConfigured: !!(process.env.N8N_URL && process.env.N8N_API_KEY),
        isStripeConfigured: !!(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY && process.env.STRIPE_SECRET_KEY),
        isAIConfigured: !!process.env.OPENAI_API_KEY,
        isCloudinaryConfigured: !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY),
    };
};

/**
 * Type-safe access to environment variables
 */
export const env = {
    supabase: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
        anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    },
    nextAuth: {
        url: process.env.NEXTAUTH_URL!,
        secret: process.env.NEXTAUTH_SECRET!,
    },
    n8n: {
        url: process.env.N8N_URL!,
        apiKey: process.env.N8N_API_KEY!,
        webhookSecret: process.env.WEBHOOK_SECRET!,
    },
    stripe: {
        publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
        secretKey: process.env.STRIPE_SECRET_KEY,
        webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    },
    openai: {
        apiKey: process.env.OPENAI_API_KEY,
    },
    cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
    },
    anilist: {
        clientId: process.env.ANILIST_CLIENT_ID,
        clientSecret: process.env.ANILIST_CLIENT_SECRET,
    },
    isProd: process.env.NODE_ENV === 'production',
    isDev: process.env.NODE_ENV === 'development',
};

