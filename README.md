# 🌸 Shonen Ark - Mystical Anime Fan Platform

> **A fusion of Design Yokocho × Phantom 980 aesthetics**  
> Interactive theory hub, animation analysis, and creator community platform with premium subscription tiers.

[![Next.js](https://img.shields.io/badge/Next.js-13.4+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18+-61dafb?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3+-38b2ac?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ecf8e?style=for-the-badge&logo=supabase)](https://supabase.com/)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit [http://localhost:3000](http://localhost:3000)

## ✨ Features

### 🎯 Core Features
- **Authentication**: NextAuth.js with Supabase integration
- **Theory Hub**: Community-driven anime theories with voting system
- **Animation Analysis**: Frame-by-frame breakdowns and insights
- **Release Calendar**: Track anime/manga release schedules
- **User Profiles**: Personalized dashboards with activity tracking
- **Premium Subscriptions**: Stripe-powered subscription tiers

### 🎨 Design
- **Mystical Aesthetics**: Japanese-inspired UI with torii gates and ink brush effects
- **Responsive**: Mobile-first design with Tailwind CSS
- **Animations**: Smooth transitions with Framer Motion
- **Dark Mode**: Full dark theme support

## 🏗️ Tech Stack

### Frontend
- **Next.js 13.4+** - React framework with App Router
- **React 18** - UI library
- **Tailwind CSS 3.3** - Utility-first styling
- **Framer Motion** - Animation library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Supabase** - PostgreSQL database with Row Level Security
- **NextAuth.js** - Authentication solution
- **Stripe** - Payment processing

### DevOps
- **Railway** - Deployment platform
- **GitHub Actions** - CI/CD pipeline
- **Playwright** - E2E testing
- **Jest** - Unit testing

## 📁 Project Structure

```
shonen-ark/
├── pages/              # Next.js pages and API routes
│   ├── api/           # API endpoints
│   ├── account/       # User account pages
│   └── ...            # Public pages
├── src/
│   ├── components/    # React components
│   │   ├── features/  # Feature-specific components
│   │   ├── layout/    # Layout components
│   │   └── ...
│   └── lib/          # Shared utilities
│       ├── hooks/    # Custom React hooks
│       ├── types/    # TypeScript types
│       └── ...
├── public/           # Static assets
├── styles/           # Global styles
├── supabase/         # Database migrations
├── tests/            # Test files
└── docs/             # Documentation
```

## 🔧 Configuration

### Required Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_here

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret

# Stripe (Optional)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# Cloudinary (Optional)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Unit tests
npm run test:unit

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

## 📚 API Documentation

### Health Check
```
GET /api/health
```
Returns system health status

### Authentication
```
POST /api/auth/signin
POST /api/auth/signout
GET /api/auth/session
```

### Theories
```
GET /api/theories - List all theories
POST /api/theories - Create new theory
POST /api/theories/[id]/like - Like/unlike theory
```

See [docs/api/](./docs/api/) for full API documentation.

## 🚀 Deployment

### Prerequisites
- Node.js 18+
- PostgreSQL (via Supabase)
- Railway account (or similar)

### Deploy to Railway

1. **Connect GitHub Repository**
2. **Set Environment Variables** (use .env.example as template)
3. **Deploy**

```bash
# Verify deployment readiness
npm run verify:deploy

# Check health
npm run health-check
```

### Build Scripts
```bash
npm run build          # Production build
npm run railway:build  # Railway-specific build
```

## 🛠️ Development

### Scripts Overview
```bash
npm run dev               # Start dev server
npm run build             # Build for production
npm run type-check        # TypeScript validation
npm run lint              # ESLint
npm run verify:deploy     # Pre-deployment checks
npm run health-check      # Health verification
```

### Database
```bash
# Migrations are in supabase/migrations/
# Apply via Supabase Dashboard or CLI
```

## 📖 Documentation

- [Deployment Guide](./docs/DEPLOYMENT_GUIDE.md)
- [API Documentation](./docs/api/)
- [Infrastructure Status](./docs/INFRASTRUCTURE_STATUS.md)
- [Technical Audit](./docs/TECHNICAL_AUDIT_REPORT.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT License - see LICENSE file for details

## 👤 Author

**marimondaa**
- GitHub: [@marimondaa](https://github.com/marimondaa)
- Repository: [Shonen-Ark](https://github.com/marimondaa/Shonen-Ark)

## 🌟 Acknowledgments

- Design inspired by Design Yokocho and Phantom 980
- Built with Next.js and the React ecosystem
- Powered by Supabase and Railway

---

**Status**: ✅ Production Ready | **Version**: 1.0.0 | **Last Updated**: November 2025
