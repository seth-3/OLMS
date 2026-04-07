import React, { useState } from 'react';
import { useAssignmentStore, useCourseStore } from '../../store';
import { Button } from '../../components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export const TeacherAssignments: React.FC = () => {
  const { assignments, submissions, createAssignment, gradeSubmission } = useAssignmentStore();
  const { courses } = useCourseStore();
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(courses[0]?.id || '');
  const [score, setScore] = useState<Record<string, number>>({});

  const handleCreate = () => {
    createAssignment({
      courseId: selectedCourse,
      title,
      description: desc,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week
      maxScore: 100
    });
    setIsCreating(false);
    setTitle('');
    setDesc('');
  };

  const handleGrade = (subId: string, maxScore: number) => {
    const s = score[subId] || maxScore;
    gradeSubmission(subId, s, "Graded by teacher");
  };

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700 }}>Assignments & Grading</h1>
        <Button variant="primary" onClick={() => setIsCreating(!isCreating)}>
          <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} /> Create Assignment
        </Button>
      </div>

      {isCreating && (
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>New Assignment</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' }}>
            <select 
              value={selectedCourse} 
              onChange={e => setSelectedCourse(e.target.value)}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--color-gray-300)' }}
            >
              <option value="" disabled>Select Course</option>
              {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <input 
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--color-gray-300)' }}
              placeholder="Assignment Title" value={title} onChange={e => setTitle(e.target.value)}
            />
            <textarea 
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--color-gray-300)' }}
              placeholder="Instructions / Description" value={desc} onChange={e => setDesc(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="outline" onClick={() => setIsCreating(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleCreate} disabled={!selectedCourse || !title}>Publish Assignment</Button>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)', gap: '24px' }}>
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Needs Grading</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {submissions.filter(s => s.status === 'synced').map(sub => {
              const assign = assignments.find(a => a.id === sub.assignmentId);
              if (!assign) return null;
              return (
                <div key={sub.id} style={{ border: '1px solid var(--color-gray-200)', padding: '16px', borderRadius: '8px', borderLeft: '4px solid var(--color-warning)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ fontWeight: 600 }}>{assign.title}</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-gray-500)' }}>{sub.studentId}</div>
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--color-gray-700)', marginBottom: '12px' }}>
                    Notes: {sub.notes || 'None provided'}
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <input 
                      type="number" 
                      placeholder={`/${assign.maxScore}`} 
                      onChange={e => setScore({ ...score, [sub.id]: Number(e.target.value) })}
                      style={{ width: '80px', padding: '6px', borderRadius: '4px', border: '1px solid var(--color-gray-300)' }} 
                    />
                    <Button variant="primary" style={{ padding: '6px 12px' }} onClick={() => handleGrade(sub.id, assign.maxScore)}>Submit Grade</Button>
                  </div>
                </div>
              );
            })}
            {submissions.filter(s => s.status === 'synced').length === 0 && <p style={{ color: 'var(--color-gray-500)' }}>No pending submissions.</p>}
          </div>
        </div>

        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Recent Submissions Overview</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {submissions.filter(s => s.status === 'graded').map(sub => {
              const assign = assignments.find(a => a.id === sub.assignmentId);
              return (
                <div key={sub.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: 'var(--color-gray-50)', borderRadius: '8px', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{assign?.title}</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-gray-500)' }}>Student: {sub.studentId}</div>
                  </div>
                  <div style={{ fontWeight: 700, color: 'var(--color-success)' }}>
                    {sub.score} / {assign?.maxScore}
                  </div>
                </div>
              )
            })}
             {submissions.filter(s => s.status === 'graded').length === 0 && <p style={{ color: 'var(--color-gray-500)' }}>No graded submissions yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
