import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from './components/layout';
import { TeacherLayout } from './components/teacher-layout';

import { Landing } from './pages/landing';
import { Login } from './pages/login';
import { Signup } from './pages/signup';
import { ChangePassword } from './pages/change-password';
import { Dashboard } from './pages/dashboard';
import { LearningMaterials } from './pages/learning-materials';
import { SubjectView } from './pages/subject-view';
import { LessonView } from './pages/lesson-view';
import { Assignments } from './pages/assignments';
import { Progress } from './pages/progress';

import { TeacherDashboard } from './pages/teacher/dashboard';
import { TeacherCourses } from './pages/teacher/courses';
import { TeacherCourseDetail } from './pages/teacher/course-detail';
import { TeacherAssignments } from './pages/teacher/assignments';
import { TeacherStudents } from './pages/teacher/students';
import { TeacherCommunication } from './pages/teacher/communication';
import { TeacherQuizzes } from './pages/teacher/quizzes';

import { AdminDashboard } from './pages/admin/dashboard';
import { AdminUsers } from './pages/admin/users';
import { AdminCourses } from './pages/admin/courses';
import { AdminSystem } from './pages/admin/system';
import { AdminLayout } from './components/admin-layout';

export const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/change-password', element: <ChangePassword /> },
  {
    path: '/teacher',
    element: <TeacherLayout />,
    children: [
      { path: 'dashboard', element: <TeacherDashboard /> },
      { path: 'courses', element: <TeacherCourses /> },
      { path: 'courses/:courseId', element: <TeacherCourseDetail /> },
      { path: 'assignments', element: <TeacherAssignments /> },
      { path: 'students', element: <TeacherStudents /> },
      { path: 'communication', element: <TeacherCommunication /> },
      { path: 'quizzes', element: <TeacherQuizzes /> },
      { path: '', element: <Navigate to="/teacher/dashboard" replace /> }
    ]
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { path: 'dashboard', element: <AdminDashboard /> },
      { path: 'users', element: <AdminUsers /> },
      { path: 'courses', element: <AdminCourses /> },
      { path: 'system', element: <AdminSystem /> },
      { path: '', element: <Navigate to="/admin/dashboard" replace /> }
    ]
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'learning', element: <LearningMaterials /> },
      { path: 'subject/:subjectId', element: <SubjectView /> },
      { path: 'lesson/:lessonId', element: <LessonView /> },
      { path: 'assignments', element: <Assignments /> },
      { path: 'progress', element: <Progress /> },
    ],
  },
]);
