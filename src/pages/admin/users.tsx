import React, { useState } from 'react';
import type { Role } from '../../types';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useAdminStore } from '../../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faX, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const generatePassword = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%';
  return Array.from({ length: 10 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
};

export const AdminUsers: React.FC = () => {
  const users = useAdminStore(state => state.users);
  const createUser = useAdminStore(state => state.createUser);
  const deleteUser = useAdminStore(state => state.deleteUser);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    role: Role;
    status: 'Active' | 'Inactive';
  }>({
    name: '',
    email: '',
    role: 'student',
    status: 'Active'
  });
  const [inviteStatus, setInviteStatus] = useState('');

  const handleAddUser = () => {
    if (formData.name && formData.email) {
      const password = generatePassword();
      createUser({
        id: `u-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: formData.status,
        password,
        mustChangePassword: true,
      });
      setFormData({ name: '', email: '', role: 'student', status: 'Active' });
      setShowForm(false);
      setInviteStatus(`✓ ${formData.role.charAt(0).toUpperCase() + formData.role.slice(1)} "${formData.name}" created successfully. Click Invite to send credentials.`);
      setTimeout(() => setInviteStatus(''), 5000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDeleteUser = (id: string) => {
    deleteUser(id);
  };

  const handleInvite = (user: { name: string; email: string; role: string; password?: string }) => {
    const subject = encodeURIComponent('Your OLMS account invitation');
    const body = encodeURIComponent(
      `Hello ${user.name},\n\n` +
      `You have been invited to OLMS as a ${user.role}.\n\n` +
      `Login at: http://localhost:5173/login\n` +
      `Email: ${user.email}\n` +
      `Password: ${user.password || 'Please contact your administrator'}\n\n` +
      `Please change your password after logging in.`
    );
    window.location.href = `mailto:${user.email}?subject=${subject}&body=${body}`;
    setInviteStatus(`Opened email compose window for ${user.email}.`);
    setTimeout(() => setInviteStatus(''), 4000);
  };

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 700 }}>User Management</h1>
          {inviteStatus && <div style={{ marginTop: '8px', color: 'var(--color-success)', fontWeight: 600 }}>{inviteStatus}</div>}
        </div>
        <Button variant="primary" onClick={() => setShowForm(!showForm)}>
          <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} /> Add User
        </Button>
      </div>

      {showForm && (
        <Card style={{ padding: '24px', marginBottom: '24px', backgroundColor: 'var(--color-gray-50)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Add New User</h2>
            <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}>
              <FontAwesomeIcon icon={faX} />
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
            <Input
              type="text"
              placeholder="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--color-gray-200)' }}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="primary" onClick={handleAddUser}>Create User</Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </Card>
      )}

      <Card style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--color-gray-50)', borderBottom: '1px solid var(--color-gray-200)' }}>
              <th style={{ padding: '16px', fontWeight: 600, color: 'var(--color-gray-500)' }}>Name</th>
              <th style={{ padding: '16px', fontWeight: 600, color: 'var(--color-gray-500)' }}>Role</th>
              <th style={{ padding: '16px', fontWeight: 600, color: 'var(--color-gray-500)' }}>Email</th>
              <th style={{ padding: '16px', fontWeight: 600, color: 'var(--color-gray-500)' }}>Status</th>
              <th style={{ padding: '16px', fontWeight: 600, color: 'var(--color-gray-500)', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: 'var(--color-gray-500)' }}>
                  No users yet. Click "Add User" to create one.
                </td>
              </tr>
            ) : (
              users.map((user, idx) => (
                <tr key={user.id} style={{ borderBottom: idx === users.length - 1 ? 'none' : '1px solid var(--color-gray-200)' }}>
                  <td style={{ padding: '16px', fontWeight: 600 }}>{user.name}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ 
                      padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 600,
                      backgroundColor: user.role === 'teacher' ? 'var(--color-purple-pale)' : 'var(--color-blue-pale)',
                      color: user.role === 'teacher' ? 'var(--color-purple)' : 'var(--color-primary)'
                    }}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td style={{ padding: '16px', color: 'var(--color-gray-600)' }}>{user.email}</td>
                  <td style={{ padding: '16px' }}>
                     <span style={{ color: 'var(--color-success)', fontWeight: 600, fontSize: '14px' }}>{user.status}</span>
                  </td>
                  <td style={{ padding: '16px', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    <Button variant="ghost" style={{ padding: '8px' }} onClick={() => handleInvite(user)}>
                      <FontAwesomeIcon icon={faEnvelope} />
                    </Button>
                    <Button variant="ghost" style={{ padding: '8px' }} onClick={() => handleDeleteUser(user.id)}>
                      <FontAwesomeIcon icon={faX} style={{ color: 'var(--color-error)' }} />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};
