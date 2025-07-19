# Shonen Ark - n8n & Railway Infrastructure Documentation

## 🏗️ Infrastructure Overview

This setup provides a complete production environment with:

- **Next.js Application**: Main web application (Vercel/Railway)
- **n8n Workflow Engine**: Automation and webhook processing (Railway)
- **PostgreSQL Database**: Data storage (Railway)
- **CI/CD Pipeline**: GitHub Actions for automated deployment

## 🚀 Quick Deployment Guide

### 1. Railway Setup

1. **Create Railway Account**: [railway.app](https://railway.app)
2. **Connect GitHub Repository**
3. **Deploy from `railway.toml`**:
   ```bash
   railway up
   ```

### 2. Environment Configuration

#### Production Environment (`.env.production`)
```bash
# Database (Railway PostgreSQL)
DATABASE_URL=postgresql://user:pass@host:port/db
PGHOST=your-railway-postgres-host
PGDATABASE=railway
PGUSER=postgres
PGPASSWORD=your-generated-password
PGPORT=5432

# n8n Configuration
N8N_API_URL=https://your-n8n-instance.up.railway.app/api/v1
N8N_API_KEY=your-n8n-api-key
N8N_WEB_URL=https://your-n8n-instance.up.railway.app
N8N_WEBHOOK_URL=https://your-n8n-instance.up.railway.app/webhook

# Security
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=secure-password-here
WEBHOOK_SECRET=your-webhook-secret-256-bit
NEXTAUTH_SECRET=your-nextauth-secret
REVALIDATE_SECRET=your-revalidate-secret

# Application
NEXT_PUBLIC_BASE_URL=https://shonen-ark.up.railway.app
NEXT_PUBLIC_SITE_URL=https://shonen-ark.up.railway.app

# External APIs
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Social/Newsletter
NEWSLETTER_API_KEY=your-newsletter-api-key
NEWSLETTER_LIST_ID=your-list-id
TWITTER_CLIENT_ID=your-twitter-client-id
TWITTER_CLIENT_SECRET=your-twitter-client-secret

# Slack (optional)
SLACK_WEBHOOK_PATH=your-slack-webhook-path
```

### 3. n8n Workflow Deployment

```bash
# Install dependencies
npm install

# Deploy all workflows to n8n
npm run deploy:n8n

# Check deployment status
npm run deploy:n8n info
```

## 📊 Workflow Architecture

### 1. User Signup Workflow (`user-signup.json`)
**Trigger**: POST `/webhook/user-signup`

**Flow**:
1. Webhook receives user registration data
2. Validates required fields (email, userId)
3. Stores user in PostgreSQL database
4. Sends welcome email
5. Adds to newsletter list
6. Returns success/error response

**Webhook Payload**:
```json
{
  "userId": "string",
  "email": "string",
  "username": "string",
  "accountType": "fan|creator",
  "source": "registration|social"
}
```

### 2. Project Approval Workflow (`project-approval.json`)
**Trigger**: POST `/webhook/project-approval`

**Flow**:
1. Receives project approval notification
2. Validates project data and approval status
3. Updates project status in database
4. Fetches creator details
5. Sends approval email to creator
6. Posts to team Slack channel
7. Creates social media announcement

**Webhook Payload**:
```json
{
  "projectId": "string",
  "creatorId": "string",
  "projectTitle": "string",
  "projectType": "string",
  "skillsNeeded": "string",
  "status": "approved"
}
```

### 3. Anime Calendar Sync (`anime-calendar.json`)
**Trigger**: Daily cron (8:00 AM UTC)

**Flow**:
1. Fetches current season anime from AniList API
2. Fetches upcoming season anime
3. Processes and normalizes data
4. Updates database with upsert operations
5. Revalidates Next.js cache
6. Returns sync statistics

## 🔧 API Endpoints

### Webhook Endpoints (Your App)
```
POST /api/hooks/user-signup      # Forwards to n8n user signup
POST /api/hooks/project-approval # Forwards to n8n project approval
GET  /api/health                 # Health check endpoint
```

### n8n Webhook URLs
```
POST https://your-n8n.up.railway.app/webhook/user-signup
POST https://your-n8n.up.railway.app/webhook/project-approval
```

## 🛡️ Security Features

### HMAC Webhook Validation
- All webhook payloads are signed with HMAC-SHA256
- Signatures verified before processing
- Secret key stored in environment variables

### Basic Authentication
- n8n UI protected with basic auth
- Admin routes require authentication
- API endpoints rate-limited

### Environment Separation
- Separate staging/production environments
- Environment-specific credentials
- Branch-based deployment triggers

## 📈 Monitoring & Logging

### Health Checks
```bash
# Application health
curl https://your-app.up.railway.app/api/health

# n8n health
curl https://your-n8n.up.railway.app/healthz

# Database connection
npm run db:health
```

### Workflow Monitoring
- Each workflow returns execution statistics
- Failed executions logged in n8n interface
- Email notifications for critical failures

## 🧪 Testing Strategy

### Local Testing
```bash
# Start development environment
npm run dev

# Test webhook endpoints
npm run test:webhooks

# Test n8n connection
npm run deploy:n8n test
```

### Staging Environment
```bash
# Deploy to staging
git push origin staging

# Run end-to-end tests
npm run test:e2e:staging
```

### Production Deployment
```bash
# Deploy to production (main branch)
git push origin main

# Automated tests run via GitHub Actions
# Manual smoke tests available:
npm run test:e2e:production
```

## 🔄 CI/CD Pipeline

### Branch Strategy
- `main`: Production deployments
- `staging`: Staging deployments  
- `develop`: Development work

### Deployment Flow
1. **Code Push** → **Tests** → **Build** → **Deploy**
2. **n8n Workflows** deployed automatically
3. **Database migrations** run on deploy
4. **Cache invalidation** triggers
5. **Health checks** verify deployment
6. **Notifications** sent to team

### GitHub Actions Secrets Required
```
RAILWAY_TOKEN
N8N_PRODUCTION_API_KEY
N8N_PRODUCTION_API_URL
N8N_STAGING_API_KEY
N8N_STAGING_API_URL
PRODUCTION_DATABASE_URL
STAGING_DATABASE_URL
SLACK_WEBHOOK
SNYK_TOKEN
```

## 📚 Troubleshooting

### Common Issues

#### n8n Connection Failed
```bash
# Check environment variables
echo $N8N_API_URL
echo $N8N_API_KEY

# Test connection
npm run deploy:n8n test
```

#### Database Connection Issues
```bash
# Check Railway database status
railway status

# Test connection
npm run db:test
```

#### Webhook Not Triggering
1. Verify webhook URL is correct
2. Check HMAC signature validation
3. Review n8n execution logs
4. Validate payload format

### Debugging Commands
```bash
# View Railway logs
railway logs

# Check n8n execution logs
# (Via n8n web interface)

# Test local webhook
curl -X POST localhost:3000/api/hooks/user-signup \
  -H "Content-Type: application/json" \
  -d '{"userId":"test","email":"test@example.com"}'
```

## 🎯 Next Steps

1. **Deploy to Railway**: Use the provided configuration
2. **Configure GitHub Secrets**: Set up CI/CD variables
3. **Test Workflows**: Verify all automations work
4. **Monitor Performance**: Set up logging and alerts
5. **Scale as Needed**: Add more workflows and features

## 📞 Support

- **Railway Issues**: [railway.app/help](https://railway.app/help)
- **n8n Documentation**: [docs.n8n.io](https://docs.n8n.io)
- **GitHub Actions**: [docs.github.com/actions](https://docs.github.com/actions)

This infrastructure provides a robust, scalable foundation for your Shonen Ark application with automated workflows and reliable deployment processes.
