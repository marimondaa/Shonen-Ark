# 🌸 Shonen Ark - Technical Documentation & Setup Guide

Welcome to Shonen Ark, a premium anime fan platform built for high-performance and deep community engagement. This guide outlines how to get the project running locally and maintain its back-office infrastructure.

## 🚀 Local Setup

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Supabase Account**: For database, auth, and storage.
- **n8n Instance**: (Optional for local) For automation workflows.

### 2. Installation
```bash
# Clone and enter directory
git clone https://github.com/marimondaa/Shonen-Ark.git
cd shonen-ark

# Install dependencies
npm install
```

### 3. Environment Configuration
Copy the template and fill in your secrets:
```bash
cp .env.example .env.local
```
Refer to the [Environment Variables](#-environment-variables) section for details on each key.

### 4. Database Setup
1. Create a new project in the [Supabase Dashboard](https://supabase.com).
2. Run the migrations located in `./supabase/migrations` via the SQL Editor.
3. Enable Row Level Security (RLS) on all tables (see `docs/SUPABASE_RLS_STRUCTURE.md`).

### 5. Running the App
```bash
# Start development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see your local instance.

---

## 🔑 Environment Variables

The application strictly validates environment variables at boot. Missing **Required** variables will prevent the server from starting in development.

### 🛠️ Required Variables
| Variable | Description | Source / Example |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Dashboard -> Settings -> API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key for client-side access | Dashboard -> Settings -> API |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin key for server-side logic | **NEVER EXPOSE ON CLIENT** |
| `NEXTAUTH_URL` | The base URL of the app | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Secret for session signing | `openssl rand -base64 32` |
| `N8N_URL` | Base URL of your n8n instance | `https://n8n.your-domain.com` |
| `N8N_API_KEY` | Personal access token for n8n API | n8n Settings -> API Keys |
| `WEBHOOK_SECRET` | Shared secret for Shonen Ark -> n8n HMAC | Random string (must match n8n config) |

### 💎 Optional Variables (Feature-Specific)
| Variable | Description | Feature Impact |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe public key | Checkout & Subscriptions |
| `STRIPE_SECRET_KEY` | Stripe restricted/secret key | Payment processing |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | Subscription status updates |
| `OPENAI_API_KEY` | OpenAI API Key | AI Theory Analysis / Chat |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary name | Image/Video hosting |
| `ANILIST_CLIENT_ID` | AniList API Client ID | Release Calendar metadata |

---

## ⚙️ Back-Office (n8n)

Shonen Ark offloads complex automation (like project approval notifications and user onboarding) to **n8n**.

### Webhook Signatures
To ensure security, all webhooks sent from Shonen Ark to n8n are signed using **HMAC SHA256**.
1. The app generates a signature using the `WEBHOOK_SECRET`.
2. n8n receives the `x-signature` header.
3. n8n must re-calculate the signature and compare it before processing.

---

## 🩺 Health Check & Debugging

Verify your system status at `/api/health`.

### Response Shape
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "services": {
      "supabase": "ok",
      "n8n": "reachable",
      "stripe": "configured"
    }
  },
  "cid": "..."
}
```

### Common Debugging Commands
- `npm run lint`: Check for code style/syntax issues.
- `npx tsc --noEmit`: Run TypeScript type-checks.
- `DEBUG=true npm run dev`: Enable verbose debug logging.

---

## ⚠️ Common Errors & Fixes

**1. `Missing environment variables` error at boot**
- **Fix**: Ensure your `.env.local` matches the keys in `.env.example`. Check for typos.

**2. Webhook Signature Mismatch**
- **Fix**: Verify that `WEBHOOK_SECRET` is identical in both Shonen Ark's environment and your n8n workflow settings.

**3. NextAuth `Invalid session` or `JWT error`**
- **Fix**: Ensure `NEXTAUTH_SECRET` is a long, random string and `NEXTAUTH_URL` matches your current domain/port.

---

**Status**: ✅ Production Ready | **Backend**: v2 Architecture | **Last Updated**: Feb 2026
