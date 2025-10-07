import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaChalkboardTeacher, FaEnvelope, FaLock, FaEye, FaEyeSlash, 
  FaGraduationCap, FaSignInAlt, FaUser, FaBook, FaUsers,
  FaExclamationTriangle, FaCheckCircle, FaSpinner
} from 'react-icons/fa';

const TeacherLoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
          role: 'teacher'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store teacher session
        localStorage.setItem('currentTeacher', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        setSuccess('Login successful! Redirecting to teacher dashboard...');
        
        // Redirect to teacher dashboard
        setTimeout(() => {
          window.location.href = '/teacher-dashboard';
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
    <div className="teacher-login-page">
      <div className="login-container">
        <div className="login-card">
          {/* Header */}
          <div className="login-header">
            <div className="login-logo">
              <FaChalkboardTeacher />
            </div>
            <div className="login-title">
              <h1>G'SON INTERNATIONAL ACADEMY</h1>
              <h2>Teacher Portal</h2>
              <p>Access your teaching dashboard</p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-group">
                <FaEnvelope />
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
                <FaLock />
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
                  Sign In to Teacher Portal
                </>
              )}
            </button>
          </form>

          {/* Teacher Features Info */}
          <div className="teacher-features">
            <h3>Teacher Portal Features</h3>
            <div className="features-grid">
              <div className="feature-card">
                <FaUsers />
                <div>
                  <h4>Student Management</h4>
                  <p>View and manage your students</p>
                </div>
              </div>
              <div className="feature-card">
                <FaBook />
                <div>
                  <h4>Content Upload</h4>
                  <p>Upload lessons, assignments, and resources</p>
                </div>
              </div>
              <div className="feature-card">
                <FaChalkboardTeacher />
                <div>
                  <h4>Class Management</h4>
                  <p>Schedule and manage your classes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="login-footer">
            <p>Don't have a teacher account?</p>
            <p>Contact the administrator to set up your account</p>
            <div className="footer-links">
              <Link to="/" className="footer-link">
                <FaGraduationCap />
                Back to School Website
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherLoginPage;
