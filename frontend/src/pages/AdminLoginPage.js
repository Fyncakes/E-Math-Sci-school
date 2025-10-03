import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShieldAlt, FaEye, FaEyeSlash } from 'react-icons/fa';

const AdminLoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate admin login
    setTimeout(() => {
      if (formData.username === 'admin' && formData.password === 'admin123') {
        // Store admin session
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminUser', JSON.stringify({
          username: formData.username,
          role: 'Administrator',
          loginTime: new Date().toISOString()
        }));
        navigate('/admin-dashboard');
      } else {
        setError('Invalid admin credentials. Please try again.');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <div className="admin-logo">
              <FaShieldAlt className="admin-icon" />
              <h2>Admin Portal</h2>
            </div>
            <p>E-School Administration System</p>
          </div>

          {error && (
            <div className="error-message">
              <span>⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="admin-login-form">
            <div className="form-group">
              <label htmlFor="username">Admin Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter admin username"
                required
                className="admin-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter admin password"
                  required
                  className="admin-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="admin-login-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="loading-spinner"></div>
                  Signing In...
                </>
              ) : (
                <>
                  <FaShieldAlt />
                  Sign In to Admin Portal
                </>
              )}
            </button>
          </form>

          <div className="admin-login-footer">
            <p>Demo Credentials:</p>
            <div className="demo-credentials">
              <div className="credential-item">
                <strong>Username:</strong> admin
              </div>
              <div className="credential-item">
                <strong>Password:</strong> admin123
              </div>
            </div>
            <Link to="/" className="back-to-site">
              ← Back to Main Site
            </Link>
          </div>
        </div>

        <div className="admin-login-info">
          <div className="info-content">
            <h3>Admin Portal Features</h3>
            <ul className="feature-list">
              <li>👥 Student Management</li>
              <li>📚 Course & Lesson Management</li>
              <li>📊 Analytics & Reports</li>
              <li>⚙️ System Settings</li>
              <li>📝 Content Management</li>
              <li>🔐 User Access Control</li>
            </ul>
            <div className="security-notice">
              <h4>🔒 Security Notice</h4>
              <p>This is a demo admin portal. In production, use strong passwords and enable two-factor authentication.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
