import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBookOpen, faFileAlt, faChartBar } from '@fortawesome/free-solid-svg-icons';

export const BottomNav: React.FC = () => {
  const navItems = [
    { to: '/dashboard', label: 'Home', icon: <FontAwesomeIcon icon={faHome} style={{ fontSize: 24 }} /> },
    { to: '/learning', label: 'Learning', icon: <FontAwesomeIcon icon={faBookOpen} style={{ fontSize: 24 }} /> },
    { to: '/assignments', label: 'Assignments', icon: <FontAwesomeIcon icon={faFileAlt} style={{ fontSize: 24 }} /> },
    { to: '/progress', label: 'Progress', icon: <FontAwesomeIcon icon={faChartBar} style={{ fontSize: 24 }} /> },
  ];

  return (
    <nav 
      style={{
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        height: '64px',
        backgroundColor: '#ffffff',
        boxShadow: '0 -1px 3px rgba(0,0,0,0.1)',
        display: 'flex',
        zIndex: 50,
      }}
    >
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          style={({ isActive }) => ({
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: isActive ? 'var(--color-primary)' : 'var(--color-gray-500)',
            textDecoration: 'none',
          })}
        >
          {item.icon}
          <span style={{ fontSize: '12px', marginTop: '4px' }}>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};
