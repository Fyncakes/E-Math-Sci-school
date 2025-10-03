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
        <div className="stars-container">
          <span className="star star-1">⭐</span>
          <span className="star star-2">✨</span>
          <span className="star star-3">🌟</span>
          <span className="star star-4">💫</span>
        </div>
        <div className="graduation-cap">🎓</div>
        <div className="math-symbols">
          <span className="symbol">+</span>
          <span className="symbol">×</span>
          <span className="symbol">÷</span>
        </div>
      </div>
      {showText && (
        <div className="logo-text">
          <h2 className="school-name">E-School</h2>
          <span className="tagline">Learning Hub</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
