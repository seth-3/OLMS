import React from 'react';
import { useStudentTeacherStore, useCourseStore } from '../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
import { Card } from '../components/ui/card';
import { ProgressBar } from '../components/ui/progress-bar';
import { Icon } from '../components/ui/icon';

export const Progress: React.FC = () => {
  const { userProgress } = useStudentTeacherStore();
  const { courses } = useCourseStore();

  const totalLessons = userProgress?.totalLessons || 0;
  const completedLessons = userProgress?.completedLessons || 0;
  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div style={{ padding: '24px', maxWidth: '1024px', margin: '0 auto', paddingBottom: '32px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700 }}>Your Progress</h1>
        <p style={{ fontSize: '16px', color: 'var(--color-gray-500)' }}>Track your learning journey</p>
      </div>

      <div style={{ background: 'linear-gradient(to right, var(--color-blue-light), var(--color-purple))', borderRadius: '12px', padding: '24px', color: 'white', display: 'flex', flexDirection: 'column', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
            <FontAwesomeIcon icon={faArrowTrendUp} style={{ fontSize: 32 }} color="white" />
          </div>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 700 }}>Overall Progress</h2>
            <div style={{ fontSize: '16px', opacity: 0.9 }}>{completedLessons} of {totalLessons} lessons completed</div>
          </div>
        </div>
        <div style={{ marginBottom: '8px' }}>
          <ProgressBar progress={overallProgress} color="white" />
        </div>
        <div style={{ fontSize: '32px', fontWeight: 700, alignSelf: 'flex-end' }}>{overallProgress}%</div>
      </div>

      <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>Progress by Subject</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
        {courses.map(course => {
          const prog = userProgress?.subjects[course.id];
          const courseIcon = 'book'; // Default icon
          if (!prog) return null;
          const p = prog.total > 0 ? Math.round((prog.completed / prog.total) * 100) : 0;
          
          return (
            <Card key={course.id} style={{ display: 'flex', alignItems: 'center', padding: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: (course.themeColor || '#3b82f6') + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px', color: course.themeColor }}>
                <Icon name={courseIcon} size={20} />
              </div>
              <div style={{ flex: 1, marginRight: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600 }}>{course.name}</h3>
                <div style={{ fontSize: '14px', color: 'var(--color-gray-500)', marginBottom: '8px' }}>{prog.completed}/{prog.total}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                     <ProgressBar progress={p} color={course.themeColor} />
                  </div>
                  <span style={{ fontSize: '14px', color: 'var(--color-gray-500)' }}>{p}%</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700 }}>Achievements</h2>
        <div style={{ color: 'var(--color-gray-500)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Icon name="star" size={14} /> 0/0
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {/* No achievements */}
      </div>

      {userProgress?.studyStreak > 0 && (
        <div style={{ backgroundColor: 'var(--color-success-pale)', border: '2px solid var(--color-success)', padding: '24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--color-success-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#065f46' }}>
            <Icon name="calendar" size={32} />
          </div>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#065f46' }}>{userProgress.studyStreak} Day Streak!</h2>
            <p style={{ fontSize: '16px', color: '#047857' }}>Keep it up! You're on fire!</p>
          </div>
        </div>
      )}
    </div>
  );
};
