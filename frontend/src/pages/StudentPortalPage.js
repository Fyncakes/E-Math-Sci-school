import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaGraduationCap, FaEnvelope, FaLock, FaEye, FaEyeSlash, 
  FaSignInAlt, FaUser, FaExclamationTriangle, FaCheckCircle, 
  FaSpinner, FaRocket, FaArrowLeft
} from 'react-icons/fa';

const StudentPortalPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Validation
    if (!formData.email.trim()) {
      setError('Please enter your email address');
      setIsLoading(false);
      return;
    }

    if (!formData.password.trim()) {
      setError('Please enter your password');
      setIsLoading(false);
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    // API call to backend
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: 'student'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store student session
        localStorage.setItem('userData', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        localStorage.setItem('studentId', data.user.id);
        setSuccess('Login successful! Redirecting to dashboard...');
        
        // Redirect to student dashboard
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setError(data.message || 'Invalid email or password. Please check your credentials.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="student-portal-page">
      <div className="portal-container">
        <div className="portal-card">
          {/* Header */}
          <div className="portal-header">
            <div className="portal-logo">
              <FaGraduationCap />
            </div>
            <div className="portal-title">
              <h1>G'SON INTERNATIONAL ACADEMY</h1>
              <h2>Student Portal</h2>
              <p>Access your learning resources and connect with your classes</p>
            </div>
          </div>

          {/* Back Button (only show when login form is visible) */}
          {showLogin && (
            <div className="back-button-container">
              <button 
                className="back-button"
                onClick={() => setShowLogin(false)}
              >
                <FaArrowLeft />
                Back to Options
              </button>
            </div>
          )}

          {/* Login Form */}
          {showLogin ? (
            <form onSubmit={handleSubmit} className="portal-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
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

              {/* Error and Success Messages */}
              {error && (
                <div className="error-alert">
                  <FaExclamationTriangle />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="success-alert">
                  <FaCheckCircle />
                  <span>{success}</span>
                </div>
              )}

              <button
                type="submit"
                className="login-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="spinner" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <FaSignInAlt />
                    Sign In to Student Portal
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="portal-actions">
              <button 
                className="btn-primary"
                onClick={() => setShowLogin(true)}
              >
                <FaSignInAlt />
                Student Login
              </button>
              <Link to="/register" className="btn-secondary">
                <FaUser />
                New Student? Register Here
              </Link>
            </div>
          )}

          {/* Footer Links */}
          <div className="portal-footer">
            <p>Need help accessing your account?</p>
            <div className="footer-links">
              <Link to="/contact" className="footer-link">
                <FaGraduationCap />
                Contact Support
              </Link>
              <Link to="/" className="footer-link">
                <FaRocket />
                Back to School Website
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPortalPage;
