import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUserPlus, FaGraduationCap, FaEnvelope, FaPhone, FaIdCard, FaBook, 
  FaUsers, FaCalendar, FaSave, FaArrowLeft, FaCheckCircle, FaExclamationTriangle,
  FaEye, FaEyeSlash, FaUser, FaLock, FaAward, FaChalkboardTeacher, FaSchool
} from 'react-icons/fa';

const AdminAddTeacherPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    employeeId: '',
    subject: '',
    grade: '',
    experience: '',
    qualification: '',
    password: '',
    confirmPassword: '',
    department: '',
    joinDate: '',
    salary: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    bio: '',
    isActive: true,
    profileImage: null
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Validation
    if (!formData.firstName.trim()) {
      setError('First name is required');
      setIsLoading(false);
      return;
    }

    if (!formData.lastName.trim()) {
      setError('Last name is required');
      setIsLoading(false);
      return;
    }

    if (!formData.email.trim()) {
      setError('Email address is required');
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
      setError('Password is required');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    // API call to backend
    try {
      const response = await fetch('http://localhost:5000/api/teachers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Teacher added successfully! They can now login to their dashboard.');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          employeeId: '',
          subject: '',
          grade: '',
          experience: '',
          qualification: '',
          password: '',
          confirmPassword: '',
          department: '',
          joinDate: '',
          salary: '',
          address: '',
          emergencyContact: '',
          emergencyPhone: '',
          bio: '',
          isActive: true
        });
      } else {
        setError(data.message || 'Failed to add teacher. Please try again.');
      }
    } catch (err) {
      setError('Failed to add teacher. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getTabIcon = (tab) => {
    switch (tab) {
      case 'personal': return <FaUser />;
      case 'professional': return <FaChalkboardTeacher />;
      case 'credentials': return <FaLock />;
      case 'additional': return <FaBook />;
      default: return <FaUser />;
    }
  };

  return (
    <div className="admin-add-teacher-page">
      {/* Header */}
      <div className="admin-header">
        <div className="admin-header-content">
          <div className="admin-brand">
            <div className="admin-logo">
              <FaGraduationCap />
            </div>
            <div className="admin-title">
              <h1>G'SON INTERNATIONAL ACADEMY</h1>
              <span>Admin Portal - Add Teacher</span>
            </div>
          </div>
          
          <div className="admin-header-actions">
            <Link to="/admin-dashboard" className="back-btn">
              <FaArrowLeft />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="add-teacher-content">
        <div className="container">
          <div className="add-teacher-header">
            <div className="header-info">
              <h2>Add New Teacher</h2>
              <p>Create a new teacher account with access to the teacher dashboard</p>
            </div>
            <div className="header-icon">
              <FaUserPlus />
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="form-nav">
            <div className="form-nav-tabs">
              {['personal', 'professional', 'credentials', 'additional'].map(tab => (
                <button
                  key={tab}
                  className={`form-nav-tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {getTabIcon(tab)}
                  <span>{tab.charAt(0).toUpperCase() + tab.slice(1)} Info</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="teacher-form">
            {/* Personal Information Tab */}
            {activeTab === 'personal' && (
              <div className="form-section">
                <div className="section-header">
                  <h3>Personal Information</h3>
                  <span className="section-number">1</span>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name *</label>
                    <div className="input-group">
                      <FaUser />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter first name"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Last Name *</label>
                    <div className="input-group">
                      <FaUser />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter last name"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Profile Photo</label>
                  <div className="file-upload-container">
                    <input
                      type="file"
                      name="profileImage"
                      accept="image/*"
                      onChange={handleChange}
                      className="file-input"
                      id="profileImage"
                    />
                    <label htmlFor="profileImage" className="file-upload-label">
                      <FaUser />
                      <span>{formData.profileImage ? formData.profileImage.name : 'Choose Profile Photo'}</span>
                    </label>
                    {formData.profileImage && (
                      <div className="image-preview">
                        <img 
                          src={URL.createObjectURL(formData.profileImage)} 
                          alt="Profile preview" 
                          className="preview-image"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email Address *</label>
                    <div className="input-group">
                      <FaEnvelope />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Phone Number</label>
                    <div className="input-group">
                      <FaPhone />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Employee ID</label>
                    <div className="input-group">
                      <FaIdCard />
                      <input
                        type="text"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleChange}
                        placeholder="Enter employee ID"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Join Date</label>
                    <div className="input-group">
                      <FaCalendar />
                      <input
                        type="date"
                        name="joinDate"
                        value={formData.joinDate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter full address"
                    rows="3"
                  />
                </div>
              </div>
            )}

            {/* Professional Information Tab */}
            {activeTab === 'professional' && (
              <div className="form-section">
                <div className="section-header">
                  <h3>Professional Information</h3>
                  <span className="section-number">2</span>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Subject *</label>
                    <div className="input-group">
                      <FaBook />
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Subject</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Science">Science</option>
                        <option value="Physics">Physics</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Biology">Biology</option>
                        <option value="English">English</option>
                        <option value="Computer Science">Computer Science</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Grade Level</label>
                    <div className="input-group">
                      <FaGraduationCap />
                      <select
                        name="grade"
                        value={formData.grade}
                        onChange={handleChange}
                      >
                        <option value="">Select Grade</option>
                        <option value="Grade 6-8">Grade 6-8</option>
                        <option value="Grade 9-10">Grade 9-10</option>
                        <option value="Grade 11-12">Grade 11-12</option>
                        <option value="All Grades">All Grades</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Years of Experience</label>
                    <div className="input-group">
                      <FaAward />
                      <input
                        type="number"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        placeholder="Years of experience"
                        min="0"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Department</label>
                    <div className="input-group">
                      <FaSchool />
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                      >
                        <option value="">Select Department</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Science">Science</option>
                        <option value="Languages">Languages</option>
                        <option value="Computer Science">Computer Science</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Qualification</label>
                  <textarea
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    placeholder="Enter educational qualifications"
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Enter teacher bio"
                    rows="4"
                  />
                </div>
              </div>
            )}

            {/* Credentials Tab */}
            {activeTab === 'credentials' && (
              <div className="form-section">
                <div className="section-header">
                  <h3>Login Credentials</h3>
                  <span className="section-number">3</span>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Password *</label>
                    <div className="input-group">
                      <FaLock />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create password"
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
                    <label>Confirm Password *</label>
                    <div className="input-group">
                      <FaLock />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm password"
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

                <div className="credentials-info">
                  <h4>Teacher Access Information</h4>
                  <div className="info-cards">
                    <div className="info-card">
                      <FaChalkboardTeacher />
                      <div>
                        <h5>Teacher Dashboard</h5>
                        <p>Access to manage classes, students, and upload content</p>
                      </div>
                    </div>
                    <div className="info-card">
                      <FaUsers />
                      <div>
                        <h5>Student Management</h5>
                        <p>View and manage student progress and attendance</p>
                      </div>
                    </div>
                    <div className="info-card">
                      <FaBook />
                      <div>
                        <h5>Content Upload</h5>
                        <p>Upload assignments, grades, and educational resources</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Additional Information Tab */}
            {activeTab === 'additional' && (
              <div className="form-section">
                <div className="section-header">
                  <h3>Additional Information</h3>
                  <span className="section-number">4</span>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Salary</label>
                    <div className="input-group">
                      <FaAward />
                      <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        placeholder="Enter salary"
                        min="0"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Status</label>
                    <div className="input-group">
                      <FaCheckCircle />
                      <select
                        name="isActive"
                        value={formData.isActive}
                        onChange={handleChange}
                      >
                        <option value={true}>Active</option>
                        <option value={false}>Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Emergency Contact</label>
                    <div className="input-group">
                      <FaUser />
                      <input
                        type="text"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleChange}
                        placeholder="Emergency contact name"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Emergency Phone</label>
                    <div className="input-group">
                      <FaPhone />
                      <input
                        type="tel"
                        name="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={handleChange}
                        placeholder="Emergency contact phone"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

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

            {/* Form Actions */}
            <div className="form-actions">
              <div className="form-nav-buttons">
                {activeTab !== 'personal' && (
                  <button
                    type="button"
                    className="nav-btn prev-btn"
                    onClick={() => {
                      const tabs = ['personal', 'professional', 'credentials', 'additional'];
                      const currentIndex = tabs.indexOf(activeTab);
                      if (currentIndex > 0) {
                        setActiveTab(tabs[currentIndex - 1]);
                      }
                    }}
                  >
                    <FaArrowLeft />
                    Previous
                  </button>
                )}
                
                {activeTab !== 'additional' && (
                  <button
                    type="button"
                    className="nav-btn next-btn"
                    onClick={() => {
                      const tabs = ['personal', 'professional', 'credentials', 'additional'];
                      const currentIndex = tabs.indexOf(activeTab);
                      if (currentIndex < tabs.length - 1) {
                        setActiveTab(tabs[currentIndex + 1]);
                      }
                    }}
                  >
                    Next
                    <FaArrowLeft style={{ transform: 'rotate(180deg)' }} />
                  </button>
                )}
              </div>
              
              <button
                type="submit"
                className="submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    Adding Teacher...
                  </>
                ) : (
                  <>
                    <FaSave />
                    Add Teacher
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAddTeacherPage;
