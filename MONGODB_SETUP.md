# OLMS MongoDB Migration Guide

This guide will help you migrate from localStorage to MongoDB for data persistence.

## Prerequisites

- Node.js and npm installed
- MongoDB Atlas account (free tier: mongodb.com)

## Backend Setup

### 1. Navigate to Server Directory

```bash
cd server
npm install
```

### 2. Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://mongodb.com)
2. Create a free account
3. Create a new cluster (M0 free tier)
4. Go to "Database Access" → Create a database user
5. Go to "Network Access" → Add your IP (or 0.0.0.0 for all)
6. In your cluster, click "Connect" → "Drivers" → Copy the connection string
7. Replace `<username>` and `<password>` with your credentials

### 3. Configure Environment Variables

Create a `.env` file in the `/server` directory:

```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/olms
JWT_SECRET=your_super_secret_jwt_key_here_change_me_in_production
PORT=5000
NODE_ENV=development
```

### 4. Start the Server

```bash
npm run dev
```

The server should start on `http://localhost:5000`

## Frontend Setup

### 1. Create Environment File

Create a `.env` file in the root directory:

```bash
VITE_API_URL=http://localhost:5000/api
```

### 2. Install Dependencies (if not already done)

```bash
npm install
```

### 3. Start the Frontend

```bash
npm run dev
```

## Data Migration (Optional)

If you want to migrate existing localStorage data to MongoDB:

### Export Your Current Data

1. Open the browser console (F12)
2. Go to your OLMS app
3. Run this code in the console:

```javascript
const allData = {
  adminStore: JSON.parse(localStorage.getItem("admin-store") || "{}"),
  courseStore: JSON.parse(localStorage.getItem("course-store-v2") || "{}"),
  studentTeacherStore: JSON.parse(localStorage.getItem("student-teacher-store") || "{}"),
  assignmentStore: JSON.parse(localStorage.getItem("assignment-store") || "{}"),
  quizStore: JSON.parse(localStorage.getItem("quiz-store") || "{}"),
  uiStore: JSON.parse(localStorage.getItem("ui-store") || "{}")
};

console.log(JSON.stringify(allData, null, 2));
```

4. Copy the output and save it as `olms-data.json`

### Migrate Data to MongoDB

You can import the exported data using MongoDB's import tools or create a migration script. For now, you can use sample data by creating users through the API.

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register

### Courses

- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create course (teachers only)
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Assignments

- `GET /api/assignments?courseId=...` - Get assignments
- `POST /api/assignments` - Create assignment (teachers only)
- `POST /api/assignments/:id/submit` - Submit assignment (students only)
- `PUT /api/submissions/:id/grade` - Grade submission (teachers only)

### Quizzes

- `GET /api/quizzes?courseId=...` - Get quizzes
- `POST /api/quizzes` - Create quiz (teachers only)
- `POST /api/quizzes/:id/submit` - Submit quiz (students only)

## Testing the Setup

1. **Register a user:**
   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
   -H "Content-Type: application/json" \
   -d '{
     "email": "test@example.com",
     "password": "password123",
     "name": "Test User",
     "role": "teacher"
   }'
   ```

2. **Login:**
   ```bash
   curl -X POST http://localhost:5000/api/auth/login \
   -H "Content-Type: application/json" \
   -d '{
     "email": "test@example.com",
     "password": "password123"
   }'
   ```

3. Copy the token from the response and use it for authenticated requests

## Troubleshooting

### MongoDB Connection Error
- Check your connection string is correct
- Verify your IP is whitelisted in MongoDB Atlas
- Ensure credentials are accurate

### CORS Errors
- Backend is already configured with CORS enabled for localhost:5173
- If using different ports, update the CORS configuration in `server/src/index.ts`

### Token/Authentication Issues
- Ensure the JWT_SECRET is set in both `.env` files (if needed on frontend)
- Clear browser localStorage and re-login

## Next Steps

1. Start the backend server with `npm run dev` in the `/server` directory
2. Start the frontend with `npm run dev` in the root directory
3. Register a new user through the frontend login page
4. Test creating courses, assignments, and quizzes
5. Verify data is saved in MongoDB Atlas

For more information, check the MongoDB documentation and Express.js guides.
