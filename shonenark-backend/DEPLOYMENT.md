# Backend Deployment Guide

## Prerequisites
1. MongoDB Atlas account with cluster created
2. Node.js installed (v16+)
3. n8n instance (local or cloud)

## Step 1: Environment Setup

Create `.env` file in `shonenark-backend/` directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://shonenark:<password>@cluster0.mongodb.net/shonenark?retryWrites=true&w=majority
JWT_SECRET=supersecurejwtsecret123
ADMIN_EMAIL=admin@shonenark.com
ADMIN_PASSWORD=ShonenArkAdmin!2025
```

**Important:** Replace `<password>` with your actual MongoDB Atlas password.

## Step 2: Install Dependencies

```bash
cd shonenark-backend
npm install
```

## Step 3: Create Admin User

```bash
npm run seed
```

This will create:
- Admin user: `admin@shonenark.com` / `ShonenArkAdmin!2025`
- AI user: `ai@shonenark.com` (for automated theories)

## Step 4: Start Backend Server

```bash
npm start
```

Server should start on `http://localhost:5000`

## Step 5: Test Authentication

### Register New User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"Test123!"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@shonenark.com","password":"ShonenArkAdmin!2025"}'
```

Save the returned JWT token for authenticated requests.

## Step 6: Test Theory Endpoints

### Create Theory (Authenticated)
```bash
curl -X POST http://localhost:5000/api/theories \
  -H "Content-Type: application/json" \
  -H "x-auth-token: YOUR_JWT_TOKEN" \
  -d '{"title":"Test Theory","theoryText":"This is a test","animeId":"ANIME_ID"}'
```

### Get All Theories
```bash
curl http://localhost:5000/api/theories
```

## Step 7: n8n Integration

1. Import `n8n-scripts/theory-generator.json` into n8n
2. Update webhook URL to: `http://localhost:5000/api/theories/webhook`
3. Configure OpenAI API key in n8n
4. Test workflow execution

## Step 8: Upload Media

```bash
curl -X POST http://localhost:5000/api/media/upload \
  -H "x-auth-token: YOUR_JWT_TOKEN" \
  -F "file=@/path/to/image.jpg" \
  -F "theoryId=THEORY_ID"
```

## Troubleshooting

### MongoDB Connection Issues
- Verify MongoDB Atlas IP whitelist includes your IP
- Check connection string format
- Ensure database user has correct permissions

### JWT Errors
- Verify JWT_SECRET is set in .env
- Check token format in Authorization header

### Upload Errors
- Ensure `uploads/photos` and `uploads/videos` directories exist
- Check file size limits (50MB max)

## Production Deployment

For production, consider:
1. Deploy backend to Heroku/Railway/Render
2. Update MONGODB_URI to production cluster
3. Set secure JWT_SECRET
4. Configure CORS for production frontend URL
5. Enable HTTPS
6. Set up monitoring and logging
