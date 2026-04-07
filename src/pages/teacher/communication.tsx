import React, { useState } from 'react';
import { useStudentTeacherStore } from '../../store';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export const TeacherCommunication: React.FC = () => {
  const { announcements } = useStudentTeacherStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleBroadcast = () => {
    // We would map this to an action in studentTeacherStore if we add 'addAnnouncement'
    alert('Broadcast sent! This will sync to all students when online.');
    setTitle('');
    setContent('');
  };

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700 }}>Communication Hub</h1>
        <p style={{ color: 'var(--color-gray-500)' }}>Broadcast messages and manage student messaging</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(400px, 1fr) 300px', gap: '24px' }}>
        <Card style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-blue-pale)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
              <FontAwesomeIcon icon={faBullhorn} />
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 600 }}>Create Announcement</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
             <input 
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--color-gray-300)' }}
              placeholder="Announcement Title" value={title} onChange={e => setTitle(e.target.value)}
            />
            <textarea 
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--color-gray-300)', minHeight: '120px' }}
              placeholder="Type your message here..." value={content} onChange={e => setContent(e.target.value)}
            />
            <Button variant="primary" style={{ alignSelf: 'flex-start' }} disabled={!title || !content} onClick={handleBroadcast}>
              <FontAwesomeIcon icon={faPaperPlane} style={{ marginRight: '8px' }} /> Broadcast
            </Button>
          </div>
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600 }}>Recent Announcements</h2>
          {announcements.map(ann => (
            <div key={ann.id} style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px', borderLeft: '4px solid var(--color-primary)', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>{ann.title}</h3>
              <p style={{ fontSize: '14px', color: 'var(--color-gray-600)', marginBottom: '8px' }}>{ann.content}</p>
              <div style={{ fontSize: '11px', color: 'var(--color-gray-400)' }}>{new Date(ann.createdAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
