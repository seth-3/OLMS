import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useAdminStore } from '../store';

export const ChangePassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get('email') || '';
  const users = useAdminStore(state => state.users);
  const updateUser = useAdminStore(state => state.updateUser);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError('No matching user account found.');
      return;
    }

    if (!password || !confirmPassword) {
      setError('Both password fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    updateUser(user.id, { password, mustChangePassword: false });
    setSuccess('Password updated successfully. Redirecting...');
    setTimeout(() => {
      if (user.role === 'teacher') {
        navigate('/teacher/dashboard');
      } else {
        navigate('/dashboard');
      }
    }, 1000);
  };

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ width: '100%', maxWidth: '480px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Change Password</h1>
          <p style={{ marginBottom: '24px' }}>We could not find an account for that reset link. Please log in again.</p>
          <Link to="/login">
            <Button variant="primary">Back to Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, var(--color-blue-pale), var(--color-white))', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '480px', background: 'white', borderRadius: '24px', padding: '32px', boxShadow: '0 16px 40px rgba(0,0,0,0.08)' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Change Your Password</h1>
        <p style={{ marginBottom: '24px', color: 'var(--color-gray-600)' }}>
          {`Update your password for ${user.email} before continuing.`}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <div style={{ color: 'var(--color-error)', fontSize: '14px' }}>{error}</div>}
          {success && <div style={{ color: 'var(--color-success)', fontSize: '14px' }}>{success}</div>}
          <Button type="submit" variant="primary" fullWidth>Save Password</Button>
        </form>
      </div>
    </div>
  );
};
