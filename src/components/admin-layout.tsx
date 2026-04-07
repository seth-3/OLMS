import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faUsers, faBook, faChartPie, faCogs, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { OfflineIndicator } from './offline-indicator';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  
  const navItems = [
    { to: '/admin/dashboard', label: 'Overview', icon: faChartPie },
    { to: '/admin/users', label: 'Users', icon: faUsers },
    { to: '/admin/courses', label: 'All Courses', icon: faBook },
    { to: '/admin/system', label: 'System Settings', icon: faCogs },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-base-bg)' }}>
      <OfflineIndicator />
      
      <aside 
        style={{
          width: '260px',
          backgroundColor: '#1E293B', // Dark slate for admin
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: '40px',
          height: 'calc(100vh - 40px)',
          zIndex: 40,
        }}
        className="admin-sidebar"
      >
        <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <FontAwesomeIcon icon={faDatabase} style={{ fontSize: 24, color: 'var(--color-primary-light)' }} />
          <span style={{ fontSize: '20px', fontWeight: 700 }}>Admin Console</span>
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
                    backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                    color: isActive ? 'white' : '#94A3B8',
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

        <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button 
            onClick={() => navigate('/login')}
            style={{ 
              width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', 
              borderRadius: '8px', border: 'none', backgroundColor: 'transparent', color: '#EF4444', 
              fontWeight: 600, cursor: 'pointer', textAlign: 'left'
            }}
          >
             <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, paddingTop: '40px', paddingBottom: '80px', overflowX: 'hidden' }}>
        <Outlet />
      </main>

      <style>{`
        @media (max-width: 768px) {
          .admin-sidebar {
            display: none !important;
          }
          .admin-mobile-nav {
            display: flex !important;
          }
        }
        @media (min-width: 769px) {
          .admin-mobile-nav {
            display: none !important;
          }
        }
      `}</style>
      <nav 
        className="admin-mobile-nav"
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, height: '64px',
          backgroundColor: '#1E293B',
          zIndex: 50, display: 'none'
        }}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => ({
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              color: isActive ? 'white' : '#94A3B8', textDecoration: 'none',
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
