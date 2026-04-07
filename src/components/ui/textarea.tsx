import React, { type TextareaHTMLAttributes } from 'react';
import './ui.css';

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className = '', ...props }, ref) => {
    return (
      <textarea ref={ref} className={`ui-textarea ${className}`} {...props} />
    );
  }
);
Textarea.displayName = 'Textarea';
