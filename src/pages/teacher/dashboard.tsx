import React from 'react';
import { useCourseStore, useAssignmentStore, useQuizStore } from '../../store';
import { Card } from '../../components/ui/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBookOpen, faTasks, faGraduationCap, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';

export const TeacherDashboard: React.FC = () => {
  const { courses } = useCourseStore();
  const { assignments, submissions } = useAssignmentStore();
  const { quizzes } = useQuizStore();

  const totalStudents = new Set(courses.flatMap(c => c.studentIds)).size;
  const pendingGrading = submissions.filter(s => s.status === 'synced').length; // Needs grading

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-gray-900)' }}>Teacher Dashboard</h1>
          <p style={{ color: 'var(--color-gray-500)', marginTop: '4px' }}>Overview of your classes and tasks</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link to="/teacher/courses">
            <Button variant="primary"><FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }}/> New Course</Button>
          </Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <Card style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '12px', backgroundColor: 'var(--color-blue-pale)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
            <FontAwesomeIcon icon={faBookOpen} />
          </div>
          <div>
            <div style={{ fontSize: '32px', fontWeight: 700 }}>{courses.length}</div>
            <div style={{ color: 'var(--color-gray-500)', fontSize: '14px' }}>Active Courses</div>
          </div>
        </Card>

        <Card style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '12px', backgroundColor: 'var(--color-purple-pale)', color: 'var(--color-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <div>
            <div style={{ fontSize: '32px', fontWeight: 700 }}>{totalStudents}</div>
            <div style={{ color: 'var(--color-gray-500)', fontSize: '14px' }}>Total Students</div>
          </div>
        </Card>

        <Card style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '12px', backgroundColor: 'var(--color-warning-light)', color: 'var(--color-warning)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
            <FontAwesomeIcon icon={faTasks} />
          </div>
          <div>
            <div style={{ fontSize: '32px', fontWeight: 700 }}>{pendingGrading}</div>
            <div style={{ color: 'var(--color-gray-500)', fontSize: '14px' }}>To Grade</div>
          </div>
        </Card>

        <Card style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '12px', backgroundColor: 'var(--color-success-pale)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
            <FontAwesomeIcon icon={faGraduationCap} />
          </div>
          <div>
            <div style={{ fontSize: '32px', fontWeight: 700 }}>{quizzes.length}</div>
            <div style={{ color: 'var(--color-gray-500)', fontSize: '14px' }}>Active Quizzes</div>
          </div>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        <Card style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--color-gray-200)' }}>Recent Submissions requiring Action</h2>
          {submissions.filter(s => s.status === 'synced').length === 0 ? (
            <p style={{ color: 'var(--color-gray-500)', textAlign: 'center', padding: '24px 0' }}>All caught up! No assignments pending grading.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {submissions.filter(s => s.status === 'synced').slice(0, 5).map(sub => {
                const assign = assignments.find(a => a.id === sub.assignmentId);
                return (
                  <div key={sub.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: 'var(--color-gray-50)', borderRadius: '8px' }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>{assign?.title || 'Unknown Assignment'}</div>
                      <div style={{ fontSize: '12px', color: 'var(--color-gray-500)' }}>Student: {sub.studentId} • Submitted: {sub.submittedDate ? new Date(sub.submittedDate).toLocaleDateString() : 'N/A'}</div>
                    </div>
                    <Link to="/teacher/assignments">
                      <Button variant="outline" style={{ fontSize: '12px', padding: '6px 12px' }}>Grade</Button>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        <Card style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--color-gray-200)' }}>Your Classes</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {courses.slice(0, 5).map(course => (
              <div key={course.id} style={{ display: 'flex', alignItems: 'center', padding: '12px', borderLeft: `4px solid ${course.themeColor || 'var(--color-primary)'}`, backgroundColor: 'white', boxShadow: 'var(--shadow-sm)', borderRadius: '0 8px 8px 0' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{course.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-gray-500)' }}>{course.studentIds.length} Students Enrolled</div>
                </div>
                <Link to={`/teacher/courses/${course.id}`}>
                  <Button variant="ghost" style={{ padding: '4px 8px' }}>Manage</Button>
                </Link>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
