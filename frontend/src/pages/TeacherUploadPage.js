import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUpload, FaFileAlt, FaVideo, FaImage, FaFilePdf, FaTrash, FaEdit, 
  FaSave, FaTimes, FaPlus, FaUsers, FaCalendar, FaClock, FaGraduationCap,
  FaArrowLeft, FaCheckCircle, FaExclamationTriangle, FaBook, FaAward
} from 'react-icons/fa';

const TeacherUploadPage = () => {
  const [activeTab, setActiveTab] = useState('classes');
  const [uploadedItems, setUploadedItems] = useState({
    classes: [
      { id: 1, title: 'Mathematics - Algebra Basics', subject: 'Mathematics', grade: 'Grade 8', date: '2024-01-15', students: 25, status: 'active' },
      { id: 2, title: 'Science - Physics Fundamentals', subject: 'Science', grade: 'Grade 9', date: '2024-01-16', students: 30, status: 'active' }
    ],
    assignments: [
      { id: 1, title: 'Algebra Practice Problems', subject: 'Mathematics', grade: 'Grade 8', dueDate: '2024-01-20', submissions: 20, totalStudents: 25, status: 'active' },
      { id: 2, title: 'Physics Lab Report', subject: 'Science', grade: 'Grade 9', dueDate: '2024-01-22', submissions: 28, totalStudents: 30, status: 'active' }
    ],
    grades: [
      { id: 1, student: 'John Smith', subject: 'Mathematics', assignment: 'Algebra Test', grade: 'A+', score: 95, date: '2024-01-18' },
      { id: 2, student: 'Sarah Johnson', subject: 'Science', assignment: 'Physics Lab', grade: 'A', score: 88, date: '2024-01-17' }
    ],
    resources: [
      { id: 1, title: 'Algebra Formula Sheet', type: 'PDF', subject: 'Mathematics', downloads: 45, date: '2024-01-10' },
      { id: 2, title: 'Physics Video Tutorial', type: 'Video', subject: 'Science', views: 120, date: '2024-01-12' }
    ]
  });

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    grade: '',
    description: '',
    file: null
  });

  const handleUpload = (type) => {
    setShowUploadModal(true);
    setFormData({ title: '', subject: '', grade: '', description: '', file: null });
  };

  const handleEdit = (item, type) => {
    setEditingItem({ ...item, type });
    setFormData({
      title: item.title,
      subject: item.subject,
      grade: item.grade,
      description: item.description || '',
      file: null
    });
    setShowUploadModal(true);
  };

  const handleDelete = (id, type) => {
    setUploadedItems(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item.id !== id)
    }));
  };

  const handleSave = () => {
    if (editingItem) {
      // Update existing item
      setUploadedItems(prev => ({
        ...prev,
        [editingItem.type]: prev[editingItem.type].map(item => 
          item.id === editingItem.id ? { ...item, ...formData } : item
        )
      }));
    } else {
      // Add new item
      const newItem = {
        id: Date.now(),
        ...formData,
        date: new Date().toISOString().split('T')[0],
        status: 'active'
      };
      setUploadedItems(prev => ({
        ...prev,
        [activeTab]: [...prev[activeTab], newItem]
      }));
    }
    setShowUploadModal(false);
    setEditingItem(null);
    setFormData({ title: '', subject: '', grade: '', description: '', file: null });
  };

  const getTabIcon = (tab) => {
    switch (tab) {
      case 'classes': return <FaUsers />;
      case 'assignments': return <FaFileAlt />;
      case 'grades': return <FaAward />;
      case 'resources': return <FaBook />;
      default: return <FaUpload />;
    }
  };

  const getItemIcon = (type) => {
    switch (type) {
      case 'PDF': return <FaFilePdf />;
      case 'Video': return <FaVideo />;
      case 'Image': return <FaImage />;
      default: return <FaFileAlt />;
    }
  };

  return (
    <div className="teacher-upload-page">
      {/* Header */}
      <div className="teacher-header">
        <div className="teacher-header-content">
          <div className="teacher-brand">
            <div className="teacher-logo">
              <FaGraduationCap />
            </div>
            <div className="teacher-title">
              <h1>G'SON INTERNATIONAL ACADEMY</h1>
              <span>Teacher Portal - Upload & Manage</span>
            </div>
          </div>
          
          <div className="teacher-header-actions">
            <Link to="/teacher-dashboard" className="back-btn">
              <FaArrowLeft />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="upload-nav">
        <div className="container">
          <div className="upload-nav-tabs">
            {['classes', 'assignments', 'grades', 'resources'].map(tab => (
              <button
                key={tab}
                className={`upload-nav-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {getTabIcon(tab)}
                <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="upload-content">
        <div className="container">
          <div className="upload-header">
            <div className="upload-title">
              <h2>Manage {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
              <p>Upload, edit, and manage your educational content</p>
            </div>
            <button className="upload-btn" onClick={() => handleUpload(activeTab)}>
              <FaPlus />
              Add New {activeTab.slice(0, -1)}
            </button>
          </div>

          {/* Content Grid */}
          <div className="upload-grid">
            {uploadedItems[activeTab].map(item => (
              <div key={item.id} className="upload-card">
                <div className="upload-card-header">
                  <div className="upload-card-icon">
                    {getItemIcon(item.type || 'File')}
                  </div>
                  <div className="upload-card-actions">
                    <button 
                      className="edit-btn"
                      onClick={() => handleEdit(item, activeTab)}
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(item.id, activeTab)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                
                <div className="upload-card-content">
                  <h3>{item.title}</h3>
                  <div className="upload-card-meta">
                    <span className="subject">{item.subject}</span>
                    <span className="grade">{item.grade}</span>
                  </div>
                  
                  {activeTab === 'classes' && (
                    <div className="upload-card-stats">
                      <div className="stat">
                        <FaUsers />
                        <span>{item.students} students</span>
                      </div>
                      <div className="stat">
                        <FaCalendar />
                        <span>{item.date}</span>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'assignments' && (
                    <div className="upload-card-stats">
                      <div className="stat">
                        <FaClock />
                        <span>Due: {item.dueDate}</span>
                      </div>
                      <div className="stat">
                        <FaCheckCircle />
                        <span>{item.submissions}/{item.totalStudents} submitted</span>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'grades' && (
                    <div className="upload-card-stats">
                      <div className="stat">
                        <FaAward />
                        <span>Grade: {item.grade}</span>
                      </div>
                      <div className="stat">
                        <span>Score: {item.score}%</span>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'resources' && (
                    <div className="upload-card-stats">
                      <div className="stat">
                        {item.downloads ? <span>{item.downloads} downloads</span> : <span>{item.views} views</span>}
                      </div>
                      <div className="stat">
                        <span>{item.date}</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="upload-card-status">
                  <span className={`status ${item.status}`}>
                    {item.status === 'active' ? <FaCheckCircle /> : <FaExclamationTriangle />}
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="upload-modal">
          <div className="upload-modal-content">
            <div className="upload-modal-header">
              <h3>{editingItem ? 'Edit' : 'Upload'} {activeTab.slice(0, -1)}</h3>
              <button 
                className="close-btn"
                onClick={() => setShowUploadModal(false)}
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="upload-modal-body">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter title"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  >
                    <option value="">Select Subject</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="English">English</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Grade</label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({...formData, grade: e.target.value})}
                  >
                    <option value="">Select Grade</option>
                    <option value="Grade 6">Grade 6</option>
                    <option value="Grade 7">Grade 7</option>
                    <option value="Grade 8">Grade 8</option>
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="Grade 12">Grade 12</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter description"
                  rows="3"
                />
              </div>
              
              <div className="form-group">
                <label>Upload File</label>
                <div className="file-upload">
                  <input
                    type="file"
                    onChange={(e) => setFormData({...formData, file: e.target.files[0]})}
                    accept=".pdf,.doc,.docx,.mp4,.avi,.mov,.jpg,.jpeg,.png"
                  />
                  <div className="file-upload-area">
                    <FaUpload />
                    <span>Click to upload or drag and drop</span>
                    <p>Supports: PDF, DOC, MP4, JPG, PNG</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="upload-modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setShowUploadModal(false)}
              >
                Cancel
              </button>
              <button 
                className="save-btn"
                onClick={handleSave}
              >
                <FaSave />
                {editingItem ? 'Update' : 'Upload'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherUploadPage;
