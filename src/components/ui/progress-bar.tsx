import React from 'react';
import './ui.css';

interface ProgressBarProps {
  progress: number; // 0-100
  color?: string;
  height?: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, color, height = 8, className = '' }) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  
  return (
    <div className={`ui-progress-container ${className}`} style={{ height }}>
      <div 
        className="ui-progress-fill" 
        style={{ 
          width: `${clampedProgress}%`,
          backgroundColor: color || 'var(--color-primary)'
        }}
      />
    </div>
  );
};
