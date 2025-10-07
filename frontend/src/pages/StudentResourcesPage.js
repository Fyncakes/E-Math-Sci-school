import React, { useState } from 'react';
import { 
  FaBook, FaFilePdf, FaFileWord, FaFilePowerpoint, FaFileExcel, 
  FaVideo, FaImage, FaMusic, FaCode, FaDownload, FaEye, FaSearch,
  FaFilter, FaSort, FaFolder, FaFolderOpen, FaStar, FaBookmark,
  FaShare, FaExternalLinkAlt, FaPlay, FaPause, FaVolumeUp,
  FaCalendarAlt, FaClock, FaUser, FaTag, FaRocket, FaLightbulb,
  FaGraduationCap, FaChalkboardTeacher, FaClipboardList, FaTrophy
} from 'react-icons/fa';

const StudentResourcesPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterSubject, setFilterSubject] = useState('all');
  const [selectedResource, setSelectedResource] = useState(null);

  const resources = [
    {
      id: 1,
      title: 'Algebra Fundamentals Textbook',
      type: 'PDF',
      subject: 'Mathematics',
      grade: 'Grade 8',
      description: 'Comprehensive guide to algebraic concepts and problem-solving techniques',
      fileSize: '15.2 MB',
      uploadDate: '2024-01-10',
      author: 'Dr. Sarah Johnson',
      downloads: 245,
      rating: 4.8,
      tags: ['algebra', 'fundamentals', 'textbook'],
      isBookmarked: true,
      isStarred: true,
      category: 'Textbooks'
    },
    {
      id: 2,
      title: 'Physics Lab Experiments Video',
      type: 'Video',
      subject: 'Science',
      grade: 'Grade 9',
      description: 'Step-by-step video demonstrations of physics lab experiments',
      fileSize: '125.8 MB',
      uploadDate: '2024-01-08',
      author: 'Prof. Michael Chen',
      downloads: 189,
      rating: 4.9,
      tags: ['physics', 'experiments', 'lab', 'video'],
      isBookmarked: false,
      isStarred: true,
      category: 'Videos',
      duration: '45:30'
    },
    {
      id: 3,
      title: 'Chemistry Periodic Table Reference',
      type: 'PDF',
      subject: 'Science',
      grade: 'Grade 10',
      description: 'Interactive periodic table with detailed element information',
      fileSize: '8.7 MB',
      uploadDate: '2024-01-05',
      author: 'Dr. Emily Davis',
      downloads: 312,
      rating: 4.7,
      tags: ['chemistry', 'periodic table', 'reference'],
      isBookmarked: true,
      isStarred: false,
      category: 'References'
    },
    {
      id: 4,
      title: 'English Grammar Rules',
      type: 'Word',
      subject: 'English',
      grade: 'Grade 8',
      description: 'Comprehensive guide to English grammar rules and usage',
      fileSize: '3.2 MB',
      uploadDate: '2024-01-03',
      author: 'Ms. Lisa Wilson',
      downloads: 156,
      rating: 4.6,
      tags: ['grammar', 'english', 'rules'],
      isBookmarked: false,
      isStarred: false,
      category: 'Study Guides'
    },
    {
      id: 5,
      title: 'History Timeline Presentation',
      type: 'PowerPoint',
      subject: 'History',
      grade: 'Grade 9',
      description: 'Interactive timeline of major historical events',
      fileSize: '12.4 MB',
      uploadDate: '2024-01-01',
      author: 'Mr. John Smith',
      downloads: 98,
      rating: 4.5,
      tags: ['history', 'timeline', 'presentation'],
      isBookmarked: true,
      isStarred: false,
      category: 'Presentations'
    },
    {
      id: 6,
      title: 'Math Problem Solver Tool',
      type: 'Excel',
      subject: 'Mathematics',
      grade: 'Grade 10',
      description: 'Interactive spreadsheet for solving various math problems',
      fileSize: '2.1 MB',
      uploadDate: '2023-12-28',
      author: 'Dr. Sarah Johnson',
      downloads: 203,
      rating: 4.8,
      tags: ['math', 'calculator', 'tool', 'excel'],
      isBookmarked: false,
      isStarred: true,
      category: 'Tools'
    }
  ];

  const categories = [
    { name: 'all', label: 'All Resources', icon: FaBook, count: resources.length },
    { name: 'Textbooks', label: 'Textbooks', icon: FaBook, count: resources.filter(r => r.category === 'Textbooks').length },
    { name: 'Videos', label: 'Videos', icon: FaVideo, count: resources.filter(r => r.category === 'Videos').length },
    { name: 'References', label: 'References', icon: FaFilePdf, count: resources.filter(r => r.category === 'References').length },
    { name: 'Study Guides', label: 'Study Guides', icon: FaClipboardList, count: resources.filter(r => r.category === 'Study Guides').length },
    { name: 'Presentations', label: 'Presentations', icon: FaFilePowerpoint, count: resources.filter(r => r.category === 'Presentations').length },
    { name: 'Tools', label: 'Tools', icon: FaCode, count: resources.filter(r => r.category === 'Tools').length }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || resource.type === filterType;
    const matchesSubject = filterSubject === 'all' || resource.subject === filterSubject;
    const matchesCategory = activeTab === 'all' || resource.category === activeTab;
    return matchesSearch && matchesType && matchesSubject && matchesCategory;
  });

  const getFileIcon = (type) => {
    switch (type) {
      case 'PDF': return <FaFilePdf />;
      case 'Word': return <FaFileWord />;
      case 'PowerPoint': return <FaFilePowerpoint />;
      case 'Excel': return <FaFileExcel />;
      case 'Video': return <FaVideo />;
      case 'Image': return <FaImage />;
      case 'Audio': return <FaMusic />;
      default: return <FaFilePdf />;
    }
  };

  const getFileColor = (type) => {
    switch (type) {
      case 'PDF': return '#dc3545';
      case 'Word': return '#007bff';
      case 'PowerPoint': return '#fd7e14';
      case 'Excel': return '#28a745';
      case 'Video': return '#6f42c1';
      case 'Image': return '#e83e8c';
      case 'Audio': return '#20c997';
      default: return '#6c757d';
    }
  };

  return (
    <div className="student-resources-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Learning Resources</h1>
          <p>Access educational materials, textbooks, videos, and study tools</p>
        </div>
        <div className="header-actions">
          <button className="btn-primary">
            <FaRocket />
            Browse Library
          </button>
        </div>
      </div>

      <div className="page-content">
        <div className="filters-section">
          <div className="search-filters">
            <div className="search-box">
              <FaSearch />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Types</option>
              <option value="PDF">PDF</option>
              <option value="Word">Word</option>
              <option value="PowerPoint">PowerPoint</option>
              <option value="Excel">Excel</option>
              <option value="Video">Video</option>
              <option value="Image">Image</option>
            </select>
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Subjects</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
              <option value="History">History</option>
            </select>
          </div>

          <div className="category-navigation">
            {categories.map(category => (
              <button
                key={category.name}
                className={`category-button ${activeTab === category.name ? 'active' : ''}`}
                onClick={() => setActiveTab(category.name)}
              >
                <category.icon />
                <span>{category.label}</span>
                <span className="count">({category.count})</span>
              </button>
            ))}
          </div>
        </div>

        <div className="resources-grid">
          {filteredResources.map(resource => (
            <div key={resource.id} className="resource-card">
              <div className="resource-header">
                <div className="resource-icon" style={{ color: getFileColor(resource.type) }}>
                  {getFileIcon(resource.type)}
                </div>
                <div className="resource-actions">
                  <button className={`action-btn ${resource.isBookmarked ? 'active' : ''}`}>
                    <FaBookmark />
                  </button>
                  <button className={`action-btn ${resource.isStarred ? 'active' : ''}`}>
                    <FaStar />
                  </button>
                </div>
              </div>

              <div className="resource-content">
                <h3>{resource.title}</h3>
                <p className="resource-description">{resource.description}</p>

                <div className="resource-meta">
                  <div className="meta-item">
                    <FaTag />
                    <span>{resource.subject}</span>
                  </div>
                  <div className="meta-item">
                    <FaGraduationCap />
                    <span>{resource.grade}</span>
                  </div>
                  <div className="meta-item">
                    <FaUser />
                    <span>{resource.author}</span>
                  </div>
                </div>

                <div className="resource-stats">
                  <div className="stat">
                    <FaDownload />
                    <span>{resource.downloads} downloads</span>
                  </div>
                  <div className="stat">
                    <FaStar />
                    <span>{resource.rating}/5.0</span>
                  </div>
                  <div className="stat">
                    <FaCalendarAlt />
                    <span>{resource.uploadDate}</span>
                  </div>
                </div>

                <div className="resource-tags">
                  {resource.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>

                {resource.type === 'Video' && resource.duration && (
                  <div className="video-info">
                    <FaPlay />
                    <span>Duration: {resource.duration}</span>
                  </div>
                )}

                <div className="resource-actions">
                  <button className="btn-primary">
                    <FaDownload />
                    Download
                  </button>
                  <button className="btn-secondary">
                    <FaEye />
                    Preview
                  </button>
                  {resource.type === 'Video' && (
                    <button className="btn-secondary">
                      <FaPlay />
                      Play
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="empty-state">
            <FaBook />
            <h3>No resources found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentResourcesPage;
