import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useOffline } from '../utils/useOffline';

export const OfflineIndicator: React.FC = () => {
  const isOffline = useOffline();

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: '40px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid var(--color-gray-200)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        zIndex: 50,
      }}
    >
      {isOffline ? (
        <>
          <FontAwesomeIcon icon={faGlobe} color="var(--color-warning)" style={{ fontSize: 20 }} />
          <span style={{ color: 'var(--color-warning)', fontWeight: 600, fontSize: '14px' }}>
            Offline Mode
          </span>
          <span style={{ color: 'var(--color-gray-500)', fontSize: '14px' }}>
            (Saving locally)
          </span>
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={faWifi} color="var(--color-success)" style={{ fontSize: 20 }} />
          <span style={{ color: 'var(--color-success)', fontWeight: 600, fontSize: '14px' }}>
            Online - All Synced
          </span>
        </>
      )}
    </div>
  );
};
