import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, FaSave, FaTimes, FaChalkboardTeacher, FaUser, 
  FaEnvelope, FaPhone, FaGraduationCap, FaCalendarAlt, FaBook
} from 'react-icons/fa';

const TeacherEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    title: '',
    subjects: [],
    experience: '',
    education: '',
    bio: '',
    status: 'active'
  });

  useEffect(() => {
    fetchTeacher();
  }, [id]);

  const fetchTeacher = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/teachers/${id}`);
      if (response.ok) {
        const data = await response.json();
        setFormData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          phone: data.phone || '',
          title: data.title || '',
          subjects: data.subjects || [],
          experience: data.experience || '',
          education: data.education || '',
          bio: data.bio || '',
          status: data.status || 'active'
        });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubjectsChange = (e) => {
    const subjects = e.target.value.split(',').map(s => s.trim()).filter(s => s);
    setFormData(prev => ({
      ...prev,
      subjects
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:5000/api/teachers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        navigate('/admin-dashboard');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to update teacher');
      }
    } catch (error) {
      console.error('Error updating teacher:', error);
      setError('Failed to update teacher');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="teacher-edit-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading teacher details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="teacher-edit-page">
        <div className="error-container">
          <FaTimes />
          <h3>Error</h3>
          <p>{error}</p>
          <button className="btn-primary" onClick={() => navigate('/admin-dashboard')}>
            <FaArrowLeft />
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="teacher-edit-page">
      <div className="page-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate('/admin-dashboard')}>
            <FaArrowLeft />
            Back to Teachers
          </button>
          <h1>Edit Teacher</h1>
        </div>
      </div>

      <div className="edit-form-container">
        <form onSubmit={handleSubmit} className="teacher-edit-form">
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <div className="input-group">
                  <FaUser />
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <div className="input-group">
                  <FaUser />
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <div className="input-group">
                  <FaEnvelope />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <div className="input-group">
                  <FaPhone />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Professional Information</h3>
            <div className="form-group">
              <label htmlFor="title">Job Title</label>
              <div className="input-group">
                <FaChalkboardTeacher />
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Senior Mathematics Teacher"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subjects">Subjects (comma-separated)</label>
              <div className="input-group">
                <FaBook />
                <input
                  type="text"
                  id="subjects"
                  name="subjects"
                  value={formData.subjects.join(', ')}
                  onChange={handleSubjectsChange}
                  placeholder="e.g., Mathematics, Physics, Chemistry"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="experience">Experience</label>
                <div className="input-group">
                  <FaCalendarAlt />
                  <input
                    type="text"
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="e.g., 5+ years"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="education">Education</label>
                <div className="input-group">
                  <FaGraduationCap />
                  <input
                    type="text"
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    placeholder="e.g., MSc Mathematics, BSc Physics"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="bio">Biography</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows="4"
                placeholder="Tell us about the teacher's background and expertise..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="error-message">
              <FaTimes />
              {error}
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => navigate('/admin-dashboard')}>
              <FaTimes />
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={saving}>
              <FaSave />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherEditPage;
