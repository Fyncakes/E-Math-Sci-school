import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, FaSave, FaTimes, FaBook, FaChalkboardTeacher, 
  FaCalendarAlt, FaUsers, FaClock, FaFileAlt, FaVideo, FaImage,
  FaUpload, FaPlus, FaMinus, FaCheckCircle
} from 'react-icons/fa';

const AdminCreateCoursePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    grade: '',
    duration: '',
    instructor: '',
    maxStudents: '',
    startDate: '',
    endDate: '',
    schedule: '',
    prerequisites: '',
    objectives: '',
    materials: [],
    assignments: [],
    isActive: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAddMaterial = () => {
    setFormData({
      ...formData,
      materials: [...formData.materials, { name: '', type: 'document', url: '' }]
    });
  };

  const handleRemoveMaterial = (index) => {
    setFormData({
      ...formData,
      materials: formData.materials.filter((_, i) => i !== index)
    });
  };

  const handleMaterialChange = (index, field, value) => {
    const updatedMaterials = formData.materials.map((material, i) => 
      i === index ? { ...material, [field]: value } : material
    );
    setFormData({ ...formData, materials: updatedMaterials });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess('Course created successfully!');
      setTimeout(() => {
        navigate('/admin-dashboard');
      }, 2000);
    } catch (error) {
      setError('Failed to create course. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-create-course-page">
      <div className="page-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate('/admin-dashboard')}>
            <FaArrowLeft />
            Back to Dashboard
          </button>
          <h1>Create New Course</h1>
        </div>
      </div>

      <div className="course-form-container">
        <form onSubmit={handleSubmit} className="course-form">
          <div className="form-section">
            <h3>Course Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">Course Title *</label>
                <div className="input-group">
                  <FaBook />
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Advanced Mathematics"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <div className="input-group">
                  <FaChalkboardTeacher />
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Subject</option>
                    <option value="mathematics">Mathematics</option>
                    <option value="physics">Physics</option>
                    <option value="chemistry">Chemistry</option>
                    <option value="biology">Biology</option>
                    <option value="computer-science">Computer Science</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Course Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Describe the course content, learning outcomes, and what students will achieve..."
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="grade">Grade Level *</label>
                <div className="input-group">
                  <FaUsers />
                  <select
                    id="grade"
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Grade</option>
                    <option value="grade-9">Grade 9</option>
                    <option value="grade-10">Grade 10</option>
                    <option value="grade-11">Grade 11</option>
                    <option value="grade-12">Grade 12</option>
                    <option value="university">University Level</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="duration">Duration (weeks) *</label>
                <div className="input-group">
                  <FaClock />
                  <input
                    type="number"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="12"
                    min="1"
                    max="52"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Course Details</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="instructor">Instructor *</label>
                <div className="input-group">
                  <FaChalkboardTeacher />
                  <input
                    type="text"
                    id="instructor"
                    name="instructor"
                    value={formData.instructor}
                    onChange={handleChange}
                    placeholder="Teacher's name"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="maxStudents">Maximum Students *</label>
                <div className="input-group">
                  <FaUsers />
                  <input
                    type="number"
                    id="maxStudents"
                    name="maxStudents"
                    value={formData.maxStudents}
                    onChange={handleChange}
                    placeholder="30"
                    min="1"
                    max="100"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="startDate">Start Date *</label>
                <div className="input-group">
                  <FaCalendarAlt />
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="endDate">End Date *</label>
                <div className="input-group">
                  <FaCalendarAlt />
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="schedule">Schedule *</label>
              <div className="input-group">
                <FaClock />
                <input
                  type="text"
                  id="schedule"
                  name="schedule"
                  value={formData.schedule}
                  onChange={handleChange}
                  placeholder="e.g., Monday, Wednesday, Friday 2:00 PM - 3:30 PM"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Course Materials</h3>
            <div className="materials-section">
              {formData.materials.map((material, index) => (
                <div key={index} className="material-item">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Material Name</label>
                      <input
                        type="text"
                        value={material.name}
                        onChange={(e) => handleMaterialChange(index, 'name', e.target.value)}
                        placeholder="e.g., Chapter 1: Introduction"
                      />
                    </div>
                    <div className="form-group">
                      <label>Type</label>
                      <select
                        value={material.type}
                        onChange={(e) => handleMaterialChange(index, 'type', e.target.value)}
                      >
                        <option value="document">Document</option>
                        <option value="video">Video</option>
                        <option value="image">Image</option>
                        <option value="link">Link</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>URL/Path</label>
                      <input
                        type="text"
                        value={material.url}
                        onChange={(e) => handleMaterialChange(index, 'url', e.target.value)}
                        placeholder="https://example.com/file.pdf"
                      />
                    </div>
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => handleRemoveMaterial(index)}
                    >
                      <FaMinus />
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="add-material-btn"
                onClick={handleAddMaterial}
              >
                <FaPlus />
                Add Material
              </button>
            </div>
          </div>

          <div className="form-section">
            <h3>Additional Information</h3>
            <div className="form-group">
              <label htmlFor="prerequisites">Prerequisites</label>
              <textarea
                id="prerequisites"
                name="prerequisites"
                value={formData.prerequisites}
                onChange={handleChange}
                rows="3"
                placeholder="List any prerequisites or recommended prior knowledge..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="objectives">Learning Objectives</label>
              <textarea
                id="objectives"
                name="objectives"
                value={formData.objectives}
                onChange={handleChange}
                rows="4"
                placeholder="List the key learning objectives for this course..."
              />
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                Course is active and available for enrollment
              </label>
            </div>
          </div>

          {error && (
            <div className="error-message">
              <FaTimes />
              {error}
            </div>
          )}

          {success && (
            <div className="success-message">
              <FaCheckCircle />
              {success}
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => navigate('/admin-dashboard')}>
              <FaTimes />
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              <FaSave />
              {loading ? 'Creating Course...' : 'Create Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateCoursePage;
