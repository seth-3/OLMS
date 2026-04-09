# Local Development Guide

## Prerequisites
- Node.js installed (v18+ recommended)
- MongoDB database running locally or accessible
- Git repository initialized

## Environment Setup

### 1. Copy Environment Variables
```bash
cp .env.example .env
```

### 2. Update Environment Variables
Edit `.env` file with your actual values:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Your JWT secret key
- `VITE_API_URL`: Keep as `/api` for local development
- `PORT`: Keep as `5000` for local server

## Installation

### 1. Install Dependencies
```bash
# Install root dependencies
npm install

# Install server dependencies  
cd server && npm install
```

### 2. Install Concurrently (if not already installed)
```bash
npm install -g concurrently
```

## Running the Application

### Option 1: Run Both Client and Server Together
```bash
npm run dev:full
```
This will run:
- Vite dev server (React frontend) on http://localhost:5173
- Express server (Node.js backend) on http://localhost:5000
- Hot reload for both frontend and backend

### Option 2: Run Separately

#### Frontend Only:
```bash
npm run dev
```
Runs React app on http://localhost:5173

#### Backend Only:
```bash
cd server
npm run dev
```
Runs Express server on http://localhost:5000

## Development URLs

### Frontend (React/Vite)
- **URL**: http://localhost:5173
- **API Base**: http://localhost:5000/api

### Backend (Express/Node.js)
- **Server**: http://localhost:5000
- **Health Check**: http://localhost:5000/health
- **API Endpoints**: http://localhost:5000/api/*

## Database Setup

### MongoDB Connection
Ensure your MongoDB is accessible:
```bash
# Test connection
mongosh "mongodb+srv://your-connection-string"
```

## Troubleshooting

### Port Conflicts
- **Frontend**: Uses port 5173 (Vite default)
- **Backend**: Uses port 5000 (Express default)
- No conflicts expected

### Common Issues

#### Server Won't Start
1. Check MongoDB connection string in `.env`
2. Verify MongoDB is running
3. Check for port conflicts (5000)
4. Review server logs for errors

#### Frontend API Errors
1. Check `VITE_API_URL` in `.env`
2. Ensure backend server is running
3. Check browser network tab for CORS errors

#### TypeScript Errors
1. Run `npm run build:server` in server directory
2. Check for missing type definitions
3. Review `tsconfig.json` settings

## Development Workflow

### 1. Start Full Development
```bash
npm run dev:full
```

### 2. Make Changes
- Edit React components in `src/`
- Edit server routes in `server/src/`
- TypeScript will auto-compile both

### 3. Test Changes
- Frontend hot-reloads automatically
- Backend restarts with file changes
- Test API endpoints with browser dev tools

### 4. Database Operations
- All data persists to MongoDB
- Check MongoDB Compass for database inspection

## Production Build Test

```bash
# Test production build locally
npm run build:vercel
```

This simulates the Vercel build process to catch issues before deployment.
