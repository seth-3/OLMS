import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './utils/db';
import authRoutes from './routes/auth';
import courseRoutes from './routes/courses';
import assignmentRoutes from './routes/assignments';
import quizRoutes from './routes/quizzes';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

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
app.get('/health', (req: express.Request, res: express.Response) => {
  res.json({ status: 'OK' });
});

// Catch all handler: send back React's index.html file for client-side routing
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req: express.Request, res: express.Response) => {
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
