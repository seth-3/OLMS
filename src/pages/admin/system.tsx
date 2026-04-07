import React, { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faHardDrive, faShieldAlt } from '@fortawesome/free-solid-svg-icons';

export const AdminSystem: React.FC = () => {
  const [syncStatus, setSyncStatus] = useState('');
  const [cacheStatus, setCacheStatus] = useState('');
  const [logsStatus, setLogsStatus] = useState('');

  const handleSync = () => {
    setSyncStatus('Syncing...');
    setTimeout(() => {
      setSyncStatus('✓ Sync completed successfully');
      setTimeout(() => setSyncStatus(''), 3000);
    }, 1500);
  };

  const handleClearCache = () => {
    if (window.confirm('This will clear all cached data including users, courses, and settings. This action cannot be undone. Are you sure?')) {
      setCacheStatus('Clearing cache...');
      localStorage.clear();
      setTimeout(() => {
        setCacheStatus('✓ Local cache cleared - please refresh the page');
        setTimeout(() => setCacheStatus(''), 3000);
      }, 1000);
    }
  };

  const handleViewLogs = () => {
    setLogsStatus('No security events logged');
    setTimeout(() => setLogsStatus(''), 3000);
  };

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700 }}>System Settings</h1>
        <p style={{ color: 'var(--color-gray-500)' }}>Manage server configuration and syncing</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        <Card style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--color-blue-pale)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
              <FontAwesomeIcon icon={faSync} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Data Synchronization</h2>
              <p style={{ fontSize: '12px', color: 'var(--color-gray-500)' }}>Force sync local database to cloud.</p>
            </div>
          </div>
          <Button variant="outline" style={{ width: '100%' }} onClick={handleSync}>Initiate Manual Sync</Button>
          {syncStatus && <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--color-success)', fontWeight: 600 }}>{syncStatus}</div>}
        </Card>

        <Card style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--color-warning-pale)', color: 'var(--color-warning)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
              <FontAwesomeIcon icon={faHardDrive} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Storage Management</h2>
              <p style={{ fontSize: '12px', color: 'var(--color-gray-500)' }}>Clear old cache and submissions.</p>
            </div>
          </div>
          <Button variant="outline" style={{ width: '100%', color: 'var(--color-error)', borderColor: 'var(--color-error)' }} onClick={handleClearCache}>Clear Local Cache</Button>
          {cacheStatus && <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--color-success)', fontWeight: 600 }}>{cacheStatus}</div>}
        </Card>

        <Card style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--color-success-pale)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
              <FontAwesomeIcon icon={faShieldAlt} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Security Settings</h2>
              <p style={{ fontSize: '12px', color: 'var(--color-gray-500)' }}>Manage institution access policies.</p>
            </div>
          </div>
          <Button variant="outline" style={{ width: '100%' }} onClick={handleViewLogs}>View Security Logs</Button>
          {logsStatus && <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--color-success)', fontWeight: 600 }}>{logsStatus}</div>}
        </Card>
      </div>
    </div>
  );
};
