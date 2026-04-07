import { Router, Response } from 'express';
import Course from '../models/Course';
import Module from '../models/Module';
import LearningMaterial from '../models/LearningMaterial';
import { authenticate, AuthRequest, authorize } from '../middleware/auth';

const router = Router();

// Get all courses
router.get('/courses', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    let courses;
    if (req.userRole === 'teacher') {
      courses = await Course.find({ teacherId: req.userId }).populate('studentIds');
    } else if (req.userRole === 'student') {
      courses = await Course.find({ studentIds: req.userId }).populate('teacherId');
    }
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses', error });
  }
});

// Create course (teachers only)
router.post('/courses', authenticate, authorize(['teacher']), async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, themeColor } = req.body;
    const course = new Course({
      teacherId: req.userId,
      name,
      description,
      themeColor,
      studentIds: [],
    });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error creating course', error });
  }
});

// Update course
router.put('/courses/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.teacherId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    Object.assign(course, req.body);
    await course.save();
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error updating course', error });
  }
});

// Delete course
router.delete('/courses/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.teacherId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting course', error });
  }
});

// Get modules for a course
router.get('/courses/:courseId/modules', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const modules = await Module.find({ courseId: req.params.courseId });
    res.json(modules);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching modules', error });
  }
});

// Create module
router.post('/courses/:courseId/modules', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { title, order } = req.body;
    const module = new Module({
      courseId: req.params.courseId,
      title,
      order,
    });
    await module.save();
    res.status(201).json(module);
  } catch (error) {
    res.status(500).json({ message: 'Error creating module', error });
  }
});

// Get learning materials for a module
router.get('/modules/:moduleId/materials', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const materials = await LearningMaterial.find({ moduleId: req.params.moduleId });
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching materials', error });
  }
});

// Create learning material
router.post('/modules/:moduleId/materials', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { title, type, url } = req.body;
    const material = new LearningMaterial({
      moduleId: req.params.moduleId,
      title,
      type,
      url,
    });
    await material.save();
    res.status(201).json(material);
  } catch (error) {
    res.status(500).json({ message: 'Error creating material', error });
  }
});

export default router;
