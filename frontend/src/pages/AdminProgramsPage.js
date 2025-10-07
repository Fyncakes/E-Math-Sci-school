import React, { useState } from 'react';
import { 
  FaUpload, FaFilePdf, FaFileWord, FaFilePowerpoint, FaFileExcel, 
  FaTrash, FaEdit, FaEye, FaDownload, FaPlus, FaSearch, FaFilter,
  FaCheckCircle, FaTimes, FaClock, FaUser, FaCalendar, FaTag
} from 'react-icons/fa';

const AdminProgramsPage = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [programs, setPrograms] = useState([
    {
      id: 1,
      title: 'Elementary Math Program',
      description: 'Comprehensive math curriculum for grades 1-5',
      category: 'Mathematics',
      grade: 'Elementary',
      status: 'active',
      uploadDate: '2024-01-15',
      fileSize: '2.3 MB',
      fileType: 'PDF',
      downloads: 45,
      author: 'Dr. Sarah Johnson'
    },
    {
      id: 2,
      title: 'Science Lab Manual',
      description: 'Hands-on experiments for middle school students',
      category: 'Science',
      grade: 'Middle School',
      status: 'pending',
      uploadDate: '2024-01-20',
      fileSize: '5.1 MB',
      fileType: 'PDF',
      downloads: 23,
      author: 'Prof. Michael Chen'
    },
    {
      id: 3,
      title: 'STEM Project Guidelines',
      description: 'Step-by-step guide for STEM projects',
      category: 'STEM',
      grade: 'High School',
      status: 'active',
      uploadDate: '2024-01-18',
      fileSize: '3.7 MB',
      fileType: 'Word',
      downloads: 67,
      author: 'Dr. Emily Davis'
    }
  ]);

  const [uploadData, setUploadData] = useState({
    title: '',
    description: '',
    category: '',
    grade: '',
    file: null
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setUploadData({ ...uploadData, file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newProgram = {
      id: programs.length + 1,
      title: uploadData.title,
      description: uploadData.description,
      category: uploadData.category,
      grade: uploadData.grade,
      status: 'pending',
      uploadDate: new Date().toISOString().split('T')[0],
      fileSize: '2.1 MB',
      fileType: 'PDF',
      downloads: 0,
      author: 'Admin User'
    };
    
    setPrograms([...programs, newProgram]);
    setUploadData({ title: '', description: '', category: '', grade: '', file: null });
    setIsUploading(false);
  };

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'PDF': return <FaFilePdf />;
      case 'Word': return <FaFileWord />;
      case 'PowerPoint': return <FaFilePowerpoint />;
      case 'Excel': return <FaFileExcel />;
      default: return <FaFilePdf />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'pending': return 'warning';
      case 'inactive': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <div className="admin-programs-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Program Management</h1>
          <p>Upload and manage educational programs and resources</p>
        </div>
        <div className="header-actions">
          <button 
            className={`tab-button ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveTab('upload')}
          >
            <FaUpload />
            Upload New Program
          </button>
          <button 
            className={`tab-button ${activeTab === 'manage' ? 'active' : ''}`}
            onClick={() => setActiveTab('manage')}
          >
            <FaEdit />
            Manage Programs
          </button>
        </div>
      </div>

      <div className="page-content">
        {activeTab === 'upload' && (
          <div className="upload-section">
            <div className="upload-card">
              <div className="upload-header">
                <h2>Upload New Program</h2>
                <p>Add a new educational program or resource to the system</p>
              </div>

              <form onSubmit={handleSubmit} className="upload-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="title">
                      <FaTag />
                      Program Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={uploadData.title}
                      onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                      placeholder="Enter program title"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="category">
                      <FaTag />
                      Category *
                    </label>
                    <select
                      id="category"
                      value={uploadData.category}
                      onChange={(e) => setUploadData({ ...uploadData, category: e.target.value })}
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Science">Science</option>
                      <option value="STEM">STEM</option>
                      <option value="English">English</option>
                      <option value="History">History</option>
                      <option value="Art">Art</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="grade">
                      <FaUser />
                      Grade Level *
                    </label>
                    <select
                      id="grade"
                      value={uploadData.grade}
                      onChange={(e) => setUploadData({ ...uploadData, grade: e.target.value })}
                      required
                    >
                      <option value="">Select Grade</option>
                      <option value="Elementary">Elementary (K-5)</option>
                      <option value="Middle School">Middle School (6-8)</option>
                      <option value="High School">High School (9-12)</option>
                      <option value="All Levels">All Levels</option>
                    </select>
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="description">
                      <FaEdit />
                      Description *
                    </label>
                    <textarea
                      id="description"
                      value={uploadData.description}
                      onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                      placeholder="Enter program description"
                      rows="4"
                      required
                    />
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="file">
                      <FaUpload />
                      Upload File *
                    </label>
                    <div className="file-upload-area">
                      <input
                        type="file"
                        id="file"
                        onChange={handleFileUpload}
                        accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                        required
                      />
                      <div className="file-upload-content">
                        <FaUpload />
                        <p>Click to upload or drag and drop</p>
                        <span>PDF, DOC, PPT, XLS files (Max 10MB)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn-secondary">
                    <FaTimes />
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn-primary"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <div className="spinner"></div>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <FaUpload />
                        Upload Program
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'manage' && (
          <div className="manage-section">
            <div className="section-header">
              <div className="search-filters">
                <div className="search-box">
                  <FaSearch />
                  <input type="text" placeholder="Search programs..." />
                </div>
                <select className="filter-select">
                  <option value="">All Categories</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="STEM">STEM</option>
                </select>
                <select className="filter-select">
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <button className="btn-primary">
                <FaPlus />
                Add New Program
              </button>
            </div>

            <div className="programs-grid">
              {programs.map(program => (
                <div key={program.id} className="program-card">
                  <div className="program-header">
                    <div className="program-icon">
                      {getFileIcon(program.fileType)}
                    </div>
                    <div className="program-status">
                      <span className={`status-badge ${getStatusColor(program.status)}`}>
                        {program.status}
                      </span>
                    </div>
                  </div>

                  <div className="program-content">
                    <h3>{program.title}</h3>
                    <p>{program.description}</p>
                    
                    <div className="program-meta">
                      <div className="meta-item">
                        <FaTag />
                        <span>{program.category}</span>
                      </div>
                      <div className="meta-item">
                        <FaUser />
                        <span>{program.grade}</span>
                      </div>
                      <div className="meta-item">
                        <FaCalendar />
                        <span>{program.uploadDate}</span>
                      </div>
                    </div>

                    <div className="program-stats">
                      <div className="stat">
                        <span className="stat-value">{program.downloads}</span>
                        <span className="stat-label">Downloads</span>
                      </div>
                      <div className="stat">
                        <span className="stat-value">{program.fileSize}</span>
                        <span className="stat-label">Size</span>
                      </div>
                    </div>
                  </div>

                  <div className="program-actions">
                    <button className="action-btn view">
                      <FaEye />
                    </button>
                    <button className="action-btn edit">
                      <FaEdit />
                    </button>
                    <button className="action-btn download">
                      <FaDownload />
                    </button>
                    <button className="action-btn delete">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProgramsPage;
