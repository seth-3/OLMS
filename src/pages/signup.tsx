import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faEnvelope, faLock, faUser, faChalkboardTeacher, faUserGraduate, faIdCard, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { registerAPI } from '../utils/api';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  
  // Shared fields
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Student specific
  const [gradeLevel, setGradeLevel] = useState('');
  const [studentId, setStudentId] = useState('');
  
  // Teacher specific
  const [subject, setSubject] = useState('');
  const [employeeId, setEmployeeId] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!name || !email || !password) {
      setError('Please fill in all required fields');
      return;
    }
    
    setLoading(true);
    try {
      const data = await registerAPI(email, password, name, role);
      
      // Navigate based on user role
      if (data.user.role === 'teacher') {
        navigate('/teacher/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
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
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '480px', backgroundColor: 'white', padding: '32px', borderRadius: '16px', boxShadow: 'var(--shadow-md)' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 700, textAlign: 'center', marginBottom: '24px', color: 'var(--color-gray-900)' }}>Create Account</h1>
          
          {/* Role Selection Toggle */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <div 
              onClick={() => setRole('student')}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', borderRadius: '12px', cursor: 'pointer', border: `2px solid ${role === 'student' ? 'var(--color-primary)' : 'var(--color-gray-200)'}`, backgroundColor: role === 'student' ? 'var(--color-blue-pale)' : 'white', transition: 'all 0.2s' }}
            >
              <FontAwesomeIcon icon={faUserGraduate} style={{ fontSize: 24, marginBottom: '8px', color: role === 'student' ? 'var(--color-primary)' : 'var(--color-gray-500)' }} />
              <div style={{ fontWeight: 600, color: role === 'student' ? 'var(--color-primary)' : 'var(--color-gray-700)' }}>Student</div>
            </div>
            
            <div 
              onClick={() => setRole('teacher')}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', borderRadius: '12px', cursor: 'pointer', border: `2px solid ${role === 'teacher' ? 'var(--color-primary)' : 'var(--color-gray-200)'}`, backgroundColor: role === 'teacher' ? 'var(--color-blue-pale)' : 'white', transition: 'all 0.2s' }}
            >
              <FontAwesomeIcon icon={faChalkboardTeacher} style={{ fontSize: 24, marginBottom: '8px', color: role === 'teacher' ? 'var(--color-primary)' : 'var(--color-gray-500)' }} />
              <div style={{ fontWeight: 600, color: role === 'teacher' ? 'var(--color-primary)' : 'var(--color-gray-700)' }}>Teacher</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {error && <div style={{ color: 'var(--color-error)', backgroundColor: 'var(--color-error-pale)', padding: '12px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, textAlign: 'center' }}>{error}</div>}
            
            <Input 
              type="text" placeholder="Full Name" 
              icon={<FontAwesomeIcon icon={faUser} style={{ fontSize: 20 }} />} 
              value={name} onChange={e => setName(e.target.value)} required
            />
            <Input 
              type="email" placeholder="Email Address" 
              icon={<FontAwesomeIcon icon={faEnvelope} style={{ fontSize: 20 }} />} 
              value={email} onChange={e => setEmail(e.target.value)} required
            />

            <hr style={{ border: 'none', borderTop: '1px solid var(--color-gray-200)', margin: '8px 0' }} />

            {/* Role Specific Fields */}
            {role === 'student' ? (
              <>
                <Input 
                  type="text" placeholder="Grade Level (e.g. 10th Grade)" 
                  icon={<FontAwesomeIcon icon={faGraduationCap} style={{ fontSize: 20 }} />} 
                  value={gradeLevel} onChange={e => setGradeLevel(e.target.value)} required
                />
                <Input 
                  type="text" placeholder="Student ID Number" 
                  icon={<FontAwesomeIcon icon={faIdCard} style={{ fontSize: 20 }} />} 
                  value={studentId} onChange={e => setStudentId(e.target.value)} required
                />
              </>
            ) : (
              <>
                <Input 
                  type="text" placeholder="Department / Subject" 
                  icon={<FontAwesomeIcon icon={faBookOpen} style={{ fontSize: 20 }} />} 
                  value={subject} onChange={e => setSubject(e.target.value)} required
                />
                <Input 
                  type="text" placeholder="Employee ID" 
                  icon={<FontAwesomeIcon icon={faIdCard} style={{ fontSize: 20 }} />} 
                  value={employeeId} onChange={e => setEmployeeId(e.target.value)} required
                />
              </>
            )}

            <hr style={{ border: 'none', borderTop: '1px solid var(--color-gray-200)', margin: '8px 0' }} />

            <Input 
              type="password" placeholder="Password" 
              icon={<FontAwesomeIcon icon={faLock} style={{ fontSize: 20 }} />} 
              value={password} onChange={e => setPassword(e.target.value)} required
            />
            <Input 
              type="password" placeholder="Confirm Password" 
              icon={<FontAwesomeIcon icon={faLock} style={{ fontSize: 20 }} />} 
              value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required
            />
            
            <Button type="submit" variant="primary" fullWidth style={{ marginTop: '16px', height: '48px', fontSize: '16px' }} disabled={loading}>
              {loading ? 'Creating Account...' : `Register as ${role === 'student' ? 'Student' : 'Teacher'}`}
            </Button>
            
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <Link to="/login" style={{ fontSize: '14px', color: 'var(--color-primary)', fontWeight: 600 }}>Already have an account? Log In</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
