import { VercelRequest, VercelResponse } from '@vercel/node';
import Assignment from './models/Assignment';
import Submission from './models/Submission';
import { connectDB } from './utils/db';
import { authenticateToken } from './utils/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await connectDB();

    const authResult = await authenticateToken(req);
    if (!authResult.success) {
      return res.status(401).json({ message: authResult.message });
    }

    const { userId, userRole } = authResult;

    // GET /api/assignments
    if (req.method === 'GET' && req.url === '/api/assignments') {
      const { courseId } = req.query;
      const assignments = await Assignment.find({ courseId }).populate('courseId');
      return res.json(assignments);
    }

    // POST /api/assignments
    if (req.method === 'POST' && req.url === '/api/assignments') {
      if (userRole !== 'teacher') {
        return res.status(403).json({ message: 'Unauthorized' });
      }

      const { courseId, title, description, dueDate, maxScore } = req.body;
      const assignment = new Assignment({
        courseId,
        title,
        description,
        dueDate,
        maxScore,
      });
      await assignment.save();
      return res.status(201).json(assignment);
    }

    // GET /api/assignments/:assignmentId/submissions
    if (req.method === 'GET' && req.url?.match(/^\/api\/assignments\/[^\/]+\/submissions$/)) {
      const assignmentId = req.url.split('/')[3];
      const submissions = await Submission.find({ assignmentId }).populate('studentId');
      return res.json(submissions);
    }

    // POST /api/assignments/:assignmentId/submit
    if (req.method === 'POST' && req.url?.match(/^\/api\/assignments\/[^\/]+\/submit$/)) {
      if (userRole !== 'student') {
        return res.status(403).json({ message: 'Unauthorized' });
      }

      const assignmentId = req.url.split('/')[3];
      const { notes, file } = req.body;

      let submission = await Submission.findOne({
        assignmentId,
        studentId: userId,
      });

      if (submission && submission.status === 'graded') {
        return res.status(400).json({ message: 'Assignment already graded' });
      }

      if (!submission) {
        submission = new Submission({
          assignmentId,
          studentId: userId,
        });
      }

      submission.notes = notes;
      submission.file = file;
      submission.status = 'submitted';
      submission.submittedDate = new Date();

      await submission.save();
      return res.status(201).json(submission);
    }

    // PUT /api/submissions/:submissionId/grade
    if (req.method === 'PUT' && req.url?.match(/^\/api\/submissions\/[^\/]+\/grade$/)) {
      if (userRole !== 'teacher') {
        return res.status(403).json({ message: 'Unauthorized' });
      }

      const submissionId = req.url.split('/')[3];
      const { score, feedback } = req.body;
      const submission = await Submission.findByIdAndUpdate(
        submissionId,
        { score, feedback, status: 'graded' },
        { new: true }
      );
      return res.json(submission);
    }

    return res.status(404).json({ message: 'Endpoint not found' });
  } catch (error) {
    console.error('Assignments error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}