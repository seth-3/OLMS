import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faAward, faChevronRight, faFileAlt, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
import { useStudentTeacherStore } from '../store';
import { Card } from '../components/ui/card';

export const Dashboard: React.FC = () => {
  const { userProgress } = useStudentTeacherStore();

  const completedLessons = userProgress?.completedLessons || 0;
  const enrolledSubjects = Object.keys(userProgress?.subjects || {}).length;

  return (
    <div style={{ padding: '24px', maxWidth: '1024px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '30px', fontWeight: 700, color: 'var(--color-gray-900)' }}>Welcome, Student!</h1>
        <p style={{ fontSize: '16px', color: 'var(--color-gray-500)' }}>Ready to continue learning?</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <Card style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-blue-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FontAwesomeIcon icon={faBookOpen} style={{ fontSize: 24 }} color="var(--color-primary)" />
          </div>
          <div>
            <div style={{ fontSize: '32px', fontWeight: 700 }}>{completedLessons}</div>
            <div style={{ fontSize: '14px', color: 'var(--color-gray-500)' }}>Lessons Completed</div>
          </div>
        </Card>
        
        <Card style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-success-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FontAwesomeIcon icon={faAward} style={{ fontSize: 24 }} color="var(--color-success)" />
          </div>
          <div>
            <div style={{ fontSize: '32px', fontWeight: 700 }}>{enrolledSubjects}</div>
            <div style={{ fontSize: '14px', color: 'var(--color-gray-500)' }}>Enrolled Subjects</div>
          </div>
        </Card>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Link to="/learning">
          <Card hoverable style={{ display: 'flex', alignItems: 'center', padding: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-purple-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
              <FontAwesomeIcon icon={faBookOpen} style={{ fontSize: 24 }} color="var(--color-purple)" />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Browse Learning Materials</h3>
              <p style={{ fontSize: '14px', color: 'var(--color-gray-500)' }}>Explore subjects and lessons</p>
            </div>
            <FontAwesomeIcon icon={faChevronRight} color="var(--color-gray-400)" />
          </Card>
        </Link>

        <Link to="/assignments">
          <Card hoverable style={{ display: 'flex', alignItems: 'center', padding: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-warning-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
              <FontAwesomeIcon icon={faFileAlt} style={{ fontSize: 24 }} color="var(--color-warning)" />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Assignments</h3>
              <p style={{ fontSize: '14px', color: 'var(--color-gray-500)' }}>Check your assignments and submissions</p>
            </div>
            <FontAwesomeIcon icon={faChevronRight} color="var(--color-gray-400)" />
          </Card>
        </Link>

        <Link to="/progress">
          <Card hoverable style={{ display: 'flex', alignItems: 'center', padding: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-success-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
              <FontAwesomeIcon icon={faArrowTrendUp} style={{ fontSize: 24 }} color="var(--color-success)" />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600 }}>View Progress</h3>
              <p style={{ fontSize: '14px', color: 'var(--color-gray-500)' }}>Track your learning journey</p>
            </div>
            <FontAwesomeIcon icon={faChevronRight} color="var(--color-gray-400)" />
          </Card>
        </Link>
      </div>
    </div>
  );
};
