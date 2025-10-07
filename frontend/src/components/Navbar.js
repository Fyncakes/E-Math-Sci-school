import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Navbar = ({ isMenuOpen, toggleMenu }) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  
  // Check if user is admin
  const isAdmin = () => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      return user.role === 'admin';
    }
    return false;
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <Logo size="medium" showText={false} />
        </Link>
        
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <div className="nav-links">
            <Link to="/" className="nav-link" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/programs" className="nav-link" onClick={toggleMenu}>
              Programs
            </Link>
            <Link to="/admissions" className="nav-link" onClick={toggleMenu}>
              Admissions
            </Link>
            <Link to="/portal" className="nav-link" onClick={toggleMenu}>
              Student Portal
            </Link>
            <Link to="/teacher-login" className="nav-link" onClick={toggleMenu}>
              Teacher Portal
            </Link>
            <div className="nav-dropdown">
              <button 
                className="nav-link dropdown-toggle" 
                onClick={() => setShowMoreMenu(!showMoreMenu)}
              >
                More ▼
              </button>
              {showMoreMenu && (
                <div className="dropdown-menu">
                  <Link to="/about" className="dropdown-link" onClick={() => { setShowMoreMenu(false); toggleMenu(); }}>
                    About Us
                  </Link>
                  <Link to="/news" className="dropdown-link" onClick={() => { setShowMoreMenu(false); toggleMenu(); }}>
                    News & Events
                  </Link>
                  <Link to="/gallery" className="dropdown-link" onClick={() => { setShowMoreMenu(false); toggleMenu(); }}>
                    Gallery
                  </Link>
                  <Link to="/testimonials" className="dropdown-link" onClick={() => { setShowMoreMenu(false); toggleMenu(); }}>
                    Testimonials
                  </Link>
                </div>
              )}
            </div>
            <Link to="/contact" className="nav-link" onClick={toggleMenu}>
              Contact
            </Link>
          </div>
          
          <div className="nav-actions">
            <Link to="/register" className="apply-btn">
              Apply Now
            </Link>
            <Link to="/login" className="login-btn">
              Login
            </Link>
            {isAdmin() && (
              <Link to="/admin" className="admin-btn">
                Admin
              </Link>
            )}
          </div>
        </div>
        
        <div className="nav-toggle" onClick={toggleMenu}>
          <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
