import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaCalendar, FaGraduationCap,
  FaUserPlus, FaSave, FaTimes, FaEye, FaEyeSlash, FaCheck, FaExclamationTriangle
} from 'react-icons/fa';

const AdminAddStudentPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    grade: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    address: '',
    emergencyContact: '',
    medicalInfo: '',
    subjects: [],
    previousSchool: '',
    notes: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const gradeOptions = [
    'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
    'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10',
    'Grade 11', 'Grade 12'
  ];

  const subjectOptions = [
    'Mathematics', 'English', 'Science', 'Physics', 'Chemistry',
    'Biology', 'History', 'Geography', 'Computer Science', 'Art',
    'Music', 'Physical Education', 'French', 'Spanish'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubjectChange = (subject) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Generate a temporary password
      const tempPassword = Math.random().toString(36).slice(-8);
      
      const studentData = {
        ...formData,
        password: tempPassword,
        role: 'student',
        status: 'active',
        createdAt: new Date().toISOString()
      };

      // Here you would normally send to API
      console.log('Student data to be saved:', studentData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          dateOfBirth: '',
          grade: '',
          parentName: '',
          parentEmail: '',
          parentPhone: '',
          address: '',
          emergencyContact: '',
          medicalInfo: '',
          subjects: [],
          previousSchool: '',
          notes: ''
        });
        setSubmitStatus(null);
      }, 3000);

    } catch (error) {
      console.error('Error adding student:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="admin-header-content">
          <Link to="/admin-dashboard" className="back-btn">
            <FaArrowLeft />
            Back to Dashboard
          </Link>
          <div className="admin-title">
            <h1>Add New Student</h1>
            <p>Create a new student account in the system</p>
          </div>
        </div>
      </div>

      <div className="admin-content">
        <div className="form-container">
          <form onSubmit={handleSubmit} className="student-form">
            {/* Personal Information */}
            <div className="form-section">
              <h3>
                <FaUser />
                Personal Information
              </h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter first name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="student@example.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="dateOfBirth">Date of Birth *</label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="grade">Grade Level *</label>
                  <select
                    id="grade"
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Grade</option>
                    {gradeOptions.map(grade => (
                      <option key={grade} value={grade}>{grade}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Parent/Guardian Information */}
            <div className="form-section">
              <h3>
                <FaUserPlus />
                Parent/Guardian Information
              </h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="parentName">Parent/Guardian Name *</label>
                  <input
                    type="text"
                    id="parentName"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter parent/guardian name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="parentEmail">Parent Email *</label>
                  <input
                    type="email"
                    id="parentEmail"
                    name="parentEmail"
                    value={formData.parentEmail}
                    onChange={handleInputChange}
                    required
                    placeholder="parent@example.com"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="parentPhone">Parent Phone *</label>
                  <input
                    type="tel"
                    id="parentPhone"
                    name="parentPhone"
                    value={formData.parentPhone}
                    onChange={handleInputChange}
                    required
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="emergencyContact">Emergency Contact</label>
                  <input
                    type="tel"
                    id="emergencyContact"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    placeholder="Emergency contact number"
                  />
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="form-section">
              <h3>
                <FaGraduationCap />
                Academic Information
              </h3>
              <div className="form-group">
                <label>Subjects *</label>
                <div className="subjects-grid">
                  {subjectOptions.map(subject => (
                    <label key={subject} className="subject-checkbox">
                      <input
                        type="checkbox"
                        checked={formData.subjects.includes(subject)}
                        onChange={() => handleSubjectChange(subject)}
                      />
                      <span className="checkmark"></span>
                      {subject}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="previousSchool">Previous School</label>
                <input
                  type="text"
                  id="previousSchool"
                  name="previousSchool"
                  value={formData.previousSchool}
                  onChange={handleInputChange}
                  placeholder="Name of previous school"
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="form-section">
              <h3>Additional Information</h3>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Full address"
                />
              </div>

              <div className="form-group">
                <label htmlFor="medicalInfo">Medical Information</label>
                <textarea
                  id="medicalInfo"
                  name="medicalInfo"
                  value={formData.medicalInfo}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Any medical conditions or allergies"
                />
              </div>

              <div className="form-group">
                <label htmlFor="notes">Additional Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Any additional information"
                />
              </div>
            </div>

            {/* Submit Section */}
            <div className="form-actions">
              {submitStatus === 'success' && (
                <div className="success-message">
                  <FaCheck />
                  Student added successfully! A temporary password has been generated.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="error-message">
                  <FaExclamationTriangle />
                  Error adding student. Please try again.
                </div>
              )}

              <div className="form-buttons">
                <Link to="/admin-dashboard" className="btn-secondary">
                  <FaTimes />
                  Cancel
                </Link>
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      Adding Student...
                    </>
                  ) : (
                    <>
                      <FaSave />
                      Add Student
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAddStudentPage;
