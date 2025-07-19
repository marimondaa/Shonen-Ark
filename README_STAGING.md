# Shonen Ark - Staging Environment

> **⚠️ STAGING ENVIRONMENT** - This is the testing environment for Shonen Ark. Content and data may be reset without notice.

## Quick Access

- **Staging URL**: [https://staging.shonenark.com](https://staging.shonenark.com)
- **Admin Panel**: [https://staging.shonenark.com/admin](https://staging.shonenark.com/admin)
- **n8n Workflows**: [https://n8n-staging.shonenark.com](https://n8n-staging.shonenark.com)
- **API Health**: [https://staging.shonenark.com/api/health](https://staging.shonenark.com/api/health)

## Authentication

### Basic Auth Protection
- **Username**: `shonen-staging`
- **Password**: `ark-preview-2024`

### Test Accounts
- **Fan Account**: `fan@shonenark.test` / `TestPassword123!`
- **Creator Account**: `creator@shonenark.test` / `TestPassword123!`
- **Admin Account**: `admin@shonenark.test` / `TestPassword123!`

## Key Features Available for Testing

### ✅ Completed Features
- [x] User registration and authentication
- [x] Theory submission and approval workflow
- [x] Project upload and moderation
- [x] Anime/Manga calendar integration
- [x] Community project discovery
- [x] Creator dashboard and tools
- [x] Admin moderation panel
- [x] n8n automation workflows
- [x] Webhook integrations
- [x] Database with RLS policies

### 🔧 Features in Development
- [ ] Advanced AI content tagging
- [ ] Real-time notifications
- [ ] Enhanced mobile experience
- [ ] Advanced search and filtering
- [ ] Community voting system

## Testing Guidelines

### Manual Testing
1. **User Registration Flow**
   - Test signup with email verification
   - Complete onboarding process
   - Verify account types (Fan vs Creator)

2. **Content Creation**
   - Submit theories and fan projects
   - Test file uploads (images, videos)
   - Verify content moderation pipeline

3. **Admin Functions**
   - Review flagged content
   - Approve/reject submissions
   - Monitor system health

4. **API Testing**
   - Test webhook endpoints with proper HMAC signatures
   - Verify calendar data synchronization
   - Test rate limiting and error handling

### Automated Testing
```bash
# Run E2E tests against staging
npm run test:e2e:staging

# Run API tests
npm run test:api:staging

# Performance testing
npm run test:performance:staging
```

## Data & Reset Schedule

### Database Reset
- **Frequency**: Weekly on Sundays at 02:00 UTC
- **Backup**: Last 24 hours of data preserved
- **Notification**: 24-hour advance notice via Slack

### Test Data
- Sample theories and projects
- Mock user accounts
- Realistic anime/manga calendar entries
- Test upload files

## Environment Configuration

### Environment Variables
```env
NODE_ENV=staging
NEXT_PUBLIC_ENV=staging
DATABASE_URL=[Staging Supabase URL]
NEXTAUTH_URL=https://staging.shonenark.com
WEBHOOK_SECRET=[Staging webhook secret]
N8N_WEBHOOK_URL=[Staging n8n URL]
```

### Database
- **Provider**: Supabase (Staging Instance)
- **Backup**: Daily at 02:00 UTC
- **Retention**: 7 days
- **Connection**: SSL required

### File Storage
- **Provider**: Cloudinary (Staging Environment)
- **Max File Size**: 50MB
- **Allowed Types**: Images (JPEG, PNG, WebP), Videos (MP4, WebM)

## n8n Workflow Testing

### Available Workflows
1. **User Signup Automation**
   - Webhook: `POST /api/hooks/signup`
   - Triggers: Welcome email, database logging, analytics

2. **Project Approval Pipeline**
   - Webhook: `POST /api/hooks/project-approval`
   - Triggers: Content review, notification system

3. **Calendar Synchronization**
   - Schedule: Hourly sync with AniList API
   - Manual: `POST /api/hooks/anime-calendar`

### Testing Webhooks
```bash
# Test signup webhook
curl -X POST https://staging.shonenark.com/api/hooks/signup \
  -H "Content-Type: application/json" \
  -H "X-Signature-256: sha256=[HMAC_SIGNATURE]" \
  -d '{"user": {"email": "test@example.com", "name": "Test User"}}'

# Test project approval
curl -X POST https://staging.shonenark.com/api/hooks/project-approval \
  -H "Content-Type: application/json" \
  -H "X-Signature-256: sha256=[HMAC_SIGNATURE]" \
  -d '{"project": {"id": "123", "title": "Test Project"}}'
```

## Known Issues & Limitations

### Current Limitations
- ⚠️ OAuth providers use test credentials
- ⚠️ Email delivery uses staging SMTP
- ⚠️ Payment processing disabled (test mode only)
- ⚠️ Some third-party integrations use mock data

### Common Issues
1. **Slow initial load**: Cold start delay (~30 seconds)
2. **File upload timeout**: Large files may timeout
3. **Session persistence**: May require re-login after updates

## Deployment Information

### Last Deployment
- **Date**: [Auto-updated by CI/CD]
- **Commit**: [Auto-updated by CI/CD]
- **Build**: [Auto-updated by CI/CD]

### Deployment Process
1. Triggered by push to `staging` branch
2. Runs full test suite
3. Builds Next.js application
4. Deploys to Railway
5. Updates n8n workflows
6. Runs smoke tests

### Rollback Process
If issues are discovered:
1. Notify team via `#staging-alerts` Slack channel
2. Revert to previous stable deployment
3. Investigate and fix issues
4. Redeploy when ready

## Support & Feedback

### Bug Reports
- **Slack**: `#staging-feedback`
- **GitHub**: Create issue with `staging` label
- **Email**: `staging@shonenark.com`

### Test Data Requests
Need specific test data? Contact the development team:
- Bulk user accounts
- Sample content with specific attributes
- Test scenarios for edge cases

### Performance Monitoring
- **Uptime**: [Staging status page]
- **Response Times**: Monitored via Playwright
- **Error Rates**: Logged to admin dashboard

## Development Workflow

### Testing New Features
1. Deploy to staging environment
2. Run automated test suite
3. Perform manual testing
4. Gather stakeholder feedback
5. Fix issues and redeploy
6. Promote to production when stable

### Integration Testing
- All third-party services use staging/test endpoints
- Database changes tested with migration scripts
- n8n workflows validated before production deployment

---

**Need Help?** Contact the development team in `#shonen-ark-dev` or email `dev@shonenark.com`
