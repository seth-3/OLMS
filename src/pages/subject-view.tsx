import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faPlay, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useCourseStore, useStudentTeacherStore } from '../store';
import { Button } from '../components/ui/button';
import { ProgressBar } from '../components/ui/progress-bar';
import { Icon } from '../components/ui/icon';

export const SubjectView: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { courses } = useCourseStore();
  const { userProgress } = useStudentTeacherStore();
  
  const course = courses.find(c => c.id === subjectId);
  const lessons: any[] = []; // No mock lessons

  if (!course) return <div style={{ padding: '24px' }}>Subject not found.</div>;

  const iconName = 'book'; // Default icon
  
  // Dynamic completion logic
  const lessonCount = lessons.length;
  const enrolledProg = userProgress?.subjects?.[course.id];
  let progress = 0;
  if (enrolledProg && lessonCount > 0) {
      progress = Math.round((enrolledProg.completed / lessonCount) * 100);
  }

  return (
    <div style={{ padding: '24px', maxWidth: '1024px', margin: '0 auto' }}>
      <Link to="/learning" style={{ display: 'inline-block', marginBottom: '16px' }}>
        <Button variant="ghost" style={{ padding: '8px 12px' }}>
          <FontAwesomeIcon icon={faChevronLeft} /> Back to Subjects
        </Button>
      </Link>

      <div style={{ background: `linear-gradient(to right, ${course.themeColor}, var(--color-primary))`, borderRadius: '12px', padding: '24px', color: 'white', marginBottom: '24px' }}>
        <div style={{ width: '64px', height: '64px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginBottom: '16px' }}>
          <Icon name={iconName} size={32} />
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>{course.name}</h1>
        <p style={{ fontSize: '16px', opacity: 0.9, marginBottom: '16px' }}>{course.description}</p>
        
        <ProgressBar progress={progress} color="white" />
        <div style={{ fontSize: '14px', opacity: 0.9, marginTop: '8px' }}>
          {enrolledProg?.completed || lessons.filter(l => l.completed).length}/{lessonCount} Completed
        </div>
      </div>

      <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', color: 'var(--color-gray-900)' }}>Lessons</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {lessons.length === 0 && <p style={{ color: 'var(--color-gray-500)' }}>No lessons available for this subject.</p>}
        {lessons.map((lesson, idx) => (
          <Link key={lesson.id} to={`/lesson/${lesson.id}`} style={{ textDecoration: 'none' }}>
            <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', display: 'flex', alignItems: 'center', borderLeft: `4px solid ${lesson.completed ? 'var(--color-success)' : 'var(--color-primary)'}`, boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-blue-subtle)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, marginRight: '16px' }}>
                {idx + 1}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-gray-900)' }}>{lesson.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--color-gray-500)' }}>{lesson.duration}</p>
              </div>
              <div style={{ marginLeft: '16px' }}>
                {lesson.completed ? (
                  <FontAwesomeIcon icon={faCheckCircle} color="var(--color-success)" style={{ fontSize: 24 }} />
                ) : (
                  <FontAwesomeIcon icon={faPlay} color="var(--color-primary)" style={{ fontSize: 24 }} />
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
