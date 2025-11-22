# Shonen Ark Backend

Node.js/Express backend for the Shonen Ark platform.

## Setup

1. **Install Dependencies**
```bash
npm install
```

2. **Configure Environment**
Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

Update the values:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `OPENAI_API_KEY`: For AI theory generation (optional)

3. **Start MongoDB**
Make sure MongoDB is running locally or use a cloud instance (MongoDB Atlas).

4. **Run Server**
```bash
npm start
```

Server will run on `http://localhost:5000`

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
