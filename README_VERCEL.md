# OLMS - Online Learning Management System

## Vercel Deployment

This project is configured for deployment on Vercel with a full-stack setup:

- **Frontend**: React + Vite (served from `/`)
- **Backend**: Serverless functions (available at `/api/*`)

### Deployment Steps

1. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect the configuration

2. **Environment Variables** (in Vercel dashboard):
   ```
   MONGODB_URI=mongodb+srv://siradukund1_db_user:seth2004@cluster0.yrcyvhk.mongodb.net/?appName=Cluster0
   JWT_SECRET=your_secure_jwt_secret_here
   ```

3. **Deploy**:
   - Vercel will automatically build and deploy
   - Frontend will be served from the root domain
   - API endpoints will be available at `your-domain.vercel.app/api/*`

### API Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/courses` - Get courses
- `POST /api/courses` - Create course (teachers only)
- `GET /api/assignments` - Get assignments
- `POST /api/assignments` - Create assignment (teachers only)
- `GET /api/quizzes` - Get quizzes
- `POST /api/quizzes` - Create quiz (teachers only)

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Project Structure

```
├── api/                 # Vercel serverless functions
│   ├── auth.ts         # Authentication endpoints
│   ├── courses.ts      # Course management
│   ├── assignments.ts  # Assignment management
│   └── quizzes.ts      # Quiz management
├── src/                # React frontend
├── server/             # Original Express server (for reference)
├── dist/               # Built frontend (auto-generated)
├── vercel.json         # Vercel configuration
└── package.json
```