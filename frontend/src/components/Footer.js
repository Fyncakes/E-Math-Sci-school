import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <div className="footer-logo">
                <Logo size="medium" showText={false} />
                <div className="brand-text">
                  <h3>G'SON INTERNATIONAL ACADEMY</h3>
                  <p>Learning Hub</p>
                </div>
              </div>
              <p className="footer-description">
                Empowering students with world-class education in mathematics and science.
              </p>
            </div>
            
            <div className="footer-links">
              <div className="footer-column">
                <h4>Quick Links</h4>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/programs">Programs</Link></li>
                  <li><Link to="/admissions">Admissions</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              </div>
              
              <div className="footer-column">
                <h4>Programs</h4>
                <ul>
                  <li><Link to="/programs">Mathematics</Link></li>
                  <li><Link to="/programs">Sciences</Link></li>
                  <li><Link to="/programs">English Grammar</Link></li>
                  <li><Link to="/programs">Online Learning</Link></li>
                </ul>
              </div>
              
              <div className="footer-column">
                <h4>Contact</h4>
                <div className="contact-info">
                  <div className="contact-item">
                    <span className="contact-icon">📞</span>
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">✉️</span>
                    <span>info@eschool.edu</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">📍</span>
                    <span>123 Education Street</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="social-section">
            <div className="social-links">
              <h4>Follow Us</h4>
              <div className="social-icons">
                <a href="#" className="social-icon" title="Facebook">📘</a>
                <a href="#" className="social-icon" title="Twitter">🐦</a>
                <a href="#" className="social-icon" title="Instagram">📷</a>
                <a href="#" className="social-icon" title="LinkedIn">💼</a>
                <a href="#" className="social-icon" title="YouTube">📺</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p>&copy; {new Date().getFullYear()} G'SON INTERNATIONAL ACADEMY. All rights reserved.</p>
            <div className="footer-legal">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/cookies">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;