import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faWifi, faBookOpen, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

export const Landing: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-gray-200)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)' }}>
          <FontAwesomeIcon icon={faGraduationCap} style={{ fontSize: 32 }} />
          <span style={{ fontSize: '24px', fontWeight: 700 }}>OLMS</span>
        </div>
        <Link to="/login">
          <Button variant="outline">Log In</Button>
        </Link>
      </header>

      <main style={{ flex: 1, padding: '48px 24px', maxWidth: '1024px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ marginBottom: '48px', animation: 'fadeIn 0.5s ease-out' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 800, color: 'var(--color-gray-900)', marginBottom: '16px', lineHeight: 1.2 }}>
            Learning that works <br />
            <span style={{ color: 'var(--color-primary)' }}>anywhere, anytime.</span>
          </h1>
          <p style={{ fontSize: '20px', color: 'var(--color-gray-600)', maxWidth: '600px', margin: '0 auto 32px' }}>
            A complete learning management system designed to work perfectly even without an internet connection.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <Link to="/signup">
              <Button variant="primary" style={{ height: '56px', fontSize: '18px', padding: '0 32px' }}>Get Started Offline</Button>
            </Link>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', textAlign: 'left' }}>
          <Card style={{ padding: '32px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--color-blue-pale)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <FontAwesomeIcon icon={faWifi} style={{ fontSize: 24 }} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Offline-First</h3>
            <p style={{ color: 'var(--color-gray-600)' }}>Download your materials once and learn anywhere. Your progress syncs automatically when you reconnect.</p>
          </Card>

          <Card style={{ padding: '32px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--color-success-pale)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <FontAwesomeIcon icon={faBookOpen} style={{ fontSize: 24 }} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Rich Content</h3>
            <p style={{ color: 'var(--color-gray-600)' }}>Access interactive lessons, practice problems, and study guides across multiple subjects.</p>
          </Card>

          <Card style={{ padding: '32px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--color-purple-pale)', color: 'var(--color-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <FontAwesomeIcon icon={faUsers} style={{ fontSize: 24 }} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Track Progress</h3>
            <p style={{ color: 'var(--color-gray-600)' }}>Stay motivated with built-in achievement tracking, daily streaks, and detailed performance analytics.</p>
          </Card>
        </div>
      </main>

      {/* Bottom CTA */}
      <section style={{ background: 'linear-gradient(to right, var(--color-blue-light), var(--color-primary))', padding: '64px 24px', textAlign: 'center', marginTop: '64px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'white', marginBottom: '32px' }}>Join Thousands of Students Learning Offline</h2>
        <Link to="/signup">
          <Button style={{ backgroundColor: 'white', color: 'var(--color-primary)' }}>Create Free Account</Button>
        </Link>
      </section>
    </div>
  );
};
