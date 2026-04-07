import React, { useState } from 'react';
import { useCourseStore } from '../../store';
import { Button } from '../../components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export const TeacherCourses: React.FC = () => {
  const { courses, createCourse, deleteCourse } = useCourseStore();
  const [isCreating, setIsCreating] = useState(false);
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseDesc, setNewCourseDesc] = useState('');

  const handleCreate = () => {
    if (newCourseName.trim()) {
      createCourse({
        teacherId: 't-1',
        name: newCourseName,
        description: newCourseDesc,
        themeColor: '#3b82f6',
        studentIds: [],
        createdAt: new Date().toISOString()
      });
      setIsCreating(false);
      setNewCourseName('');
      setNewCourseDesc('');
    }
  };

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700 }}>Course Management</h1>
        <Button variant="primary" onClick={() => setIsCreating(true)}>
          <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} />
          Create Course
        </Button>
      </div>

      {isCreating && (
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>Create New Course</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' }}>
            <input 
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--color-gray-300)' }}
              placeholder="Course Name"
              value={newCourseName}
              onChange={e => setNewCourseName(e.target.value)}
            />
            <textarea 
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--color-gray-300)' }}
              placeholder="Course Description"
              value={newCourseDesc}
              onChange={e => setNewCourseDesc(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="outline" onClick={() => setIsCreating(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleCreate}>Save Course</Button>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {courses.map(course => (
          <div key={course.id} style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-gray-200)' }}>
            <div style={{ height: '80px', backgroundColor: course.themeColor || 'var(--color-primary)' }} />
            <div style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>{course.name}</h3>
              <p style={{ color: 'var(--color-gray-500)', fontSize: '14px', marginBottom: '16px', height: '40px', overflow: 'hidden' }}>{course.description}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-gray-100)', paddingTop: '16px' }}>
                <span style={{ fontSize: '12px', color: 'var(--color-gray-500)' }}>{course.studentIds.length} enrolled</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button variant="ghost" style={{ padding: '8px' }} onClick={() => deleteCourse(course.id)}>
                    <FontAwesomeIcon icon={faTrash} color="var(--color-error)" />
                  </Button>
                  <Link to={`/teacher/courses/${course.id}`}>
                    <Button variant="outline" style={{ padding: '8px 12px' }}>
                      <FontAwesomeIcon icon={faFolderOpen} style={{ marginRight: '8px' }} /> Manage
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        {courses.length === 0 && !isCreating && (
          <div style={{ gridColumn: '1 / -1', padding: '48px', textAlign: 'center', backgroundColor: 'var(--color-gray-50)', borderRadius: '12px' }}>
            <div style={{ fontSize: '48px', color: 'var(--color-gray-300)', marginBottom: '16px' }}>📚</div>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-gray-900)' }}>No Courses Yet</h2>
            <p style={{ color: 'var(--color-gray-500)' }}>Get started by creating your first course.</p>
          </div>
        )}
      </div>
    </div>
  );
};
