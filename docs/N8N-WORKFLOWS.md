# n8n Workflows Setup

## Prerequisites
- n8n running (local: docker, or hosted at n8n.cloud)
- Supabase tables created
- WEBHOOK_SECRET set in .env.local

## Workflow 1: user-signup
- **Trigger**: HTTP POST /webhook/user-signup
- **Purpose**: Sync user profile from auth.users to profiles table and send welcome email.

## Workflow 2: theory-submitted
- **Trigger**: HTTP POST /webhook/theory-submitted
- **Purpose**: Moderate theory content using AI and update status in Supabase.

## Workflow 3: moderation-action
- **Trigger**: HTTP POST /webhook/moderation-action
- **Purpose**: Notify user of moderation results and log action to audit_logs.
