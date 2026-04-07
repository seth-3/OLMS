import { VercelRequest, VercelResponse } from '@vercel/node';
import Quiz from '../../server/src/models/Quiz';
import QuizAttempt from '../../server/src/models/QuizAttempt';
import { connectDB } from '../../server/src/utils/db';
import { authenticateToken } from '../../server/src/middleware/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await connectDB();

    const authResult = await authenticateToken(req);
    if (!authResult.success) {
      return res.status(401).json({ message: authResult.message });
    }

    const { userId, userRole } = authResult;

    // GET /api/quizzes
    if (req.method === 'GET' && req.url === '/api/quizzes') {
      const { courseId } = req.query;
      const quizzes = await Quiz.find({ courseId });
      return res.json(quizzes);
    }

    // POST /api/quizzes
    if (req.method === 'POST' && req.url === '/api/quizzes') {
      if (userRole !== 'teacher') {
        return res.status(403).json({ message: 'Unauthorized' });
      }

      const { courseId, title, description, timeLimitMinutes, dueDate, questions } = req.body;
      const quiz = new Quiz({
        courseId,
        title,
        description,
        timeLimitMinutes,
        dueDate,
        questions,
      });
      await quiz.save();
      return res.status(201).json(quiz);
    }

    // GET /api/quizzes/:quizId
    if (req.method === 'GET' && req.url?.match(/^\/api\/quizzes\/[^\/]+$/)) {
      const quizId = req.url.split('/')[3];
      const quiz = await Quiz.findById(quizId);
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
      return res.json(quiz);
    }

    // POST /api/quizzes/:quizId/submit
    if (req.method === 'POST' && req.url?.match(/^\/api\/quizzes\/[^\/]+\/submit$/)) {
      if (userRole !== 'student') {
        return res.status(403).json({ message: 'Unauthorized' });
      }

      const quizId = req.url.split('/')[3];
      const { answers } = req.body;
      const quiz = await Quiz.findById(quizId);

      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }

      // Calculate score
      let score = 0;
      quiz.questions.forEach((q) => {
        const questionId = q._id?.toString();
        if (questionId && answers[questionId] === q.correctAnswer) {
          score += q.points;
        }
      });

      const attempt = new QuizAttempt({
        quizId,
        studentId: userId,
        startTime: new Date(),
        endTime: new Date(),
        answers,
        score,
      });

      await attempt.save();
      return res.status(201).json(attempt);
    }

    // GET /api/quizzes/:quizId/attempts
    if (req.method === 'GET' && req.url?.match(/^\/api\/quizzes\/[^\/]+\/attempts$/)) {
      const quizId = req.url.split('/')[3];
      const attempts = await QuizAttempt.find({
        quizId,
        studentId: userId,
      });
      return res.json(attempts);
    }

    return res.status(404).json({ message: 'Endpoint not found' });
  } catch (error) {
    console.error('Quizzes error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}