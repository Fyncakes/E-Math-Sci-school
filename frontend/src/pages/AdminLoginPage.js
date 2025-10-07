import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaShieldAlt, FaEye, FaEyeSlash, FaLock, FaUser, 
  FaCrown, FaGraduationCap, FaChartBar, FaUsers, 
  FaBook, FaCog, FaFileAlt, FaCheckCircle, FaExclamationTriangle,
  FaArrowLeft, FaSpinner
} from 'react-icons/fa';

const AdminLoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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
          loginTime: new Date().toISOString(),
          avatar: 'AU'
        }));
        navigate('/admin-dashboard');
      } else {
        setError('Invalid admin credentials. Please check your username and password.');
      }
      setIsLoading(false);
    }, 1500);
  };

  const features = [
    { icon: FaUsers, title: 'Student Management', description: 'Manage student accounts, enrollments, and progress tracking' },
    { icon: FaBook, title: 'Course Management', description: 'Create and manage courses, lessons, and curriculum' },
    { icon: FaChartBar, title: 'Analytics Dashboard', description: 'View detailed reports and performance metrics' },
    { icon: FaCog, title: 'System Settings', description: 'Configure system preferences and user permissions' },
    { icon: FaFileAlt, title: 'Content Management', description: 'Upload and organize educational content and resources' },
    { icon: FaShieldAlt, title: 'Security Control', description: 'Monitor access and maintain system security' }
  ];

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        {/* Left Side - Login Form */}
        <div className="admin-login-card">
          <div className="admin-login-header">
            <div className="admin-brand">
              <div className="admin-logo">
                <FaCrown />
              </div>
              <div className="admin-title">
                <h1>E-School Admin</h1>
                <p>Administration Portal</p>
              </div>
            </div>
          </div>

          <div className="login-form-container">
            <div className="form-header">
              <h2>Welcome Back</h2>
              <p>Sign in to access the admin dashboard</p>
            </div>

            {error && (
              <div className="error-alert">
                <FaExclamationTriangle />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="admin-login-form">
              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  <FaUser />
                  Admin Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your admin username"
                  required
                  className="form-input"
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  <FaLock />
                  Password
                </label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="form-input"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={isLoading}
                  />
                  <span className="checkmark"></span>
                  Remember me
                </label>
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>

              <button 
                type="submit" 
                className="login-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="spinner" />
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

            <div className="demo-credentials">
              <div className="demo-header">
                <FaCheckCircle />
                <span>Demo Credentials</span>
              </div>
              <div className="credential-grid">
                <div className="credential-item">
                  <strong>Username:</strong> admin
                </div>
                <div className="credential-item">
                  <strong>Password:</strong> admin123
                </div>
              </div>
            </div>

            <div className="login-footer">
              <Link to="/" className="back-link">
                <FaArrowLeft />
                Back to Main Site
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side - Features & Info */}
        <div className="admin-login-info">
          <div className="info-content">
            <div className="info-header">
              <div className="info-logo">
                <FaGraduationCap />
              </div>
              <h3>Admin Portal Features</h3>
              <p>Comprehensive management tools for your educational platform</p>
            </div>

            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">
                    <feature.icon />
                  </div>
                  <div className="feature-content">
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="security-notice">
              <div className="security-header">
                <FaShieldAlt />
                <h4>Security Notice</h4>
              </div>
              <p>This is a demo admin portal. In production, ensure you use strong passwords and enable two-factor authentication for enhanced security.</p>
            </div>

            <div className="stats-preview">
              <div className="stat-item">
                <div className="stat-number">487</div>
                <div className="stat-label">Students</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">52</div>
                <div className="stat-label">Teachers</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">24</div>
                <div className="stat-label">Classes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;