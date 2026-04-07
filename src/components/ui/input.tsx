import React, { type InputHTMLAttributes } from 'react';
import './ui.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', icon, ...props }, ref) => {
    return (
      <div className={`ui-input-wrapper ${className}`}>
        {icon && <div className="ui-input-icon">{icon}</div>}
        <input 
          ref={ref} 
          className={`ui-input ${icon ? 'ui-input-with-icon' : ''}`} 
          {...props} 
        />
      </div>
    );
  }
);
Input.displayName = 'Input';
