import React from 'react';
import { useCourseStore } from '../../store';
import { Card } from '../../components/ui/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faChartLine, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export const TeacherStudents: React.FC = () => {
  const { courses } = useCourseStore();
  
  // Aggregate students for teacher
  const studentIds = Array.from(new Set(courses.flatMap(c => c.studentIds)));

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700 }}>Student Management</h1>
        <div style={{ backgroundColor: 'white', padding: '8px 16px', borderRadius: '24px', boxShadow: 'var(--shadow-sm)', fontWeight: 600 }}>
          Total Students: {studentIds.length}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600 }}>Enrolled Students</h2>
          {studentIds.map(id => (
            <Card key={id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-blue-pale)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                  {id.replace('u-', '')}
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>Student ID: {id}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-gray-500)' }}>Mock Email: {id}@student.edu</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div title="View Progress" style={{ cursor: 'pointer', color: 'var(--color-gray-400)', padding: '8px' }}><FontAwesomeIcon icon={faChartLine} /></div>
                <div title="Message" style={{ cursor: 'pointer', color: 'var(--color-gray-400)', padding: '8px' }}><FontAwesomeIcon icon={faEnvelope} /></div>
                <div title="Attendance" style={{ cursor: 'pointer', color: 'var(--color-success)', padding: '8px' }}><FontAwesomeIcon icon={faCheckCircle} /></div>
              </div>
            </Card>
          ))}
          {studentIds.length === 0 && <p style={{ color: 'var(--color-gray-500)' }}>No students enrolled in your courses.</p>}
        </div>

        <div style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Card style={{ padding: '24px', backgroundColor: 'var(--color-primary)', color: 'white' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Attendance Tracking</h3>
            <p style={{ opacity: 0.9, fontSize: '14px', marginBottom: '16px' }}>Manage daily class attendance directly through the class view.</p>
            <button style={{ width: '100%', padding: '8px', backgroundColor: 'white', color: 'var(--color-primary)', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>Take Attendance</button>
          </Card>
        </div>
      </div>
    </div>
  );
};
