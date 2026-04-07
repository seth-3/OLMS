import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { useCourseStore, useStudentTeacherStore } from '../store';
import { Card } from '../components/ui/card';
import { ProgressBar } from '../components/ui/progress-bar';
import { Icon } from '../components/ui/icon';

export const LearningMaterials: React.FC = () => {
  const { courses } = useCourseStore();
  const { userProgress } = useStudentTeacherStore();

  return (
    <div style={{ padding: '24px', maxWidth: '1024px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700 }}>Learning Materials</h1>
        <p style={{ fontSize: '16px', color: 'var(--color-gray-500)' }}>Choose a subject to start learning</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {courses.length === 0 ? (
          <Card style={{ padding: '48px', textAlign: 'center', color: 'var(--color-gray-500)' }}>
            <FontAwesomeIcon icon={faBookOpen} style={{ fontSize: 48, marginBottom: '16px', opacity: 0.5 }} />
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>No Courses Available</h3>
            <p>Courses will be added by teachers. Check back later!</p>
          </Card>
        ) : (
          courses.map(course => {
            const iconName = 'book'; // Default icon since no mock data
            
            // For now, show placeholder lesson count - teachers will add actual lessons
            const lessonCount = 5; // Placeholder until lessons are created
            
            // Progress from user progress
            const enrolledProg = userProgress?.subjects?.[course.id];
            let progress = 0;
            if (enrolledProg && lessonCount > 0) {
              progress = Math.round((enrolledProg.completed / lessonCount) * 100);
            }

            return (
              <Link key={course.id} to={`/subject/${course.id}`}>
                <Card hoverable style={{ display: 'flex', alignItems: 'center', padding: '16px' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '12px', backgroundColor: (course.themeColor || '#3b82f6') + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px', color: course.themeColor }}>
                    <Icon name={iconName} size={32} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 600 }}>{course.name}</h3>
                    <p style={{ fontSize: '14px', color: 'var(--color-gray-500)', marginBottom: '8px' }}>{lessonCount} lessons • {course.description}</p>
                    <ProgressBar progress={progress} color={course.themeColor} />
                  </div>
                  <div style={{ marginLeft: '16px' }}>
                    <FontAwesomeIcon icon={faChevronRight} color="var(--color-gray-400)" />
                  </div>
                </Card>
              </Link>
            )
          })
        )}
      </div>

      <div style={{ marginTop: '24px', backgroundColor: 'var(--color-blue-subtle)', border: '1px solid var(--color-primary)', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <FontAwesomeIcon icon={faBookOpen} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-primary-hover)', marginBottom: '4px' }}>All Materials Available Offline</h4>
          <p style={{ fontSize: '14px', color: '#1e40af' }}>These subjects are saved on your device. You can access them anytime without internet.</p>
        </div>
      </div>
    </div>
  );
};
