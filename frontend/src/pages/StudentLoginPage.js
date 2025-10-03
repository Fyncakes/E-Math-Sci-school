import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const StudentLoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
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

    // Simulate API call
    setTimeout(() => {
      if (formData.email && formData.password) {
        // Successful login
        navigate('/dashboard');
      } else {
        setError('Please fill in all fields');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="logo">
              <div className="logo-icon">🎓</div>
              <h2>E-Math-Sci School</h2>
            </div>
            <h3>Student Login</h3>
            <p>Welcome back! Please sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
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

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
            </div>

            <button 
              type="submit" 
              className="login-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="login-footer">
            <p>Don't have an account? <Link to="/register">Sign up here</Link></p>
            <div className="divider">
              <span>or</span>
            </div>
            <div className="social-login">
              <button className="social-btn google">
                <span>🔍</span> Continue with Google
              </button>
              <button className="social-btn microsoft">
                <span>🪟</span> Continue with Microsoft
              </button>
            </div>
          </div>
        </div>

        <div className="login-info">
          <h3>Welcome to Your Learning Journey!</h3>
          <div className="info-cards">
            <div className="info-card">
              <div className="info-icon">📚</div>
              <h4>Access Your Courses</h4>
              <p>Continue your learning with personalized lesson plans and resources</p>
            </div>
            <div className="info-card">
              <div className="info-icon">📊</div>
              <h4>Track Your Progress</h4>
              <p>Monitor your academic performance and achievements</p>
            </div>
            <div className="info-card">
              <div className="info-icon">👥</div>
              <h4>Connect with Teachers</h4>
              <p>Communicate with your instructors and get help when needed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLoginPage;
