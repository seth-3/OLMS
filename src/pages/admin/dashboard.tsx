import React from 'react';
import { useCourseStore, useAdminStore } from '../../store';
import { Card } from '../../components/ui/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faChalkboardTeacher, faBookOpen, faUserCheck, faUserClock, faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const { courses } = useCourseStore();
  const { users } = useAdminStore();
  
  const totalStudents = users.filter(u => u.role === 'student').length;
  const totalTeachers = users.filter(u => u.role === 'teacher').length;
  const pendingUsers = users.filter(u => u.mustChangePassword).length;

  const generateReport = () => {
    const reportData = {
      generatedAt: new Date().toLocaleString(),
      systemOverview: {
        totalStudents,
        totalTeachers,
        totalCourses: courses.length,
        pendingUserSetup: pendingUsers,
        totalUsers: users.length
      },
      courses: courses.map(course => ({
        name: course.name,
        description: course.description,
        teacherId: course.teacherId,
        studentCount: course.studentIds.length,
        createdAt: course.createdAt
      })),
      users: users.map(user => ({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        needsPasswordChange: user.mustChangePassword || false
      }))
    };

    // Create report content
    const reportContent = `
OLMS System Report
Generated: ${reportData.generatedAt}

SYSTEM OVERVIEW
---------------
Total Students: ${reportData.systemOverview.totalStudents}
Total Teachers: ${reportData.systemOverview.totalTeachers}
Total Courses: ${reportData.systemOverview.totalCourses}
Pending User Setup: ${reportData.systemOverview.pendingUserSetup}
Total Users: ${reportData.systemOverview.totalUsers}

COURSES
-------
${reportData.courses.length > 0 ? 
  reportData.courses.map(course => 
    `- ${course.name}: ${course.description} (${course.studentCount} students)`
  ).join('\n') : 
  'No courses created yet.'
}

USERS
-----
${reportData.users.length > 0 ?
  reportData.users.map(user =>
    `- ${user.name} (${user.email}) - ${user.role} - ${user.status}${user.needsPasswordChange ? ' - Password Reset Required' : ''}`
  ).join('\n') :
  'No users registered yet.'
}
`;

    // Create and download the report file
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `olms-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-gray-900)' }}>System Overview</h1>
          <p style={{ color: 'var(--color-gray-500)', marginTop: '4px' }}>Monitor institution metrics and user management</p>
        </div>
        <Button variant="primary" onClick={generateReport}>
          <FontAwesomeIcon icon={faFileDownload} style={{ marginRight: '8px' }} />
          Generate Report
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <Card style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '12px', backgroundColor: 'var(--color-blue-pale)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <div>
            <div style={{ fontSize: '32px', fontWeight: 700 }}>{totalStudents}</div>
            <div style={{ color: 'var(--color-gray-500)', fontSize: '14px' }}>Total Students</div>
            <div style={{ fontSize: '12px', color: 'var(--color-gray-400)', marginTop: '4px' }}>{users.length} total users</div>
          </div>
        </Card>

        <Card style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '12px', backgroundColor: 'var(--color-purple-pale)', color: 'var(--color-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
            <FontAwesomeIcon icon={faChalkboardTeacher} />
          </div>
          <div>
            <div style={{ fontSize: '32px', fontWeight: 700 }}>{totalTeachers}</div>
            <div style={{ color: 'var(--color-gray-500)', fontSize: '14px' }}>Active Teachers</div>
          </div>
        </Card>

        <Card style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '12px', backgroundColor: 'var(--color-success-pale)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
            <FontAwesomeIcon icon={faBookOpen} />
          </div>
          <div>
            <div style={{ fontSize: '32px', fontWeight: 700 }}>{courses.length}</div>
            <div style={{ color: 'var(--color-gray-500)', fontSize: '14px' }}>Total Courses</div>
          </div>
        </Card>

        <Card style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '12px', backgroundColor: 'var(--color-warning-pale)', color: 'var(--color-warning)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
            <FontAwesomeIcon icon={faUserClock} />
          </div>
          <div>
            <div style={{ fontSize: '32px', fontWeight: 700 }}>{pendingUsers}</div>
            <div style={{ color: 'var(--color-gray-500)', fontSize: '14px' }}>Pending Setup</div>
          </div>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <Card style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link to="/admin/users">
              <Button variant="outline" fullWidth style={{ justifyContent: 'flex-start' }}>
                <FontAwesomeIcon icon={faUsers} style={{ marginRight: '8px' }} />
                Manage Users
              </Button>
            </Link>
            <Link to="/admin/courses">
              <Button variant="outline" fullWidth style={{ justifyContent: 'flex-start' }}>
                <FontAwesomeIcon icon={faBookOpen} style={{ marginRight: '8px' }} />
                View Courses
              </Button>
            </Link>
            <Link to="/admin/system">
              <Button variant="outline" fullWidth style={{ justifyContent: 'flex-start' }}>
                <FontAwesomeIcon icon={faUserCheck} style={{ marginRight: '8px' }} />
                System Settings
              </Button>
            </Link>
          </div>
        </Card>

        <Card style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Recent Activity</h3>
          <div style={{ color: 'var(--color-gray-500)', fontSize: '14px' }}>
            {users.length === 0 ? 'No recent activity' : `${users.length} user${users.length === 1 ? '' : 's'} registered`}
          </div>
        </Card>
      </div>
    </div>
  );
};
