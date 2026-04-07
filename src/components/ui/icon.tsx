import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalculator, faFlask, faBook, faGlobe, faLaptop, faPalette, 
  faRocket, faStar, faCalendar, faFileAlt 
} from '@fortawesome/free-solid-svg-icons';

const iconMap: Record<string, any> = {
  calculator: faCalculator,
  flask: faFlask,
  book: faBook,
  globe: faGlobe,
  laptop: faLaptop,
  palette: faPalette,
  rocket: faRocket,
  star: faStar,
  calendar: faCalendar,
  'file-alt': faFileAlt
};

interface IconProps {
  name: string;
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Icon: React.FC<IconProps> = ({ name, size, color, className, style }) => {
  const icon = iconMap[name];
  if (!icon) return null;
  return (
    <FontAwesomeIcon 
      icon={icon} 
      color={color} 
      className={className} 
      style={{ fontSize: size, ...style }} 
    />
  );
};
