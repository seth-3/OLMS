import React, { useState } from 'react';
import { useAssignmentStore } from '../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faClock, faCircleExclamation, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';

export const Assignments: React.FC = () => {
  const { assignments, submissions, submitAssignment } = useAssignmentStore();
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [notes, setNotes] = useState('');

  const handleUploadSubmit = () => {
    if (file) {
      const assignmentId = assignments[0]?.id || 'a-1';
      submitAssignment(assignmentId, {
        assignmentId,
        studentId: 'u-1',
        status: navigator.onLine ? 'synced' : 'submitted', // submitted means syncing...
        submittedDate: new Date().toISOString(),
        notes: notes
      });
      setIsUploading(false);
      setFile(null);
      setNotes('');
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1024px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700 }}>Assignments</h1>
        <p style={{ fontSize: '16px', color: 'var(--color-gray-500)' }}>Submit your work - it will sync when you're online</p>
      </div>

      {!isUploading ? (
        <Button variant="primary" style={{ height: '56px', width: '100%', marginBottom: '24px' }} onClick={() => setIsUploading(true)}>
          <FontAwesomeIcon icon={faUpload} style={{ fontSize: 24 }} /> Submit New Assignment
        </Button>
      ) : (
        <Card style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>Submit Assignment</h2>
          <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '128px', border: '2px dashed var(--color-gray-300)', padding: '24px', borderRadius: '8px', cursor: 'pointer', marginBottom: '16px', transition: 'border-color 0.2s' }}>
            <FontAwesomeIcon icon={faUpload} color="var(--color-gray-400)" style={{ fontSize: 48 }} />
            {file ? <span style={{ marginTop: '8px', fontWeight: 600 }}>{file.name}</span> : <span style={{ marginTop: '8px', color: 'var(--color-gray-500)', fontSize: '14px' }}>Click to upload file</span>}
            <input type="file" style={{ display: 'none' }} accept=".pdf,.doc,.docx,.jpg,.png" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </label>
          <Textarea placeholder="Add any notes about your assignment..." value={notes} onChange={(e) => setNotes(e.target.value)} style={{ marginBottom: '16px' }} />
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <Button variant="outline" style={{ flex: 1 }} onClick={() => setIsUploading(false)}>Cancel</Button>
            <Button variant="primary" style={{ flex: 1 }} disabled={!file} onClick={handleUploadSubmit}>Submit Assignment</Button>
          </div>
          <div style={{ backgroundColor: 'var(--color-blue-subtle)', border: '1px solid var(--color-blue-light)', padding: '12px', borderRadius: '8px', fontSize: '14px', color: '#1e40af' }}>
            💡 Your assignment will be saved offline and automatically sync when you're connected to the internet.
          </div>
        </Card>
      )}

      <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>Your Assignments</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {assignments.map(a => {
          const submission = submissions.find(s => s.assignmentId === a.id);
          const status = submission ? submission.status : 'pending';
          let StatusIcon = faClock;
          let statusBg = 'var(--color-warning)';
          let statusLabel = 'Pending';
          let borderLeftColor = 'var(--color-warning)';

          if (status === 'synced' || status === 'graded') {
            StatusIcon = faCheckCircle;
            statusBg = 'var(--color-success)';
            statusLabel = status === 'graded' ? 'Graded' : 'Synced';
            borderLeftColor = 'var(--color-success)';
          } else if (status === 'submitted') {
            StatusIcon = faCircleExclamation;
            statusBg = 'var(--color-primary)';
            statusLabel = 'Syncing...';
            borderLeftColor = 'var(--color-primary)';
          }

          return (
            <Card key={a.id} style={{ padding: '16px', display: 'flex', flexDirection: 'column', borderLeft: `4px solid ${borderLeftColor}` }}>
              <div style={{ fontSize: '12px', color: 'var(--color-gray-500)', textTransform: 'uppercase', marginBottom: '4px' }}>Assignment</div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>{a.title}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: statusBg, color: 'white', padding: '4px 8px', borderRadius: '12px', fontSize: '12px' }}>
                  <FontAwesomeIcon icon={StatusIcon} style={{ fontSize: 12 }} /> {statusLabel}
                </div>
              </div>
              <div style={{ fontSize: '14px', color: 'var(--color-gray-500)' }}>
                Due: {new Date(a.dueDate).toLocaleDateString()}
              </div>
              {submission?.submittedDate && (
                <div style={{ fontSize: '14px', color: 'var(--color-gray-500)', marginTop: '4px' }}>
                  Submitted: {new Date(submission.submittedDate).toLocaleDateString()}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};
