# Quick Start: MongoDB Setup for OLMS

## 🚀 Quick Steps (5 minutes)

### 1. MongoDB Atlas Setup
1. Go to https://mongodb.com
2. Sign up (free)
3. Create a cluster (M0 free tier)
4. Create a database user (Database Access)
5. Whitelist your IP (Network Access → Add 0.0.0.0)
6. Get connection string: Cluster → Connect → Drivers

### 2. Backend Setup
```bash
# Clone/go to server directory
cd server

# Install dependencies
npm install

# Create .env file
```

**Create `server/.env`:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/olms
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
```

**Start server:**
```bash
npm run dev
# Should see: "Server running on port 5000"
```

### 3. Frontend Setup
**Create `root/.env`:**
```
VITE_API_URL=http://localhost:5000/api
```

**Start frontend:**
```bash
npm run dev
# Should see: "running at: http://localhost:5173"
```

### 4. Test It
1. Open http://localhost:5173
2. Click "Sign Up"
3. Create a test account
4. Login
5. Create a course/assignment
6. ✅ Done! Data is in MongoDB

## 📚 Full Documentation
- [MONGODB_SETUP.md](/MONGODB_SETUP.md) - Comprehensive setup guide
- [ARCHITECTURE_CHANGES.md](/ARCHITECTURE_CHANGES.md) - Technical details

## ⚠️ Common Issues

**"Connection refused"**
→ Ensure backend is running (`npm run dev` in `/server`)

**"Cannot read token"**
→ Check JWT_SECRET matches in `.env`

**"MongoDB connection error"**
→ Verify MongoDB URI and whitelist your IP

**"CORS error"**
→ Ensure `VITE_API_URL` in .env matches backend port

## Need Help?
1. Check MONGODB_SETUP.md for detailed troubleshooting
2. Verify both servers are running (`backend:5000`, `frontend:5173`)
3. Clear browser cache and re-login
