# n8n Setup Guide for Shonen Ark

This guide shows you how to set up n8n locally using the official GitHub repository or run it directly.

## 🚀 Quick Start Options

### Option 1: Run n8n with Docker (Easiest)

```bash
# Run n8n with Docker
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -e N8N_BASIC_AUTH_ACTIVE=true \
  -e N8N_BASIC_AUTH_USER=admin \
  -e N8N_BASIC_AUTH_PASSWORD=your_password \
  -e N8N_API_KEY_AUTH_ENABLED=true \
  -e N8N_PERSONAL_ACCESS_TOKEN_ENABLED=true \
  -v n8n_data:/home/node/.n8n \
  n8nio/n8n
```

### Option 2: Install n8n Globally with npm

```bash
# Install n8n globally
npm install n8n -g

# Set environment variables
export N8N_BASIC_AUTH_ACTIVE=true
export N8N_BASIC_AUTH_USER=admin
export N8N_BASIC_AUTH_PASSWORD=your_password
export N8N_API_KEY_AUTH_ENABLED=true
export N8N_PERSONAL_ACCESS_TOKEN_ENABLED=true

# Start n8n
n8n start
```

### Option 3: Clone and Run from GitHub Source

```bash
# Clone the n8n repository
git clone https://github.com/n8n-io/n8n.git
cd n8n

# Install dependencies
npm install

# Build the project
npm run build

# Set environment variables
export N8N_BASIC_AUTH_ACTIVE=true
export N8N_BASIC_AUTH_USER=admin
export N8N_BASIC_AUTH_PASSWORD=your_password
export N8N_API_KEY_AUTH_ENABLED=true
export N8N_PERSONAL_ACCESS_TOKEN_ENABLED=true

# Start n8n
npm start
```

## 🔧 Configuration for Shonen Ark

Once n8n is running:

1. **Access n8n**: Go to http://localhost:5678
2. **Login**: Use admin / your_password
3. **Enable API Access**: 
   - Go to Settings → API Keys
   - Generate a new Personal Access Token
   - Copy the token

4. **Update your .env.local**:
```bash
N8N_URL=http://localhost:5678
N8N_API_KEY=your_generated_api_token_here
N8N_SIGNUP_WEBHOOK_URL=http://localhost:5678/webhook/user-signup
N8N_PROJECT_APPROVAL_WEBHOOK_URL=http://localhost:5678/webhook/project-approval
WEBHOOK_SECRET=your_webhook_secret_for_hmac_verification
```

## 📋 Import Workflows

After setup, import your Shonen Ark workflows:

```bash
# Deploy workflows to your running n8n instance
npm run deploy:workflows
```

## 🏗️ For Production (Railway)

For production deployment on Railway, n8n will run as a separate service:

1. **n8n Service URL**: https://your-n8n-service.railway.app
2. **Update environment variables** in Railway dashboard
3. **Use HTTPS URLs** for webhooks
4. **Enable authentication** for security

## ⚠️ Important Notes

- Keep your API key secure
- Use strong passwords for basic auth
- Enable HTTPS in production
- Regularly backup your workflows
- Monitor n8n logs for errors

## 🔍 Troubleshooting

If you can't access the API:
- Check if n8n is running on port 5678
- Verify API access is enabled in settings
- Ensure correct authentication headers
- Check firewall/network restrictions
