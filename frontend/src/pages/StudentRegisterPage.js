import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

    // Validation
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

    // Simulate API call
    setTimeout(() => {
      // Successful registration
      navigate('/login?registered=true');
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <div className="logo">
              <div className="logo-icon">🎓</div>
              <h2>E-Math-Sci School</h2>
            </div>
            <h3>Student Registration</h3>
            <p>Join our learning community and start your journey to excellence!</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-section">
              <h4>Student Information</h4>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">Password *</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create password"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password *</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="grade">Grade Level *</label>
                  <select
                    id="grade"
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
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
                  <label htmlFor="program">Program Interest *</label>
                  <select
                    id="program"
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
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
              <h4>Parent/Guardian Information</h4>
              <div className="form-group">
                <label htmlFor="parentName">Parent/Guardian Name *</label>
                <input
                  type="text"
                  id="parentName"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  placeholder="Enter parent/guardian name"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="parentEmail">Parent Email *</label>
                  <input
                    type="email"
                    id="parentEmail"
                    name="parentEmail"
                    value={formData.parentEmail}
                    onChange={handleChange}
                    placeholder="Enter parent email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="parentPhone">Parent Phone *</label>
                  <input
                    type="tel"
                    id="parentPhone"
                    name="parentPhone"
                    value={formData.parentPhone}
                    onChange={handleChange}
                    placeholder="Enter parent phone"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    required
                  />
                  <span>I agree to the <Link to="/terms">Terms and Conditions</Link> and <Link to="/privacy">Privacy Policy</Link> *</span>
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              className="register-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="register-footer">
            <p>Already have an account? <Link to="/login">Sign in here</Link></p>
          </div>
        </div>

        <div className="register-info">
          <h3>Why Choose E-Math-Sci School?</h3>
          <div className="info-cards">
            <div className="info-card">
              <div className="info-icon">🏆</div>
              <h4>Proven Excellence</h4>
              <p>95% of our students achieve their academic goals</p>
            </div>
            <div className="info-card">
              <div className="info-icon">👨‍🏫</div>
              <h4>Expert Teachers</h4>
              <p>Learn from experienced and passionate educators</p>
            </div>
            <div className="info-card">
              <div className="info-icon">💻</div>
              <h4>Modern Technology</h4>
              <p>State-of-the-art learning tools and resources</p>
            </div>
            <div className="info-card">
              <div className="info-icon">🤝</div>
              <h4>Supportive Community</h4>
              <p>Join a caring and inclusive learning environment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRegisterPage;
