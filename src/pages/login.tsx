import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { loginAPI } from '../utils/api';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginAPI(email, password);

      // Navigate based on user role
      if (data.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (data.user.role === 'teacher') {
        navigate('/teacher/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, var(--color-blue-pale), var(--color-white))', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '16px' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)' }}>
          <FontAwesomeIcon icon={faGraduationCap} style={{ fontSize: 32 }} />
          <span style={{ fontSize: '20px', fontWeight: 700 }}>OLMS</span>
        </Link>
      </header>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '448px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 700, textAlign: 'center', marginBottom: '32px', color: 'var(--color-gray-900)' }}>Welcome Back</h1>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Input 
              type="email" 
              placeholder="Email" 
              icon={<FontAwesomeIcon icon={faEnvelope} style={{ fontSize: 20 }} />} 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <Input 
              type="password" 
              placeholder="Password" 
              icon={<FontAwesomeIcon icon={faLock} style={{ fontSize: 20 }} />} 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            {error && <div style={{ color: 'var(--color-error)', fontSize: '14px', textAlign: 'center' }}>{error}</div>}
            <Button type="submit" variant="primary" fullWidth style={{ marginTop: '8px' }} disabled={loading}>
              {loading ? 'Logging in...' : 'Log In'}
            </Button>
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <Link to="/signup" style={{ fontSize: '14px' }}>Don't have an account? Sign Up</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};