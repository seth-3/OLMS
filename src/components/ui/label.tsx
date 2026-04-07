import React, { type LabelHTMLAttributes } from 'react';
import './ui.css';

export const Label = React.forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <label ref={ref} className={`ui-label ${className}`} {...props}>
        {children}
      </label>
    );
  }
);
Label.displayName = 'Label';
