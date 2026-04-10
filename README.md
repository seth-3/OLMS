# Online Learning Management System (OLMS)

A comprehensive learning management system built with React, Node.js, Express, and MongoDB.

## 🚀 Features

- **User Authentication**: Secure login/logout with JWT tokens
- **Role-Based Access**: Admin, Teacher, and Student roles
- **Course Management**: Create, edit, delete courses
- **Module Management**: Organize course content into modules
- **Learning Materials**: Upload and manage course content
- **Assignments**: Create, submit, and grade assignments
- **Quizzes**: Create, take, and evaluate quizzes
- **Responsive Design**: Works on desktop and mobile devices

## 📋 Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- **MongoDB** database (local or Atlas)
- **Git** for version control

## 🛠️ Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/seth-3/OLMS.git
cd OLMS
```

### 2. Install Dependencies
```bash
# Install root dependencies (frontend)
npm install

# Install server dependencies
cd server
npm install
```

### 3. Environment Configuration
```bash
# Copy environment template
cp .env.example .env

# Edit .env file with your configuration
```

#### Required Environment Variables:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Your JWT secret key (use a strong random string)
- `PORT`: Server port (default: 5001)
- `VITE_API_URL`: API endpoint (default: /api)
- `NODE_ENV`: Environment (development/production)

#### Example .env Configuration:
```env
MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/olms"
JWT_SECRET="your-super-secret-jwt-key-here"
PORT="5001"
VITE_API_URL="/api"
NODE_ENV="development"
```

## 🏃‍♂️ Running the Application

### Method 1: Quick Start (Recommended)
```bash
# Use the provided batch file (Windows)
start-dev.bat

# Or manually run both servers
npm run dev:full
```

### Method 2: Separate Terminals

#### Terminal 1 - Backend Server:
```bash
cd server
npm run dev
```
**Server will run on**: http://localhost:5001

#### Terminal 2 - Frontend Server:
```bash
npm run dev
```
**Frontend will run on**: http://localhost:5173

### Method 3: Production Build Test
```bash
# Test production build locally
npm run build:vercel
```

## 🌐 Application URLs

### Development Environment:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5001/api
- **Health Check**: http://localhost:5001/health

### Production (After Deployment):
- **Frontend**: Your Vercel/Render URL
- **Backend API**: Your Vercel/Render URL + /api

## 📚 Usage Guide

### 1. Getting Started

#### For Students:
1. **Register Account**: Click "Sign Up" and select "Student" role
2. **Login**: Use your credentials to access the system
3. **Browse Courses**: View available courses and enroll
4. **Access Materials**: Download course materials and view content
5. **Submit Assignments**: Complete and submit assignments
6. **Take Quizzes**: Participate in course assessments

#### For Teachers:
1. **Register Account**: Click "Sign Up" and select "Teacher" role
2. **Create Courses**: Design and publish new courses
3. **Manage Modules**: Organize course content into modules
4. **Upload Materials**: Add learning resources
5. **Create Assignments**: Design and grade student work
6. **Monitor Progress**: Track student engagement

#### For Administrators:
1. **Login**: Use admin credentials
2. **User Management**: Manage all user accounts
3. **System Oversight**: Monitor all platform activity
4. **Configuration**: Manage system settings

### 2. Course Management

#### Creating a Course:
1. Login as Teacher
2. Navigate to Dashboard
3. Click "Create Course"
4. Fill in course details:
   - Course title
   - Description
   - Duration
   - Start/end dates
5. Add modules and materials
6. Publish the course

#### Managing Course Content:
1. **Modules**: Organize content into logical units
2. **Materials**: Upload PDFs, videos, links
3. **Assignments**: Create graded activities
4. **Quizzes**: Add knowledge checks

### 3. Assignment Workflow

#### For Teachers:
1. **Create Assignment**: Define requirements and due dates
2. **Set Grading**: Create rubric or point system
3. **Monitor Submissions**: Track student work
4. **Provide Feedback**: Grade and comment on submissions

#### For Students:
1. **View Assignments**: See all assigned work
2. **Submit Work**: Upload completed assignments
3. **Check Grades**: View feedback and scores
4. **Track Progress**: Monitor overall performance

### 4. Quiz System

#### Creating Quizzes:
1. **Design Questions**: Multiple choice, true/false, short answer
2. **Set Time Limits**: Control quiz duration
3. **Configure Attempts**: Allow multiple tries if needed
4. **Publish**: Make quiz available to Students

#### Taking Quizzes:
1. **Access Quiz**: Click on quiz link
2. **Answer Questions**: Complete all questions
3. **Submit**: Submit before time expires
4. **View Results**: Check score and feedback

## 🔧 Development

### Project Structure:
```
OLMS/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── store/
│   ├── public/
│   └── package.json
├── server/                # Node.js backend
│   ├── src/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── utils/
│   ├── dist/               # Compiled JavaScript
│   └── package.json
├── .env.example           # Environment template
├── .env                  # Your environment variables
└── README.md              # This file
```

### Adding New Features:
1. **Backend Routes**: Add new endpoints in `server/src/routes/`
2. **Frontend Components**: Create reusable components in `client/src/components/`
3. **Database Models**: Define schemas in `server/src/models/`
4. **API Integration**: Connect frontend to backend via `client/src/utils/api.ts`

### Code Style:
- **TypeScript**: All code uses TypeScript for type safety
- **ESLint**: Follow configured linting rules
- **Git**: Use conventional commit messages
- **Testing**: Test both frontend and backend changes

## 🚀 Deployment

### Vercel Deployment:
1. **Install Vercel CLI**: `npm i -g vercel`
2. **Login**: `vercel login`
3. **Deploy**: `vercel --prod`
4. **Set Environment Variables**: Configure in Vercel dashboard

### Render Deployment:
1. **Connect Repository**: Link your GitHub repository
2. **Configure Service**: Set build and start commands
3. **Set Environment Variables**: Add MongoDB URI and JWT secret
4. **Deploy**: Push changes to trigger deployment

### Environment Variables for Production:
- `MONGODB_URI`: Production database connection
- `JWT_SECRET`: Production JWT secret
- `NODE_ENV`: `production`

## 🔍 Troubleshooting

### Common Issues:

#### Server Won't Start:
1. **Check Port**: Ensure port 5001 is available
2. **MongoDB Connection**: Verify database URI is correct
3. **Environment Variables**: Check .env file configuration
4. **Dependencies**: Run `npm install` in server directory

#### Frontend Errors:
1. **API Connection**: Check `VITE_API_URL` in .env
2. **CORS Issues**: Verify server CORS configuration
3. **Build Errors**: Check TypeScript and Vite configuration

#### Database Issues:
1. **Connection Failed**: Verify MongoDB URI and network access
2. **Permission Denied**: Check database user credentials
3. **Performance**: Add indexes to improve query speed

### Debug Commands:
```bash
# Check TypeScript compilation
cd server && npx tsc --noEmit

# Test API endpoint
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test"}'

# Check server logs
cd server && npm run dev
```

## 🤝 Support

### Getting Help:
1. **Check Logs**: Look at browser console and server terminal
2. **Review Documentation**: Read this README and code comments
3. **Test Environment**: Try in development before production
4. **Community**: Use GitHub Issues for bug reports

### Contributing:
1. **Fork Repository**: Create your own copy
2. **Create Branch**: Work on feature branch
3. **Submit Pull Request**: Propose changes for review
4. **Follow Guidelines**: Maintain code quality and documentation

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

---

**Happy Learning! 🎓**

For questions or support, please create an issue in the GitHub repository or contact the development team.
