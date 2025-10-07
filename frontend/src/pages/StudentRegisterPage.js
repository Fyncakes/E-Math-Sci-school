import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUser, FaLock, FaEnvelope, FaPhone, FaGraduationCap, FaUsers, FaTrophy, FaChalkboardTeacher, FaLaptop, FaHandshake, FaCheckCircle, FaRocket, FaStar } from 'react-icons/fa';

const StudentRegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    grade: '',
    program: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    agreeToTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Enhanced validation
    if (!formData.firstName.trim()) {
      setError('Please enter your first name');
      setIsLoading(false);
      return;
    }

    if (!formData.lastName.trim()) {
      setError('Please enter your last name');
      setIsLoading(false);
      return;
    }

    if (!formData.email.trim()) {
      setError('Please enter your email address');
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

    if (!formData.password.trim()) {
      setError('Please enter a password');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setError('Please agree to the terms and conditions');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call with better validation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store registration data
      const registrationData = {
        ...formData,
        id: 'student_' + Date.now(),
        registrationDate: new Date().toISOString(),
        status: 'pending_approval'
      };
      localStorage.setItem('registrationData', JSON.stringify(registrationData));
      
      // Successful registration
      navigate('/login?registered=true');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="student-register-page">
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <div className="brand">
              <div className="logo">
                <FaGraduationCap />
              </div>
              <div className="brand-info">
                <h1>E-School</h1>
                <span>Student Registration</span>
              </div>
            </div>
            <div className="welcome-section">
              <h2>Join Our Learning Community!</h2>
              <p>Start your journey to academic excellence with us</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            {error && (
              <div className="error-alert">
                <FaCheckCircle />
                <span>{error}</span>
              </div>
            )}
            
            <div className="form-section">
              <div className="section-header">
                <h4>Student Information</h4>
                <span className="section-number">1</span>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">
                    <FaUser />
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">
                    <FaUser />
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  <FaEnvelope />
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">
                    <FaLock />
                    Password *
                  </label>
                  <div className="password-input-container">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create password"
                      className="form-input"
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
                <div className="form-group">
                  <label htmlFor="confirmPassword">
                    <FaLock />
                    Confirm Password *
                  </label>
                  <div className="password-input-container">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm password"
                      className="form-input"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="grade">
                    <FaGraduationCap />
                    Grade Level *
                  </label>
                  <select
                    id="grade"
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select Grade</option>
                    <option value="1">Grade 1</option>
                    <option value="2">Grade 2</option>
                    <option value="3">Grade 3</option>
                    <option value="4">Grade 4</option>
                    <option value="5">Grade 5</option>
                    <option value="6">Grade 6</option>
                    <option value="7">Grade 7</option>
                    <option value="8">Grade 8</option>
                    <option value="9">Grade 9</option>
                    <option value="10">Grade 10</option>
                    <option value="11">Grade 11</option>
                    <option value="12">Grade 12</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="program">
                    <FaStar />
                    Program Interest *
                  </label>
                  <select
                    id="program"
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select Program</option>
                    <option value="elementary">Elementary Math & Science</option>
                    <option value="middle">Middle School STEM</option>
                    <option value="high">High School Advanced</option>
                    <option value="online">Online Learning</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="section-header">
                <h4>Parent/Guardian Information</h4>
                <span className="section-number">2</span>
              </div>
              
              <div className="form-group">
                <label htmlFor="parentName">
                  <FaUsers />
                  Parent/Guardian Name *
                </label>
                <input
                  type="text"
                  id="parentName"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  placeholder="Enter parent/guardian name"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="parentEmail">
                    <FaEnvelope />
                    Parent Email *
                  </label>
                  <input
                    type="email"
                    id="parentEmail"
                    name="parentEmail"
                    value={formData.parentEmail}
                    onChange={handleChange}
                    placeholder="Enter parent email"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="parentPhone">
                    <FaPhone />
                    Parent Phone *
                  </label>
                  <input
                    type="tel"
                    id="parentPhone"
                    name="parentPhone"
                    value={formData.parentPhone}
                    onChange={handleChange}
                    placeholder="Enter parent phone"
                    className="form-input"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="checkbox-group">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    required
                  />
                  <span className="checkmark"></span>
                  <span>I agree to the <Link to="/terms">Terms and Conditions</Link> and <Link to="/privacy">Privacy Policy</Link> *</span>
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              className="register-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  <FaRocket />
                  Create Account
                </>
              )}
            </button>
          </form>

          <div className="register-footer">
            <p>Already have an account? <Link to="/login">Sign in here</Link></p>
          </div>
        </div>

        <div className="register-info">
          <div className="info-header">
            <div className="info-logo">
              <FaTrophy />
            </div>
            <h3>Why Choose E-School?</h3>
            <p>Join thousands of successful students</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FaTrophy />
              </div>
              <div className="feature-content">
                <h4>Proven Excellence</h4>
                <p>95% of our students achieve their academic goals</p>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaChalkboardTeacher />
              </div>
              <div className="feature-content">
                <h4>Expert Teachers</h4>
                <p>Learn from experienced and passionate educators</p>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaLaptop />
              </div>
              <div className="feature-content">
                <h4>Modern Technology</h4>
                <p>State-of-the-art learning tools and resources</p>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaHandshake />
              </div>
              <div className="feature-content">
                <h4>Supportive Community</h4>
                <p>Join a caring and inclusive learning environment</p>
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

export default StudentRegisterPage;
