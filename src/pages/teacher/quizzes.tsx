import React from 'react';
import { Button } from '../../components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faGraduationCap } from '@fortawesome/free-solid-svg-icons';

export const TeacherQuizzes: React.FC = () => {
  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700 }}>Quiz & Exam Builder</h1>
        <Button variant="primary">
          <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} /> Create Quiz
        </Button>
      </div>

      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', textAlign: 'center', margin: '64px 0' }}>
        <FontAwesomeIcon icon={faGraduationCap} style={{ fontSize: 64, color: 'var(--color-gray-300)', marginBottom: '16px' }} />
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>No Quizzes Yet</h2>
        <p style={{ color: 'var(--color-gray-500)', maxWidth: '400px', margin: '0 auto' }}>Create interactive multiple choice and fill-in-the-blank quizzes with auto-grading functionality.</p>
      </div>
    </div>
  );
};
