import { Router, Response } from 'express';
import Quiz from '../models/Quiz';
import QuizAttempt from '../models/QuizAttempt';
import { authenticate, AuthRequest, authorize } from '../middleware/auth';

const router = Router();

// Get all quizzes for a course
router.get('/quizzes', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { courseId } = req.query;
    const quizzes = await Quiz.find({ courseId });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quizzes', error });
  }
});

// Create quiz (teachers only)
router.post('/quizzes', authenticate, authorize(['teacher']), async (req: AuthRequest, res: Response) => {
  try {
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
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Error creating quiz', error });
  }
});

// Get quiz by ID
router.get('/quizzes/:quizId', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quiz', error });
  }
});

// Submit quiz attempt (students only)
router.post('/quizzes/:quizId/submit', authenticate, authorize(['student']), async (req: AuthRequest, res: Response) => {
  try {
    const { answers } = req.body;
    const quiz = await Quiz.findById(req.params.quizId);
    
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
      quizId: req.params.quizId,
      studentId: req.userId,
      startTime: new Date(),
      endTime: new Date(),
      answers,
      score,
    });

    await attempt.save();
    res.status(201).json(attempt);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting quiz', error });
  }
});

// Get quiz attempts for a student
router.get('/quizzes/:quizId/attempts', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const attempts = await QuizAttempt.find({
      quizId: req.params.quizId,
      studentId: req.userId,
    });
    res.json(attempts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attempts', error });
  }
});

export default router;
