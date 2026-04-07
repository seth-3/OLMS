import React, { type HTMLAttributes } from 'react';
import './ui.css';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', hoverable, children, ...props }, ref) => {
    const classes = `ui-card ${hoverable ? 'ui-card-hoverable' : ''} ${className}`.trim();
    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';
