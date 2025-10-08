import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaCheck, FaTimes, FaClock, FaUserCheck, FaEnvelope, FaPhone,
  FaCalendar, FaFileAlt, FaGraduationCap, FaAward, FaDownload,
  FaEdit, FaPlus, FaRedo, FaExclamationTriangle, FaInfoCircle
} from 'react-icons/fa';

const StudentAdmissionStatusPage = () => {
  const [admission, setAdmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAdmissionStatus();
  }, []);

  const fetchAdmissionStatus = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/admissions/student/status', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAdmission(data);
      } else if (response.status === 404) {
        setError('No admission application found');
      } else {
        setError('Error fetching admission status');
      }
    } catch (error) {
      setError('Error fetching admission status');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <FaCheck className="status-icon approved" />;
      case 'rejected': return <FaTimes className="status-icon rejected" />;
      case 'pending': return <FaClock className="status-icon pending" />;
      case 'waitlisted': return <FaUserCheck className="status-icon waitlisted" />;
      default: return <FaClock className="status-icon pending" />;
    }
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case 'approved':
        return {
          title: 'Congratulations! Your application has been approved.',
          message: 'Welcome to G\'SON INTERNATIONAL ACADEMY! You can now access your student dashboard.',
          color: 'success'
        };
      case 'rejected':
        return {
          title: 'Application not approved',
          message: 'Unfortunately, your application was not approved at this time. Please contact us for more information.',
          color: 'error'
        };
      case 'pending':
        return {
          title: 'Application under review',
          message: 'Your application is currently being reviewed by our admissions team. We will notify you once a decision is made.',
          color: 'info'
        };
      case 'waitlisted':
        return {
          title: 'Application waitlisted',
          message: 'Your application has been waitlisted. We will contact you if a spot becomes available.',
          color: 'warning'
        };
      default:
        return {
          title: 'Application status unknown',
          message: 'Please contact us for more information about your application.',
          color: 'info'
        };
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="student-admission-status-page">
        <div className="loading-section">
          <div className="spinner"></div>
          <p>Loading your admission status...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="student-admission-status-page">
        <div className="error-section">
          <FaExclamationTriangle />
          <h2>No Application Found</h2>
          <p>You haven't submitted an admission application yet.</p>
          <Link to="/register" className="btn-primary">
            <FaPlus /> Apply Now
          </Link>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusMessage(admission.status);

  return (
    <div className="student-admission-status-page">
      <div className="page-header">
        <div className="header-content">
          <h1><FaGraduationCap /> Admission Status</h1>
          <p>Track your application progress</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={fetchAdmissionStatus}>
            <FaRedo /> Refresh
          </button>
        </div>
      </div>

      <div className="page-content">
        {/* Status Card */}
        <div className={`status-card ${statusInfo.color}`}>
          <div className="status-header">
            {getStatusIcon(admission.status)}
            <div className="status-info">
              <h2>{statusInfo.title}</h2>
              <p>{statusInfo.message}</p>
            </div>
          </div>
          
          {admission.status === 'approved' && (
            <div className="status-actions">
              <Link to="/dashboard" className="btn-primary">
                <FaGraduationCap /> Go to Dashboard
              </Link>
              <button className="btn-secondary">
                <FaDownload /> Download Acceptance Letter
              </button>
            </div>
          )}
        </div>

        {/* Application Details */}
        <div className="application-details">
          <div className="details-header">
            <h3>Application Details</h3>
            <span className="application-id">ID: {admission._id.slice(-8)}</span>
          </div>

          <div className="details-grid">
            <div className="detail-section">
              <h4>Personal Information</h4>
              <div className="detail-items">
                <div className="detail-item">
                  <label>Name:</label>
                  <span>{admission.firstName} {admission.lastName}</span>
                </div>
                <div className="detail-item">
                  <label>Email:</label>
                  <span>{admission.email}</span>
                </div>
                <div className="detail-item">
                  <label>Phone:</label>
                  <span>{admission.phone}</span>
                </div>
                <div className="detail-item">
                  <label>Grade:</label>
                  <span>{admission.grade}</span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h4>Academic Information</h4>
              <div className="detail-items">
                <div className="detail-item">
                  <label>Subjects:</label>
                  <div className="subjects-list">
                    {admission.subjects.map((subject, index) => (
                      <span key={index} className="subject-tag">{subject}</span>
                    ))}
                  </div>
                </div>
                <div className="detail-item">
                  <label>Previous School:</label>
                  <span>{admission.previousSchool || 'Not provided'}</span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h4>Parent Information</h4>
              <div className="detail-items">
                <div className="detail-item">
                  <label>Parent Name:</label>
                  <span>{admission.parentName}</span>
                </div>
                <div className="detail-item">
                  <label>Parent Email:</label>
                  <span>{admission.parentEmail}</span>
                </div>
                <div className="detail-item">
                  <label>Parent Phone:</label>
                  <span>{admission.parentPhone}</span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h4>Application Timeline</h4>
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-icon">
                    <FaPlus />
                  </div>
                  <div className="timeline-content">
                    <h5>Application Submitted</h5>
                    <p>{formatDate(admission.applicationDate)}</p>
                  </div>
                </div>
                
                {admission.reviewedAt && (
                  <div className="timeline-item">
                    <div className="timeline-icon">
                      <FaCheck />
                    </div>
                    <div className="timeline-content">
                      <h5>Application Reviewed</h5>
                      <p>{formatDate(admission.reviewedAt)}</p>
                    </div>
                  </div>
                )}

                {admission.interviewScheduled && (
                  <div className="timeline-item">
                    <div className="timeline-icon">
                      <FaCalendar />
                    </div>
                    <div className="timeline-content">
                      <h5>Interview Scheduled</h5>
                      <p>{formatDate(admission.interviewScheduled)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Admin Notes */}
        {admission.adminNotes && (
          <div className="admin-notes">
            <h3>Admin Notes</h3>
            <div className="notes-content">
              <p>{admission.adminNotes}</p>
            </div>
          </div>
        )}

        {/* Interview Information */}
        {admission.interviewScheduled && (
          <div className="interview-info">
            <h3>Interview Information</h3>
            <div className="interview-details">
              <div className="interview-item">
                <FaCalendar />
                <span>Scheduled for: {formatDate(admission.interviewScheduled)}</span>
              </div>
              {admission.interviewNotes && (
                <div className="interview-item">
                  <FaInfoCircle />
                  <span>Notes: {admission.interviewNotes}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="next-steps">
          <h3>Next Steps</h3>
          <div className="steps-content">
            {admission.status === 'pending' && (
              <div className="step-item">
                <FaClock />
                <div>
                  <h4>Application Under Review</h4>
                  <p>Our admissions team is reviewing your application. You will be notified once a decision is made.</p>
                </div>
              </div>
            )}
            
            {admission.status === 'approved' && (
              <div className="step-item">
                <FaCheck />
                <div>
                  <h4>Welcome to G'SON INTERNATIONAL ACADEMY!</h4>
                  <p>Your application has been approved. You can now access your student dashboard and begin your learning journey.</p>
                </div>
              </div>
            )}
            
            {admission.status === 'rejected' && (
              <div className="step-item">
                <FaTimes />
                <div>
                  <h4>Application Not Approved</h4>
                  <p>Unfortunately, your application was not approved. Please contact us for more information or consider applying again in the future.</p>
                </div>
              </div>
            )}
            
            {admission.status === 'waitlisted' && (
              <div className="step-item">
                <FaUserCheck />
                <div>
                  <h4>Application Waitlisted</h4>
                  <p>Your application has been waitlisted. We will contact you if a spot becomes available.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="contact-section">
          <h3>Need Help?</h3>
          <p>If you have any questions about your application, please contact us:</p>
          <div className="contact-info">
            <div className="contact-item">
              <FaEnvelope />
              <span>admissions@gsonschool.edu</span>
            </div>
            <div className="contact-item">
              <FaPhone />
              <span>+254 700 123 456</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAdmissionStatusPage;
