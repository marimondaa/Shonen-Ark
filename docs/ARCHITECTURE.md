# Architecture Overview

## Project Structure

```
Shonen-Ark/
├── pages/                  # Next.js pages (frontend routes)
│   ├── api/               # API endpoints (backend)
│   ├── _app.js            # App wrapper (Auth provider)
│   ├── index.js           # Home page
│   └── ...
├── components/            # React components
│   └── ParticleCursor.js
├── lib/                   # Shared backend logic
│   ├── env.ts            # Environment validation
│   ├── supabaseClient.ts  # Client-side Supabase (anon)
│   ├── supabaseAdmin.ts   # Server-side Supabase (service role)
│   ├── n8n.ts            # n8n integration
│   ├── types.ts          # TypeScript interfaces
│   └── ...
├── styles/               # CSS and Tailwind config
│   ├── globals.css
│   └── tailwind.config.js
├── public/               # Static assets
│   └── images/
├── .env.example          # Environment template
└── package.json
```

## Data Flow

1. User submits form on /pages/[page].js
2. Form POSTs to /pages/api/[endpoint].js
3. API route validates request
4. API route calls lib/ function (e.g., supabaseAdmin.insert())
5. Supabase executes query with RLS policies
6. Response returned to frontend

## Security Model

- **Public env vars**: NEXT_PUBLIC_* only
- **Server-only keys**: Only in /pages/api and /lib
- **RLS policies**: Enforce data access in Supabase
- **NextAuth**: Manages session tokens
- **Webhooks**: Signed with HMAC-SHA256
```
