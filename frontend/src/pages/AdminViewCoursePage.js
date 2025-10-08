import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  FaArrowLeft, FaEdit, FaTrash, FaBook, FaChalkboardTeacher, 
  FaCalendarAlt, FaUsers, FaClock, FaFileAlt, FaVideo, FaImage,
  FaCheckCircle, FaTimesCircle, FaDownload, FaExternalLinkAlt
} from 'react-icons/fa';

const AdminViewCoursePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/courses/${id}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setCourse(data.data);
        } else {
          setError('Course not found');
        }
      } else {
        setError('Failed to load course details');
      }
    } catch (error) {
      console.error('Error fetching course:', error);
      setError('Failed to load course details');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      try {
        const response = await fetch(`http://localhost:5000/api/courses/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          navigate('/admin-dashboard');
        } else {
          alert('Failed to delete course');
        }
      } catch (error) {
        console.error('Error deleting course:', error);
        alert('Failed to delete course');
      }
    }
  };

  if (loading) {
    return (
      <div className="admin-view-course-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading course details...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="admin-view-course-page">
        <div className="error-container">
          <FaTimesCircle />
          <h3>Error</h3>
          <p>{error || 'Course not found'}</p>
          <button className="btn-primary" onClick={() => navigate('/admin-dashboard')}>
            <FaArrowLeft />
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-view-course-page">
      <div className="page-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate('/admin-dashboard')}>
            <FaArrowLeft />
            Back to Courses
          </button>
          <h1>Course Details</h1>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => navigate(`/admin/edit-course/${id}`)}>
            <FaEdit />
            Edit Course
          </button>
          <button className="btn-danger" onClick={handleDelete}>
            <FaTrash />
            Delete Course
          </button>
        </div>
      </div>

      <div className="course-details-container">
        <div className="course-info-card">
          <div className="course-header">
            <div className="course-title-section">
              <h2>{course.title}</h2>
              <span className={`status-badge ${course.isActive ? 'active' : 'inactive'}`}>
                {course.isActive ? <FaCheckCircle /> : <FaTimesCircle />}
                {course.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="course-subject-tags">
              <span className="subject-tag">{course.subject}</span>
              <span className="grade-tag">{course.grade}</span>
            </div>
          </div>

          <div className="course-description">
            <h3>Description</h3>
            <p>{course.description}</p>
          </div>

          <div className="course-details-grid">
            <div className="detail-section">
              <h3>Course Information</h3>
              <div className="detail-item">
                <FaChalkboardTeacher />
                <div>
                  <label>Instructor</label>
                  <p>{course.instructor}</p>
                </div>
              </div>
              <div className="detail-item">
                <FaUsers />
                <div>
                  <label>Maximum Students</label>
                  <p>{course.maxStudents} students</p>
                </div>
              </div>
              <div className="detail-item">
                <FaClock />
                <div>
                  <label>Duration</label>
                  <p>{course.duration} weeks</p>
                </div>
              </div>
              <div className="detail-item">
                <FaCalendarAlt />
                <div>
                  <label>Schedule</label>
                  <p>{course.schedule}</p>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3>Timeline</h3>
              <div className="detail-item">
                <FaCalendarAlt />
                <div>
                  <label>Start Date</label>
                  <p>{new Date(course.startDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="detail-item">
                <FaCalendarAlt />
                <div>
                  <label>End Date</label>
                  <p>{new Date(course.endDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          {course.prerequisites && (
            <div className="course-section">
              <h3>Prerequisites</h3>
              <p>{course.prerequisites}</p>
            </div>
          )}

          {course.objectives && (
            <div className="course-section">
              <h3>Learning Objectives</h3>
              <p>{course.objectives}</p>
            </div>
          )}

          {course.materials && course.materials.length > 0 && (
            <div className="course-section">
              <h3>Course Materials</h3>
              <div className="materials-list">
                {course.materials.map((material, index) => (
                  <div key={index} className="material-item">
                    <div className="material-icon">
                      {material.type === 'video' && <FaVideo />}
                      {material.type === 'document' && <FaFileAlt />}
                      {material.type === 'image' && <FaImage />}
                      {material.type === 'link' && <FaExternalLinkAlt />}
                    </div>
                    <div className="material-info">
                      <h4>{material.name}</h4>
                      <p className="material-type">{material.type}</p>
                      {material.url && (
                        <a href={material.url} target="_blank" rel="noopener noreferrer" className="material-link">
                          <FaExternalLinkAlt />
                          View Resource
                        </a>
                      )}
                    </div>
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

export default AdminViewCoursePage;
