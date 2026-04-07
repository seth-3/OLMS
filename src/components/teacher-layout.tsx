import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faFileAlt, faChartBar, faUsers, faBullhorn, faSignOutAlt, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import { OfflineIndicator } from './offline-indicator';

export const TeacherLayout: React.FC = () => {
  const navigate = useNavigate();
  
  const navItems = [
    { to: '/teacher/dashboard', label: 'Dashboard', icon: faChartBar },
    { to: '/teacher/courses', label: 'Courses', icon: faBookOpen },
    { to: '/teacher/assignments', label: 'Assignments', icon: faFileAlt },
    { to: '/teacher/students', label: 'Students', icon: faUsers },
    { to: '/teacher/communication', label: 'Communicate', icon: faBullhorn },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-base-bg)' }}>
      <OfflineIndicator />
      
      {/* Sidebar for Desktop / Large tablets - we'll keep it simple & responsive */}
      <aside 
        style={{
          width: '240px',
          backgroundColor: '#ffffff',
          borderRight: '1px solid var(--color-gray-200)',
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: '40px', // Below offline indicator
          height: 'calc(100vh - 40px)',
          zIndex: 40,
        }}
        className="teacher-sidebar"
      >
        <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--color-gray-200)', color: 'var(--color-primary)' }}>
          <FontAwesomeIcon icon={faChalkboardTeacher} style={{ fontSize: 28 }} />
          <span style={{ fontSize: '20px', fontWeight: 700 }}>Teacher Portal</span>
        </div>

        <nav style={{ flex: 1, padding: '16px' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {navItems.map(item => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    backgroundColor: isActive ? 'var(--color-blue-pale)' : 'transparent',
                    color: isActive ? 'var(--color-primary)' : 'var(--color-gray-700)',
                    fontWeight: isActive ? 600 : 500,
                    transition: 'all 0.2s',
                  })}
                >
                  <FontAwesomeIcon icon={item.icon} style={{ width: '20px' }} />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{ padding: '16px', borderTop: '1px solid var(--color-gray-200)' }}>
          <button 
            onClick={() => navigate('/login')}
            style={{ 
              width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', 
              borderRadius: '8px', border: 'none', backgroundColor: 'transparent', color: 'var(--color-error)', 
              fontWeight: 600, cursor: 'pointer', textAlign: 'left'
            }}
          >
             <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, paddingTop: '40px', paddingBottom: '80px', overflowX: 'hidden' }}>
        <Outlet />
      </main>

      {/* Mobile Bottom Nav override. Hidden on large screens via CSS block we'll inject. */}
      <style>{`
        @media (max-width: 768px) {
          .teacher-sidebar {
            display: none !important;
          }
          .teacher-mobile-nav {
            display: flex !important;
          }
        }
        @media (min-width: 769px) {
          .teacher-mobile-nav {
            display: none !important;
          }
        }
      `}</style>
      <nav 
        className="teacher-mobile-nav"
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, height: '64px',
          backgroundColor: '#ffffff', boxShadow: '0 -1px 3px rgba(0,0,0,0.1)',
          zIndex: 50, display: 'none'
        }}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => ({
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              color: isActive ? 'var(--color-primary)' : 'var(--color-gray-500)', textDecoration: 'none',
            })}
          >
            <FontAwesomeIcon icon={item.icon} style={{ fontSize: 20 }} />
            <span style={{ fontSize: '10px', marginTop: '4px', textAlign: 'center' }}>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
