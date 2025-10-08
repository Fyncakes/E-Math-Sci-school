import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUser, FaLock, FaGoogle, FaMicrosoft, FaGraduationCap, FaBook, FaChartLine, FaUsers, FaRocket, FaCheckCircle } from 'react-icons/fa';

const StudentLoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Enhanced validation
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

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call with better validation
      // API call to backend
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
    <div className="student-login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="brand">
              <div className="logo">
                <FaGraduationCap />
              </div>
              <div className="brand-info">
                <h1>G'SON INTERNATIONAL ACADEMY</h1>
                <span>Student Portal</span>
              </div>
            </div>
            <div className="welcome-section">
              <h2>Welcome Back!</h2>
              <p>Sign in to continue your learning journey</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="error-alert">
                <FaCheckCircle />
                <span>{error}</span>
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="email">
                <FaUser />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
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
              <label className="checkbox-container">
                <input type="checkbox" />
                <span className="checkmark"></span>
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
            </div>

            <button 
              type="submit" 
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  Signing In...
                </>
              ) : (
                <>
                  <FaRocket />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>Don't have an account? <Link to="/register">Create one here</Link></p>
            <div className="divider">
              <span>or continue with</span>
            </div>
            <div className="social-login">
              <button className="social-btn google">
                <FaGoogle />
                Google
              </button>
              <button className="social-btn microsoft">
                <FaMicrosoft />
                Microsoft
              </button>
            </div>
          </div>
        </div>

        <div className="login-info">
          <div className="info-header">
            <div className="info-logo">
              <FaRocket />
            </div>
            <h3>Your Learning Journey Starts Here</h3>
            <p>Join thousands of students already learning with us</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FaBook />
              </div>
              <div className="feature-content">
                <h4>Interactive Learning</h4>
                <p>Engage with dynamic content and personalized lesson plans</p>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaChartLine />
              </div>
              <div className="feature-content">
                <h4>Track Progress</h4>
                <p>Monitor your academic performance with detailed analytics</p>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaUsers />
              </div>
              <div className="feature-content">
                <h4>Expert Teachers</h4>
                <p>Learn from qualified instructors and get personalized support</p>
              </div>
            </div>
          </div>

          <div className="stats-preview">
            <div className="stat-item">
              <div className="stat-number">2,500+</div>
              <div className="stat-label">Active Students</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">95%</div>
              <div className="stat-label">Success Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Expert Teachers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLoginPage;
