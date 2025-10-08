import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaSort, FaDownload, FaBook, FaVideo, FaFilePdf, FaFileAlt, FaImage, FaMusic, FaCode, FaPlay, FaEye, FaStar, FaBookmark, FaShare, FaPlus, FaFolder, FaFolderOpen, FaClock, FaUser, FaCalendarAlt, FaTag, FaRocket, FaGraduationCap, FaChalkboardTeacher, FaUsers, FaBookOpen, FaTasks, FaAward, FaMedal, FaArrowUp, FaArrowDown, FaMinus, FaEdit, FaTrash, FaCog, FaSignOutAlt, FaBell, FaChartLine, FaClipboardList, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const StudentResourcesPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarkedResources, setBookmarkedResources] = useState(new Set());

  // Dynamic resources data
  const [resources, setResources] = useState([
    {
      id: 1,
      title: 'Algebra Fundamentals Textbook',
      subject: 'Mathematics',
      type: 'pdf',
      size: '15.2 MB',
      description: 'Comprehensive textbook covering all fundamental algebra concepts from basic operations to advanced functions.',
      author: 'Dr. Sarah Johnson',
      uploadDate: '2024-10-01T10:00:00Z',
      lastModified: '2024-10-01T10:00:00Z',
      downloads: 1250,
      rating: 4.8,
      tags: ['algebra', 'textbook', 'fundamentals', 'mathematics'],
      category: 'Textbooks',
      class: 'Advanced Algebra',
      teacher: 'Mr. Davis',
      isPublic: true,
      fileUrl: '#',
      thumbnail: null
    },
    {
      id: 2,
      title: 'Cell Biology Video Lecture Series',
      subject: 'Science',
      type: 'video',
      size: '2.1 GB',
      description: 'Complete video lecture series covering cell structure, function, and processes with detailed explanations.',
      author: 'Prof. Michael Chen',
      uploadDate: '2024-10-05T14:30:00Z',
      lastModified: '2024-10-05T14:30:00Z',
      downloads: 890,
      rating: 4.9,
      tags: ['biology', 'cell', 'video', 'lecture', 'science'],
      category: 'Video Lectures',
      class: 'Cell Biology',
      teacher: 'Ms. Chen',
      isPublic: true,
      fileUrl: '#',
      thumbnail: 'https://via.placeholder.com/300x200/4CAF50/white?text=Cell+Biology+Video'
    },
    {
      id: 3,
      title: 'Physics Problem Solving Guide',
      subject: 'Physics',
      type: 'pdf',
      size: '8.7 MB',
      description: 'Step-by-step guide for solving physics problems with examples and practice exercises.',
      author: 'Dr. Robert Lee',
      uploadDate: '2024-10-08T09:15:00Z',
      lastModified: '2024-10-08T09:15:00Z',
      downloads: 650,
      rating: 4.6,
      tags: ['physics', 'problem-solving', 'guide', 'examples'],
      category: 'Study Guides',
      class: 'Quantum Physics',
      teacher: 'Dr. Lee',
      isPublic: true,
      fileUrl: '#',
      thumbnail: null
    },
    {
      id: 4,
      title: 'Chemistry Lab Safety Manual',
      subject: 'Chemistry',
      type: 'pdf',
      size: '3.2 MB',
      description: 'Comprehensive safety guidelines and procedures for chemistry laboratory work.',
      author: 'Prof. Emily White',
      uploadDate: '2024-10-10T11:45:00Z',
      lastModified: '2024-10-10T11:45:00Z',
      downloads: 420,
      rating: 4.7,
      tags: ['chemistry', 'safety', 'lab', 'manual', 'procedures'],
      category: 'Lab Manuals',
      class: 'Organic Chemistry',
      teacher: 'Prof. White',
      isPublic: true,
      fileUrl: '#',
      thumbnail: null
    },
    {
      id: 5,
      title: 'Interactive Math Practice App',
      subject: 'Mathematics',
      type: 'app',
      size: '45.8 MB',
      description: 'Interactive mobile application for practicing algebra and geometry problems with instant feedback.',
      author: "G'SON INTERNATIONAL ACADEMY Development Team",
      uploadDate: '2024-10-12T16:20:00Z',
      lastModified: '2024-10-12T16:20:00Z',
      downloads: 2100,
      rating: 4.9,
      tags: ['math', 'practice', 'interactive', 'app', 'mobile'],
      category: 'Applications',
      class: 'Advanced Algebra',
      teacher: 'Mr. Davis',
      isPublic: true,
      fileUrl: '#',
      thumbnail: 'https://via.placeholder.com/300x200/2196F3/white?text=Math+Practice+App'
    },
    {
      id: 6,
      title: 'Biology Concept Maps',
      subject: 'Science',
      type: 'image',
      size: '12.3 MB',
      description: 'Visual concept maps showing relationships between different biological concepts and processes.',
      author: 'Dr. Lisa Park',
      uploadDate: '2024-10-15T13:10:00Z',
      lastModified: '2024-10-15T13:10:00Z',
      downloads: 780,
      rating: 4.5,
      tags: ['biology', 'concept-maps', 'visual', 'learning', 'diagrams'],
      category: 'Visual Aids',
      class: 'Cell Biology',
      teacher: 'Ms. Chen',
      isPublic: true,
      fileUrl: '#',
      thumbnail: 'https://via.placeholder.com/300x200/FF9800/white?text=Biology+Concept+Maps'
    },
    {
      id: 7,
      title: 'Physics Simulation Software',
      subject: 'Physics',
      type: 'software',
      size: '156.7 MB',
      description: 'Interactive physics simulation software for exploring wave functions and quantum mechanics.',
      author: 'Dr. Robert Lee',
      uploadDate: '2024-10-18T08:30:00Z',
      lastModified: '2024-10-18T08:30:00Z',
      downloads: 340,
      rating: 4.8,
      tags: ['physics', 'simulation', 'software', 'quantum', 'waves'],
      category: 'Software',
      class: 'Quantum Physics',
      teacher: 'Dr. Lee',
      isPublic: true,
      fileUrl: '#',
      thumbnail: 'https://via.placeholder.com/300x200/9C27B0/white?text=Physics+Simulation'
    },
    {
      id: 8,
      title: 'Chemistry Periodic Table Reference',
      subject: 'Chemistry',
      type: 'pdf',
      size: '2.8 MB',
      description: 'Comprehensive periodic table with detailed information about each element and their properties.',
      author: 'Prof. Emily White',
      uploadDate: '2024-10-20T12:00:00Z',
      lastModified: '2024-10-20T12:00:00Z',
      downloads: 950,
      rating: 4.7,
      tags: ['chemistry', 'periodic-table', 'elements', 'reference', 'properties'],
      category: 'Reference Materials',
      class: 'Organic Chemistry',
      teacher: 'Prof. White',
      isPublic: true,
      fileUrl: '#',
      thumbnail: null
    }
  ]);

  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    // Get student data
    const studentId = localStorage.getItem('studentId') || 'sarah';
    const studentProfiles = {
      'sarah': { name: 'Sarah Johnson', grade: 'Grade 8', theme: 'blue' },
      'alex': { name: 'Alex Chen', grade: 'Grade 10', theme: 'green' },
      'emily': { name: 'Emily Davis', grade: 'Grade 6', theme: 'purple' },
      'michael': { name: 'Michael Brown', grade: 'Grade 11', theme: 'orange' }
    };
    setStudentData(studentProfiles[studentId]);
  }, []);

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSubject = filterSubject === 'All' || resource.subject === filterSubject;
    const matchesType = filterType === 'All' || resource.type === filterType;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'bookmarked' && bookmarkedResources.has(resource.id)) ||
                      (activeTab === 'recent' && new Date(resource.uploadDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
                      (activeTab === 'popular' && resource.downloads > 500);
    
    return matchesSearch && matchesSubject && matchesType && matchesTab;
  });

  const sortedResources = [...filteredResources].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.title.localeCompare(b.title);
      case 'date':
        return new Date(b.uploadDate) - new Date(a.uploadDate);
      case 'rating':
        return b.rating - a.rating;
      case 'downloads':
        return b.downloads - a.downloads;
      case 'size':
        return parseFloat(b.size) - parseFloat(a.size);
      default:
        return 0;
    }
  });

  const handleDownload = (resourceId) => {
    // Simulate downloading resource
    setIsLoading(true);
    setTimeout(() => {
      setResources(prev => prev.map(resource => 
        resource.id === resourceId 
          ? { ...resource, downloads: resource.downloads + 1 }
          : resource
      ));
      alert('Resource downloaded successfully!');
      setIsLoading(false);
    }, 1000);
  };

  const handleBookmark = (resourceId) => {
    setBookmarkedResources(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(resourceId)) {
        newBookmarks.delete(resourceId);
      } else {
        newBookmarks.add(resourceId);
      }
      return newBookmarks;
    });
  };

  const handleShare = (resourceId) => {
    // Simulate sharing resource
    alert('Resource shared successfully!');
  };

  const getTypeIcon = (type) => {
    const icons = {
      pdf: FaFilePdf,
      video: FaVideo,
      image: FaImage,
      audio: FaMusic,
      code: FaCode,
      app: FaRocket,
      software: FaCog,
      document: FaFileAlt
    };
    const IconComponent = icons[type] || FaFileAlt;
    return <IconComponent />;
  };

  const getTypeColor = (type) => {
    const colors = {
      pdf: 'danger',
      video: 'primary',
      image: 'success',
      audio: 'warning',
      code: 'info',
      app: 'purple',
      software: 'secondary',
      document: 'dark'
    };
    return colors[type] || 'secondary';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatFileSize = (sizeString) => {
    return sizeString;
  };

  if (isLoading) {
    return (
      <div className="student-resources-loading">
        <div className="loading-spinner"></div>
        <p>Processing resource...</p>
      </div>
    );
  }

  return (
    <div className="student-resources-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Learning Resources</h1>
          <p>Access educational materials, textbooks, videos, and interactive content</p>
        </div>
        <div className="header-actions">
          <button className="btn-primary">
            <FaPlus />
            Upload Resource
          </button>
        </div>
      </div>

      {/* Resource Statistics */}
      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon">
            <FaBook />
          </div>
          <div className="stat-info">
            <span className="stat-value">{resources.length}</span>
            <span className="stat-label">Total Resources</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaBookmark />
          </div>
          <div className="stat-info">
            <span className="stat-value">{bookmarkedResources.size}</span>
            <span className="stat-label">Bookmarked</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaDownload />
          </div>
          <div className="stat-info">
            <span className="stat-value">{resources.reduce((sum, r) => sum + r.downloads, 0)}</span>
            <span className="stat-label">Total Downloads</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaStar />
          </div>
          <div className="stat-info">
            <span className="stat-value">{(resources.reduce((sum, r) => sum + r.rating, 0) / resources.length).toFixed(1)}</span>
            <span className="stat-label">Average Rating</span>
          </div>
        </div>
      </div>

      {/* Resource Tabs */}
      <div className="resource-tabs">
        <button
          className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          <FaBook />
          All Resources ({resources.length})
        </button>
        <button
          className={`tab-button ${activeTab === 'bookmarked' ? 'active' : ''}`}
          onClick={() => setActiveTab('bookmarked')}
        >
          <FaBookmark />
          Bookmarked ({bookmarkedResources.size})
        </button>
        <button
          className={`tab-button ${activeTab === 'recent' ? 'active' : ''}`}
          onClick={() => setActiveTab('recent')}
        >
          <FaClock />
          Recent ({resources.filter(r => new Date(r.uploadDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length})
        </button>
        <button
          className={`tab-button ${activeTab === 'popular' ? 'active' : ''}`}
          onClick={() => setActiveTab('popular')}
        >
          <FaStar />
          Popular ({resources.filter(r => r.downloads > 500).length})
        </button>
      </div>

      {/* Filters and Search */}
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
            className="filter-select"
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
          >
            <option value="All">All Subjects</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
          </select>
          <select
            className="filter-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="pdf">PDF Documents</option>
            <option value="video">Videos</option>
            <option value="image">Images</option>
            <option value="app">Applications</option>
            <option value="software">Software</option>
          </select>
          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="date">Sort by Date</option>
            <option value="rating">Sort by Rating</option>
            <option value="downloads">Sort by Downloads</option>
            <option value="size">Sort by Size</option>
          </select>
          <button className="btn-secondary">
            <FaFilter />
            Filter
          </button>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="resources-grid">
        {sortedResources.length > 0 ? (
          sortedResources.map(resource => (
            <div key={resource.id} className="resource-card">
              <div className="resource-header">
                <div className="resource-type">
                  <div className={`type-icon ${getTypeColor(resource.type)}`}>
                    {getTypeIcon(resource.type)}
                  </div>
                  <span className="type-label">{resource.type.toUpperCase()}</span>
                </div>
                <div className="resource-actions">
                  <button 
                    className={`action-btn ${bookmarkedResources.has(resource.id) ? 'bookmarked' : ''}`}
                    onClick={() => handleBookmark(resource.id)}
                    title="Bookmark"
                  >
                    <FaBookmark />
                  </button>
                  <button 
                    className="action-btn"
                    onClick={() => handleShare(resource.id)}
                    title="Share"
                  >
                    <FaShare />
                  </button>
                </div>
              </div>

              {resource.thumbnail && (
                <div className="resource-thumbnail">
                  <img src={resource.thumbnail} alt={resource.title} />
                </div>
              )}

              <div className="resource-content">
                <h3 className="resource-title">{resource.title}</h3>
                <p className="resource-description">{resource.description}</p>
                
                <div className="resource-meta">
                  <div className="meta-item">
                    <FaUser />
                    <span>{resource.author}</span>
                  </div>
                  <div className="meta-item">
                    <FaBook />
                    <span>{resource.subject}</span>
                  </div>
                  <div className="meta-item">
                    <FaCalendarAlt />
                    <span>{formatDate(resource.uploadDate)}</span>
                  </div>
                  <div className="meta-item">
                    <FaFolder />
                    <span>{resource.category}</span>
                  </div>
                </div>

                <div className="resource-stats">
                  <div className="stat-item">
                    <FaDownload />
                    <span>{resource.downloads}</span>
                  </div>
                  <div className="stat-item">
                    <FaStar />
                    <span>{resource.rating}</span>
                  </div>
                  <div className="stat-item">
                    <FaClock />
                    <span>{formatFileSize(resource.size)}</span>
                  </div>
                </div>

                <div className="resource-tags">
                  {resource.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="tag">
                      <FaTag />
                      {tag}
                    </span>
                  ))}
                  {resource.tags.length > 3 && (
                    <span className="tag more">+{resource.tags.length - 3} more</span>
                  )}
                </div>
              </div>

              <div className="resource-actions-footer">
                <button 
                  className="btn-primary"
                  onClick={() => handleDownload(resource.id)}
                >
                  <FaDownload />
                  Download
                </button>
                <button className="btn-outline">
                  <FaEye />
                  Preview
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <FaBook />
            <h3>No Resources Found</h3>
            <p>Try adjusting your search or filters</p>
            <button className="btn-primary">
              <FaPlus />
              Browse Available Resources
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentResourcesPage;