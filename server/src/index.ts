import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './utils/db';
import authRoutes from './routes/auth';
import courseRoutes from './routes/courses';
import assignmentRoutes from './routes/assignments';
import quizRoutes from './routes/quizzes';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5001;

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

// Request logging middleware
app.use((req: Request, res: Response, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// Serve static files from the React app build directory
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client')));
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', courseRoutes);
app.use('/api', assignmentRoutes);
app.use('/api', quizRoutes);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK' });
});

// Catch all handler: send back React's index.html file for client-side routing
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  });
}

// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
