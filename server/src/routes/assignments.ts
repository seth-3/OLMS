import { Router, Response } from 'express';
import Assignment from '../models/Assignment';
import Submission from '../models/Submission';
import { authenticate, AuthRequest, authorize } from '../middleware/auth';

const router = Router();

// Get all assignments for a course
router.get('/assignments', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { courseId } = req.query;
    const assignments = await Assignment.find({ courseId }).populate('courseId');
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assignments', error });
  }
});

// Create assignment (teachers only)
router.post('/assignments', authenticate, authorize(['teacher']), async (req: AuthRequest, res: Response) => {
  try {
    const { courseId, title, description, dueDate, maxScore } = req.body;
    const assignment = new Assignment({
      courseId,
      title,
      description,
      dueDate,
      maxScore,
    });
    await assignment.save();
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating assignment', error });
  }
});

// Get submissions for an assignment
router.get('/assignments/:assignmentId/submissions', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const submissions = await Submission.find({ assignmentId: req.params.assignmentId }).populate('studentId');
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching submissions', error });
  }
});

// Submit assignment (students only)
router.post('/assignments/:assignmentId/submit', authenticate, authorize(['student']), async (req: AuthRequest, res: Response) => {
  try {
    const { notes, file } = req.body;
    
    // Check if already submitted
    let submission = await Submission.findOne({
      assignmentId: req.params.assignmentId,
      studentId: req.userId,
    });

    if (submission && submission.status === 'graded') {
      return res.status(400).json({ message: 'Assignment already graded' });
    }

    if (!submission) {
      submission = new Submission({
        assignmentId: req.params.assignmentId,
        studentId: req.userId,
      });
    }

    submission.notes = notes;
    submission.file = file;
    submission.status = 'submitted';
    submission.submittedDate = new Date();

    await submission.save();
    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting assignment', error });
  }
});

// Grade submission (teachers only)
router.put('/submissions/:submissionId/grade', authenticate, authorize(['teacher']), async (req: AuthRequest, res: Response) => {
  try {
    const { score, feedback } = req.body;
    const submission = await Submission.findByIdAndUpdate(
      req.params.submissionId,
      { score, feedback, status: 'graded' },
      { new: true }
    );
    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: 'Error grading submission', error });
  }
});

export default router;
