import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUser, FaLock, FaGoogle, FaMicrosoft, FaGraduationCap, FaBook, FaChartLine, FaUsers, FaRocket, FaCheckCircle, FaShieldAlt, FaUserTie, FaUserGraduate } from 'react-icons/fa';

const UniversalLoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'student' // Default to student
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Demo authentication function
  const validateLogin = (identifier, password, userType) => {
    // Demo credentials for testing
    const demoCredentials = {
      admin: { 
        email: 'admin@gsonschool.com', 
        username: 'admin', 
        password: 'admin123' 
      },
      teacher: { 
        email: 'teacher@gsonschool.com', 
        username: 'teacher', 
        password: 'teacher123' 
      },
      student: { 
        email: 'student@gsonschool.com', 
        username: 'student', 
        password: 'student123' 
      },
      parent: { 
        email: 'parent@gsonschool.com', 
        username: 'parent', 
        password: 'parent123' 
      },
      visitor: { 
        email: 'visitor@gsonschool.com', 
        username: 'visitor', 
        password: 'visitor123' 
      }
    };
    
    const credentials = demoCredentials[userType];
    if (!credentials) return false;
    
    // Check if identifier matches email or username
    return (identifier === credentials.email || identifier === credentials.username) && password === credentials.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Enhanced validation
    if (!formData.email.trim()) {
      setError('Please enter your username or email address');
      setIsLoading(false);
      return;
    }
    
    if (!formData.password.trim()) {
      setError('Please enter your password');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call with role-based authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo authentication logic - in real app, this would be an API call
      const isValidLogin = validateLogin(formData.email, formData.password, formData.userType);
      
      if (isValidLogin) {
        // Store user session data
        const userSession = {
          userType: formData.userType,
          email: formData.email,
          loginTime: new Date().toISOString(),
          isAuthenticated: true
        };
        
        localStorage.setItem('userSession', JSON.stringify(userSession));
        localStorage.setItem('userType', formData.userType);
        localStorage.setItem('userEmail', formData.email);
        
        // Route based on user type
        switch (formData.userType) {
          case 'admin':
            navigate('/admin-dashboard');
            break;
          case 'teacher':
            navigate('/teacher-dashboard');
            break;
          case 'student':
            navigate('/dashboard');
            break;
          case 'parent':
            navigate('/parent-dashboard');
            break;
          case 'visitor':
            navigate('/');
            break;
          default:
            navigate('/dashboard');
        }
      } else {
        setError('Invalid credentials. Please check your username/email and password.');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const userTypeOptions = [
    { value: 'student', label: 'Student', icon: FaUserGraduate, description: 'Access your courses and assignments' },
    { value: 'teacher', label: 'Teacher', icon: FaUserTie, description: 'Manage your classes and students' },
    { value: 'admin', label: 'Administrator', icon: FaShieldAlt, description: 'Manage school operations' },
    { value: 'parent', label: 'Parent', icon: FaUsers, description: 'Monitor your child\'s progress' },
    { value: 'visitor', label: 'Visitor', icon: FaUser, description: 'Explore our school' }
  ];

  return (
    <div className="universal-login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="brand">
              <div className="logo">
                <FaGraduationCap />
              </div>
              <div className="brand-info">
                <h1>G'SON INTERNATIONAL ACADEMY</h1>
                <span>Universal Portal</span>
              </div>
            </div>
            <div className="welcome-section">
              <h2>Welcome Back!</h2>
              <p>Sign in to continue your journey with us</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="error-message">
                <span>{error}</span>
              </div>
            )}

            {/* User Type Selection */}
            <div className="form-group">
              <label htmlFor="userType">I am a:</label>
              <div className="user-type-selector">
                {userTypeOptions.map((option) => (
                  <div key={option.value} className="user-type-option">
                    <input
                      type="radio"
                      id={option.value}
                      name="userType"
                      value={option.value}
                      checked={formData.userType === option.value}
                      onChange={handleChange}
                      className="user-type-radio"
                    />
                    <label htmlFor={option.value} className="user-type-label">
                      <div className="user-type-icon">
                        <option.icon />
                      </div>
                      <div className="user-type-info">
                        <span className="user-type-name">{option.label}</span>
                        <span className="user-type-desc">{option.description}</span>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Username or Email</label>
              <div className="input-group">
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your username or email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
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

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                Remember me
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? (
                <div className="loading-spinner"></div>
              ) : (
                <>
                  <FaRocket />
                  Sign In
                </>
              )}
            </button>

            <div className="register-link">
              <p>Don't have an account? <Link to="/register">Create one here</Link></p>
            </div>

            <div className="social-login">
              <p>or continue with</p>
              <div className="social-buttons">
                <button type="button" className="social-btn google">
                  <FaGoogle />
                  Google
                </button>
                <button type="button" className="social-btn microsoft">
                  <FaMicrosoft />
                  Microsoft
                </button>
              </div>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default UniversalLoginPage;
