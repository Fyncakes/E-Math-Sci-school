import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  FaArrowLeft, FaSave, FaTimes, FaClipboardList, FaChalkboardTeacher, 
  FaCalendarAlt, FaClock, FaFileAlt, FaUpload, FaPlus, FaMinus, 
  FaCheckCircle, FaBook, FaUsers
} from 'react-icons/fa';

const AdminEditAssignmentPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    course: '',
    subject: '',
    grade: '',
    instructor: '',
    maxPoints: '',
    dueDate: '',
    instructions: '',
    attachments: [],
    rubric: '',
    isActive: true
  });

  useEffect(() => {
    fetchAssignment();
  }, [id]);

  const fetchAssignment = async () => {
    try {
      setFetching(true);
      const response = await fetch(`http://localhost:5000/api/assignments/${id}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setFormData({
            ...data.data,
            dueDate: data.data.dueDate ? data.data.dueDate.split('T')[0] + 'T' + data.data.dueDate.split('T')[1].substring(0, 5) : ''
          });
        }
      }
    } catch (error) {
      console.error('Error fetching assignment:', error);
      setError('Failed to load assignment details');
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAddAttachment = () => {
    setFormData({
      ...formData,
      attachments: [...formData.attachments, { name: '', type: 'document', url: '' }]
    });
  };

  const handleRemoveAttachment = (index) => {
    setFormData({
      ...formData,
      attachments: formData.attachments.filter((_, i) => i !== index)
    });
  };

  const handleAttachmentChange = (index, field, value) => {
    const updatedAttachments = formData.attachments.map((attachment, i) => 
      i === index ? { ...attachment, [field]: value } : attachment
    );
    setFormData({ ...formData, attachments: updatedAttachments });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`http://localhost:5000/api/assignments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccess('Assignment updated successfully!');
        setTimeout(() => {
          navigate('/admin-dashboard');
        }, 2000);
      } else {
        setError('Failed to update assignment. Please try again.');
      }
    } catch (error) {
      setError('Failed to update assignment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="admin-edit-assignment-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading assignment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-edit-assignment-page">
      <div className="page-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate('/admin-dashboard')}>
            <FaArrowLeft />
            Back to Dashboard
          </button>
          <h1>Edit Assignment</h1>
        </div>
      </div>

      <div className="assignment-form-container">
        <form onSubmit={handleSubmit} className="assignment-form">
          <div className="form-section">
            <h3>Assignment Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">Assignment Title *</label>
                <div className="input-group">
                  <FaClipboardList />
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Quadratic Equations Practice"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="course">Course *</label>
                <div className="input-group">
                  <FaBook />
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Course</option>
                    <option value="advanced-math">Advanced Mathematics</option>
                    <option value="physics-101">Physics 101</option>
                    <option value="chemistry-basics">Chemistry Basics</option>
                    <option value="biology-intro">Biology Introduction</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Assignment Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Describe what students need to do for this assignment..."
                required
              />
            </div>

            <div className="form-row">
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
            </div>
          </div>

          <div className="form-section">
            <h3>Assignment Details</h3>
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
                <label htmlFor="maxPoints">Maximum Points *</label>
                <div className="input-group">
                  <FaFileAlt />
                  <input
                    type="number"
                    id="maxPoints"
                    name="maxPoints"
                    value={formData.maxPoints}
                    onChange={handleChange}
                    placeholder="100"
                    min="1"
                    max="1000"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="dueDate">Due Date *</label>
              <div className="input-group">
                <FaCalendarAlt />
                <input
                  type="datetime-local"
                  id="dueDate"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="instructions">Detailed Instructions *</label>
              <textarea
                id="instructions"
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                rows="6"
                placeholder="Provide detailed instructions for completing the assignment. Include any specific requirements, format guidelines, or submission instructions..."
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Assignment Attachments</h3>
            <div className="attachments-section">
              {formData.attachments.map((attachment, index) => (
                <div key={index} className="attachment-item">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Attachment Name</label>
                      <input
                        type="text"
                        value={attachment.name}
                        onChange={(e) => handleAttachmentChange(index, 'name', e.target.value)}
                        placeholder="e.g., Assignment Template"
                      />
                    </div>
                    <div className="form-group">
                      <label>Type</label>
                      <select
                        value={attachment.type}
                        onChange={(e) => handleAttachmentChange(index, 'type', e.target.value)}
                      >
                        <option value="document">Document</option>
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                        <option value="link">Link</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>URL/Path</label>
                      <input
                        type="text"
                        value={attachment.url}
                        onChange={(e) => handleAttachmentChange(index, 'url', e.target.value)}
                        placeholder="https://example.com/file.pdf"
                      />
                    </div>
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => handleRemoveAttachment(index)}
                    >
                      <FaMinus />
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="add-attachment-btn"
                onClick={handleAddAttachment}
              >
                <FaPlus />
                Add Attachment
              </button>
            </div>
          </div>

          <div className="form-section">
            <h3>Grading Information</h3>
            <div className="form-group">
              <label htmlFor="rubric">Grading Rubric</label>
              <textarea
                id="rubric"
                name="rubric"
                value={formData.rubric}
                onChange={handleChange}
                rows="6"
                placeholder="Provide a detailed grading rubric. Include criteria, point values, and expectations for different performance levels..."
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
                Assignment is active and visible to students
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
              {loading ? 'Updating Assignment...' : 'Update Assignment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEditAssignmentPage;
