import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, FaChalkboardTeacher, FaEnvelope, FaPhone, FaUser, 
  FaGraduationCap, FaCalendarAlt, FaStar, FaUsers, FaAward,
  FaEdit, FaTrash, FaCheckCircle, FaTimesCircle
} from 'react-icons/fa';

const TeacherViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTeacher();
  }, [id]);

  const fetchTeacher = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/teachers/${id}`);
      if (response.ok) {
        const data = await response.json();
        setTeacher(data);
      } else {
        setError('Teacher not found');
      }
    } catch (error) {
      console.error('Error fetching teacher:', error);
      setError('Failed to load teacher details');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/admin/teachers/edit/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/teachers/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          navigate('/admin-dashboard');
        } else {
          alert('Failed to delete teacher');
        }
      } catch (error) {
        console.error('Error deleting teacher:', error);
        alert('Failed to delete teacher');
      }
    }
  };

  if (loading) {
    return (
      <div className="teacher-view-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading teacher details...</p>
        </div>
      </div>
    );
  }

  if (error || !teacher) {
    return (
      <div className="teacher-view-page">
        <div className="error-container">
          <FaTimesCircle />
          <h3>Error</h3>
          <p>{error || 'Teacher not found'}</p>
          <button className="btn-primary" onClick={() => navigate('/admin-dashboard')}>
            <FaArrowLeft />
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="teacher-view-page">
      <div className="page-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate('/admin-dashboard')}>
            <FaArrowLeft />
            Back to Teachers
          </button>
          <h1>Teacher Profile</h1>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={handleEdit}>
            <FaEdit />
            Edit Teacher
          </button>
          <button className="btn-danger" onClick={handleDelete}>
            <FaTrash />
            Delete Teacher
          </button>
        </div>
      </div>

      <div className="teacher-profile">
        <div className="profile-header">
          <div className="teacher-avatar-large">
            <FaChalkboardTeacher />
          </div>
          <div className="teacher-info">
            <h1>{teacher.firstName} {teacher.lastName}</h1>
            <p className="teacher-title">{teacher.title}</p>
            <div className="teacher-status">
              <span className={`status-badge ${teacher.status || 'active'}`}>
                {teacher.status === 'active' ? <FaCheckCircle /> : <FaTimesCircle />}
                {teacher.status || 'Active'}
              </span>
            </div>
          </div>
        </div>

        <div className="profile-content">

          <div className="info-section">
            <h3>Professional Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <FaGraduationCap />
                <div>
                  <label>Education</label>
                  <p>{teacher.education || 'Not provided'}</p>
                </div>
              </div>
              <div className="info-item">
                <FaCalendarAlt />
                <div>
                  <label>Experience</label>
                  <p>{teacher.experience || 'Not provided'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h3>Subjects & Specialties</h3>
            <div className="subjects-list">
              {teacher.subjects && teacher.subjects.map((subject, index) => (
                <span key={index} className="subject-tag">{subject}</span>
              ))}
            </div>
          </div>

          {teacher.bio && (
            <div className="info-section">
              <h3>Biography</h3>
              <p className="bio-text">{teacher.bio}</p>
            </div>
          )}

          <div className="info-section">
            <h3>Performance Metrics</h3>
            <div className="metrics-grid">
              <div className="metric-card">
                <FaStar />
                <div>
                  <label>Rating</label>
                  <p>{teacher.rating || 'N/A'}</p>
                </div>
              </div>
              <div className="metric-card">
                <FaUsers />
                <div>
                  <label>Students Taught</label>
                  <p>{teacher.studentsTaught || 0}</p>
                </div>
              </div>
            </div>
          </div>

          {teacher.achievements && teacher.achievements.length > 0 && (
            <div className="info-section">
              <h3>Achievements</h3>
              <div className="achievements-list">
                {teacher.achievements.map((achievement, index) => (
                  <div key={index} className="achievement-item">
                    <FaAward />
                    <span>{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherViewPage;
