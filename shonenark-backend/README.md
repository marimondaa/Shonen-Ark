# Shonen Ark Backend

Node.js/Express backend for the Shonen Ark platform.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb+srv://shonenark:<password>@cluster0.mongodb.net/shonenark?retryWrites=true&w=majority
JWT_SECRET=supersecurejwtsecret123
ADMIN_EMAIL=admin@shonenark.com
ADMIN_PASSWORD=ShonenArkAdmin!2025
```

**Replace `<password>` with your MongoDB Atlas password.**

### 3. Seed Admin User
```bash
npm run seed
```

This creates:
- Admin: `admin@shonenark.com` / `ShonenArkAdmin!2025`
- AI User: `ai@shonenark.com` (for automated theories)

### 4. Start Server
```bash
npm start
```

Server runs on `http://localhost:5000`

### 5. Run Tests
```bash
npm test
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Theories
- `GET /api/theories` - Get all published theories
- `GET /api/theories/:id` - Get single theory
- `POST /api/theories` - Create theory (requires auth)
- `POST /api/theories/webhook` - n8n webhook for AI-generated theories

### Anime
- `GET /api/anime` - Get all anime
- `POST /api/anime/sync` - Sync anime data (admin)

## n8n Integration

Import the workflow from `n8n-scripts/theory-generator.json` into your n8n instance.

Configure the webhook URL to point to: `http://localhost:5000/api/theories/webhook`

## Database Seeding

To create an AI user for automated theory generation:

```javascript
// Run this in MongoDB shell or create a seed script
db.users.insertOne({
  email: "ai@shonenark.com",
  username: "AI Generator",
  password: "$2a$10$...", // hashed password
  role: "admin",
  createdAt: new Date()
})
```

## License

MIT
