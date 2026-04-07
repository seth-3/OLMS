# Vercel Deployment Guide

## Prerequisites
- Node.js project set up with proper build scripts
- Vercel CLI installed (`npm i -g vercel`)
- Git repository connected to Vercel

## Environment Variables
Add these environment variables in your Vercel dashboard:

### Required Variables
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Your JWT secret key

### Optional Variables
- `NODE_ENV` - Set to `production` (automatically set by Vercel)
- `PORT` - Vercel automatically sets this (don't override)

## Deployment Steps

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy your application**:
   ```bash
   vercel --prod
   ```

## Configuration Details

### Vercel Configuration (`vercel.json`)
- **Client Build**: Uses `@vercel/static-build` to build React app
- **Server Build**: Uses `@vercel/node` to compile TypeScript server
- **Routing**: API routes go to server, everything else serves static React app

### Build Process
1. Client builds with Vite (`npm run build`)
2. Server compiles TypeScript (`cd server && npm run build`)
3. Static files and server deployed together

## Troubleshooting

### Build Failures
- Check TypeScript errors in server directory
- Ensure all dependencies are installed
- Verify `vercel.json` syntax

### Runtime Errors
- Check environment variables in Vercel dashboard
- Review Vercel function logs
- Verify MongoDB connection string

### API Routes
- All API routes are prefixed with `/api/`
- Server handles authentication, courses, assignments, quizzes
- Health check available at `/api/health`

## Post-Deployment
1. Visit your Vercel URL
2. Test API endpoints: `https://your-app.vercel.app/api/health`
3. Test frontend: `https://your-app.vercel.app/`
4. Monitor logs in Vercel dashboard
