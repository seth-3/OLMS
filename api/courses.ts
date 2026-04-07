import { VercelRequest, VercelResponse } from '@vercel/node';
import Course from '../../server/src/models/Course';
import Module from '../../server/src/models/Module';
import LearningMaterial from '../../server/src/models/LearningMaterial';
import { connectDB } from '../../server/src/utils/db';
import { authenticateToken } from '../../server/src/middleware/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await connectDB();

    // Authenticate user
    const authResult = await authenticateToken(req);
    if (!authResult.success) {
      return res.status(401).json({ message: authResult.message });
    }

    const { userId, userRole } = authResult;

    // GET /api/courses
    if (req.method === 'GET' && req.url === '/api/courses') {
      let courses;
      if (userRole === 'teacher') {
        courses = await Course.find({ teacherId: userId }).populate('studentIds');
      } else if (userRole === 'student') {
        courses = await Course.find({ studentIds: userId }).populate('teacherId');
      }
      return res.json(courses);
    }

    // POST /api/courses
    if (req.method === 'POST' && req.url === '/api/courses') {
      if (userRole !== 'teacher') {
        return res.status(403).json({ message: 'Unauthorized' });
      }

      const { name, description, themeColor } = req.body;
      const course = new Course({
        teacherId: userId,
        name,
        description,
        themeColor,
        studentIds: [],
      });
      await course.save();
      return res.status(201).json(course);
    }

    // PUT /api/courses/:id
    if (req.method === 'PUT' && req.url?.match(/^\/api\/courses\/[^\/]+$/)) {
      const courseId = req.url.split('/')[3];
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }

      if (course.teacherId.toString() !== userId) {
        return res.status(403).json({ message: 'Unauthorized' });
      }

      Object.assign(course, req.body);
      await course.save();
      return res.json(course);
    }

    // DELETE /api/courses/:id
    if (req.method === 'DELETE' && req.url?.match(/^\/api\/courses\/[^\/]+$/)) {
      const courseId = req.url.split('/')[3];
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }

      if (course.teacherId.toString() !== userId) {
        return res.status(403).json({ message: 'Unauthorized' });
      }

      await Course.findByIdAndDelete(courseId);
      return res.json({ message: 'Course deleted' });
    }

    // GET /api/courses/:courseId/modules
    if (req.method === 'GET' && req.url?.match(/^\/api\/courses\/[^\/]+\/modules$/)) {
      const courseId = req.url.split('/')[3];
      const modules = await Module.find({ courseId });
      return res.json(modules);
    }

    // POST /api/courses/:courseId/modules
    if (req.method === 'POST' && req.url?.match(/^\/api\/courses\/[^\/]+\/modules$/)) {
      const courseId = req.url.split('/')[3];
      const { title, order } = req.body;
      const module = new Module({
        courseId,
        title,
        order,
      });
      await module.save();
      return res.status(201).json(module);
    }

    // GET /api/modules/:moduleId/materials
    if (req.method === 'GET' && req.url?.match(/^\/api\/modules\/[^\/]+\/materials$/)) {
      const moduleId = req.url.split('/')[3];
      const materials = await LearningMaterial.find({ moduleId });
      return res.json(materials);
    }

    // POST /api/modules/:moduleId/materials
    if (req.method === 'POST' && req.url?.match(/^\/api\/modules\/[^\/]+\/materials$/)) {
      const moduleId = req.url.split('/')[3];
      const { title, type, url } = req.body;
      const material = new LearningMaterial({
        moduleId,
        title,
        type,
        url,
      });
      await material.save();
      return res.status(201).json(material);
    }

    return res.status(404).json({ message: 'Endpoint not found' });
  } catch (error) {
    console.error('Courses error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}