import React from 'react';
import { useCourseStore } from '../../store';
import { Card } from '../../components/ui/card';

export const AdminCourses: React.FC = () => {
  const { courses } = useCourseStore();

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700 }}>Course Directory</h1>
        <p style={{ color: 'var(--color-gray-500)' }}>View and monitor all courses across the institution</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {courses.map(course => (
          <Card key={course.id} style={{ overflow: 'hidden' }}>
            <div style={{ height: '8px', backgroundColor: course.themeColor || 'var(--color-primary)' }}></div>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                 <h2 style={{ fontSize: '20px', fontWeight: 700 }}>{course.name}</h2>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--color-gray-500)', marginBottom: '16px', minHeight: '40px' }}>{course.description}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--color-gray-600)', borderTop: '1px solid var(--color-gray-100)', paddingTop: '16px' }}>
                <span>Teacher: {course.teacherId}</span>
                <span>{course.studentIds.length} Students</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
