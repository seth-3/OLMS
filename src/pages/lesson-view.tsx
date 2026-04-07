import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faCheckCircle, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../components/ui/button';
import { ProgressBar } from '../components/ui/progress-bar';

export const LessonView: React.FC = () => {
  const navigate = useNavigate();
  
  // No mock data, so lesson not found
  let lessonSubjectId = '';
  let lesson: any = null;

  const subject: any = null; // No subject
  const [currentPage, setCurrentPage] = useState(0);
  const [completed, setCompleted] = useState(false);

  if (!lesson) return <div style={{ padding: '24px' }}>Lesson not found.</div>;

  const itemsPerPage = 3;
  const totalPages = Math.ceil((lesson.content?.length || 1) / itemsPerPage);
  const currentContent = lesson.content?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage) || [];
  const progressPercent = ((currentPage + 1) / totalPages) * 100;

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  if (completed) {
    return (
      <div style={{ padding: '24px', maxWidth: '448px', margin: '64px auto 0', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: 80 }} color="var(--color-success)" />
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Lesson Complete!</h1>
        <p style={{ fontSize: '16px', color: 'var(--color-gray-500)', marginBottom: '32px' }}>Great job! You've completed this lesson.</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Button variant="primary" fullWidth onClick={() => navigate(`/subject/${lessonSubjectId}`)}>Back to Lessons</Button>
          <Button variant="outline" fullWidth onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto', paddingBottom: '100px' }}>
      <Link to={`/subject/${lessonSubjectId}`} style={{ display: 'inline-block', marginBottom: '16px' }}>
        <Button variant="ghost" style={{ padding: '8px 12px' }}>
          <FontAwesomeIcon icon={faChevronLeft} style={{ fontSize: 20 }} /> Back to Subject
        </Button>
      </Link>

      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '14px', color: 'var(--color-gray-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{subject?.name || 'Subject'}</div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-gray-900)' }}>{lesson.title}</h1>
        <div style={{ fontSize: '14px', color: 'var(--color-gray-500)', margin: '8px 0' }}>
          {lesson.duration} | Page {currentPage + 1} of {totalPages}
        </div>
        <ProgressBar progress={progressPercent} />
      </div>

      <div style={{ minHeight: '300px' }}>
        {currentContent.map((item: any, index: number) => {
          if (item.type === 'heading') {
            return <h2 key={index} style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-gray-900)', marginTop: '8px', marginBottom: '24px' }}>{item.content}</h2>;
          }
          if (item.type === 'text') {
            return <p key={index} style={{ fontSize: '16px', color: 'var(--color-gray-700)', marginBottom: '16px', lineHeight: 1.6 }}>{item.content}</p>;
          }
          if (item.type === 'formula') {
            return (
              <div key={index} style={{ backgroundColor: 'var(--color-blue-pale)', border: '1px solid var(--color-blue-light)', padding: '16px', borderRadius: '8px', textAlign: 'center', fontSize: '18px', fontFamily: 'monospace', marginBottom: '16px' }}>
                {item.content}
              </div>
            );
          }
          if (item.type === 'example') {
            return (
              <div key={index} style={{ backgroundColor: 'var(--color-success-pale)', border: '1px solid var(--color-success)', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <FontAwesomeIcon icon={faBookOpen} style={{ fontSize: 20 }} color="var(--color-success)" />
                  <span style={{ fontWeight: 700, fontSize: '16px' }}>{item.title || 'Example'}</span>
                </div>
                <div style={{ fontSize: '14px' }}>{item.content}</div>
              </div>
            );
          }
          if (item.type === 'practice') {
            return (
              <div key={index} style={{ backgroundColor: 'var(--color-purple-pale)', border: '1px solid var(--color-purple)', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
                <div style={{ fontWeight: 700, marginBottom: '8px' }}>{item.title || 'Practice'}</div>
                <div>{item.content}</div>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
        <Button variant="outline" style={{ flex: 1 }} onClick={handlePrev} disabled={currentPage === 0}>
          Previous
        </Button>
        <Button variant="primary" style={{ flex: 1 }} onClick={handleNext}>
          {currentPage === totalPages - 1 ? 'Complete Lesson' : 'Next'}
        </Button>
      </div>
    </div>
  );
};
