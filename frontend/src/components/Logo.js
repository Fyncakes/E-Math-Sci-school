import React from 'react';

const Logo = ({ size = 'medium', showText = true, className = '' }) => {
  const getSizeClass = () => {
    switch (size) {
      case 'small': return 'logo-small';
      case 'large': return 'logo-large';
      default: return 'logo-medium';
    }
  };

  return (
    <div className={`logo-container ${getSizeClass()} ${className}`}>
      <div className="logo-icon">
        <img 
          src="/logo.png" 
          alt="E-School Logo" 
          className="logo-image"
        />
      </div>
    </div>
  );
};

export default Logo;
