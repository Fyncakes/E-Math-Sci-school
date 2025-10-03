import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <Logo size="medium" />
            </div>
            <p>Enhancing math and science lovers to high heights through innovative education and cutting-edge technology.</p>
            <div className="social-links">
              <h4>Follow Us</h4>
              <div className="social-icons">
                <a href="#" className="social-icon" title="Facebook">📘</a>
                <a href="#" className="social-icon" title="Instagram">📷</a>
                <a href="#" className="social-icon" title="WhatsApp">💬</a>
                <a href="#" className="social-icon" title="LinkedIn">💼</a>
                <a href="#" className="social-icon" title="YouTube">📺</a>
              </div>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/programs">Programs</Link></li>
              <li><Link to="/admissions">Admissions</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Programs</h4>
            <ul>
              <li><Link to="/programs">Elementary Math</Link></li>
              <li><Link to="/programs">Middle School STEM</Link></li>
              <li><Link to="/programs">High School Advanced</Link></li>
              <li><Link to="/programs">Online Learning</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Student Resources</h4>
            <ul>
              <li><Link to="/portal">Student Portal</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <p>📍 123 Education Street<br/>Learning City, LC 12345</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>✉️ info@emathsci.edu</p>
              <p>💬 WhatsApp: +1 (555) 123-4567</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 E-Math-Sci School. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
