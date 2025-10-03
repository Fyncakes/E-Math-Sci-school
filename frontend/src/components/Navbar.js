import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Navbar = ({ isMenuOpen, toggleMenu }) => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <Logo size="medium" />
        </Link>
        
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <div className="nav-links">
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <span className="nav-icon">🏠</span>
              <span>Home</span>
            </Link>
            <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <span className="nav-icon">ℹ️</span>
              <span>About Us</span>
            </Link>
            <Link to="/programs" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <span className="nav-icon">🎓</span>
              <span>Programs</span>
            </Link>
            <Link to="/admissions" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <span className="nav-icon">📝</span>
              <span>Admissions</span>
            </Link>
            <Link to="/portal" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <span className="nav-icon">💻</span>
              <span>Student Portal</span>
            </Link>
            <Link to="/news" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <span className="nav-icon">📰</span>
              <span>News & Events</span>
            </Link>
            <Link to="/gallery" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <span className="nav-icon">🖼️</span>
              <span>Gallery</span>
            </Link>
            <Link to="/testimonials" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <span className="nav-icon">💬</span>
              <span>Testimonials</span>
            </Link>
            <Link to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <span className="nav-icon">📞</span>
              <span>Contact</span>
            </Link>
          </div>
          
          <div className="nav-actions">
            <Link to="/register" className="apply-btn">
              <span className="btn-icon">✨</span>
              <span>Apply Now</span>
            </Link>
            <Link to="/login" className="login-btn">
              <span className="btn-icon">🔑</span>
              <span>Login</span>
            </Link>
            <Link to="/admin" className="admin-btn">
              <span className="btn-icon">⚙️</span>
              <span>Admin</span>
            </Link>
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
