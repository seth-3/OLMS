import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { OfflineIndicator } from './offline-indicator';
import { BottomNav } from './bottom-nav';

export const Layout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: 'var(--color-base-bg)', minHeight: '100vh', paddingBottom: '64px', paddingTop: '40px' }}>
      <OfflineIndicator />

      <header style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '16px 24px',
        borderBottom: '1px solid var(--color-gray-200)',
        backgroundColor: 'var(--color-base-bg)',
      }}>
        <button
          onClick={() => navigate('/login')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 16px',
            borderRadius: '999px',
            border: '1px solid rgba(15, 23, 42, 0.12)',
            backgroundColor: 'white',
            color: 'var(--color-primary)',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
          Logout
        </button>
      </header>

      <main style={{ padding: '24px 16px 0' }}>
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};
