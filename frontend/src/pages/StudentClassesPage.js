import React, { useState, useEffect } from 'react';
import { FaPlay, FaCalendarAlt, FaClock, FaUser, FaBook, FaVideo, FaFileAlt, FaDownload, FaSearch, FaFilter, FaSort, FaChevronDown, FaChevronUp, FaCheckCircle, FaExclamationTriangle, FaStar, FaTrophy, FaRocket, FaGraduationCap, FaChalkboardTeacher, FaUsers, FaBookOpen, FaTasks, FaAward, FaMedal, FaArrowUp, FaArrowDown, FaMinus, FaEye, FaEdit, FaTrash, FaPlus, FaCog, FaSignOutAlt, FaBell, FaChartLine, FaClipboardList, FaFilePdf, FaVideo as FaVideoIcon, FaImage, FaMusic, FaCode } from 'react-icons/fa';

const StudentClassesPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [isLoading, setIsLoading] = useState(false);

  // Dynamic class data
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: 'Advanced Algebra',
      subject: 'Mathematics',
      teacher: 'Mr. Davis',
      schedule: 'Mon, Wed, Fri 2:00 PM',
      duration: '90 minutes',
      status: 'active',
      progress: 75,
      nextClass: '2024-10-15T14:00:00Z',
      description: 'Comprehensive study of algebraic concepts including quadratic equations, polynomials, and functions.',
      room: 'Room 201',
      students: 24,
      rating: 4.8,
      color: 'blue',
      materials: [
        { name: 'Algebra Textbook Chapter 5', type: 'pdf', size: '2.3 MB' },
        { name: 'Practice Problems Set', type: 'doc', size: '1.1 MB' },
        { name: 'Video Lecture: Quadratic Functions', type: 'video', size: '45 MB' }
      ],
      assignments: [
        { id: 1, title: 'Quadratic Equations Homework', due: '2024-10-18', status: 'pending' },
        { id: 2, title: 'Polynomial Functions Quiz', due: '2024-10-20', status: 'completed' }
      ]
    },
    {
      id: 2,
      name: 'Cell Biology',
      subject: 'Science',
      teacher: 'Ms. Chen',
      schedule: 'Tue, Thu 10:00 AM',
      duration: '60 minutes',
      status: 'active',
      progress: 60,
      nextClass: '2024-10-16T10:00:00Z',
      description: 'In-depth exploration of cell structure, function, and processes.',
      room: 'Lab 105',
      students: 18,
      rating: 4.6,
      color: 'green',
      materials: [
        { name: 'Cell Biology Lab Manual', type: 'pdf', size: '3.2 MB' },
        { name: 'Microscopy Techniques Guide', type: 'pdf', size: '1.8 MB' }
      ],
      assignments: [
        { id: 3, title: 'Cell Structure Lab Report', due: '2024-10-19', status: 'pending' },
        { id: 4, title: 'Mitosis vs Meiosis Comparison', due: '2024-10-22', status: 'in_progress' }
      ]
    },
    {
      id: 3,
      name: 'Quantum Physics',
      subject: 'Physics',
      teacher: 'Dr. Lee',
      schedule: 'Wed, Fri 3:00 PM',
      duration: '120 minutes',
      status: 'active',
      progress: 45,
      nextClass: '2024-10-17T15:00:00Z',
      description: 'Advanced study of quantum mechanics and its applications.',
      room: 'Room 301',
      students: 12,
      rating: 4.9,
      color: 'purple',
      materials: [
        { name: 'Quantum Mechanics Textbook', type: 'pdf', size: '8.5 MB' },
        { name: 'Schrödinger Equation Notes', type: 'pdf', size: '2.1 MB' }
      ],
      assignments: [
        { id: 5, title: 'Wave Function Analysis', due: '2024-10-21', status: 'pending' },
        { id: 6, title: 'Quantum States Problem Set', due: '2024-10-25', status: 'pending' }
      ]
    },
    {
      id: 4,
      name: 'Organic Chemistry',
      subject: 'Chemistry',
      teacher: 'Prof. White',
      schedule: 'Mon, Wed 1:00 PM',
      duration: '90 minutes',
      status: 'upcoming',
      progress: 0,
      nextClass: '2024-10-21T13:00:00Z',
      description: 'Study of carbon-based compounds and their reactions.',
      room: 'Lab 203',
      students: 20,
      rating: 4.7,
      color: 'orange',
      materials: [],
      assignments: []
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

  const filteredClasses = classes.filter(classItem => {
    const matchesSearch = classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classItem.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === 'All' || classItem.subject === filterSubject;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'active' && classItem.status === 'active') ||
                      (activeTab === 'upcoming' && classItem.status === 'upcoming') ||
                      (activeTab === 'completed' && classItem.status === 'completed');
    
    return matchesSearch && matchesSubject && matchesTab;
  });

  const sortedClasses = [...filteredClasses].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'teacher':
        return a.teacher.localeCompare(b.teacher);
      case 'subject':
        return a.subject.localeCompare(b.subject);
      case 'progress':
        return b.progress - a.progress;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const handleJoinClass = (classId) => {
    // Simulate joining a class
    setIsLoading(true);
    setTimeout(() => {
      alert('Joining class... (This would open the video conference)');
      setIsLoading(false);
    }, 1000);
  };

  const handleDownloadMaterial = (material) => {
    // Simulate downloading material
    alert(`Downloading ${material.name}...`);
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: { text: 'Active', class: 'success' },
      upcoming: { text: 'Upcoming', class: 'info' },
      completed: { text: 'Completed', class: 'warning' }
    };
    const badge = badges[status] || badges.active;
    return <span className={`status-badge ${badge.class}`}>{badge.text}</span>;
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'success';
    if (progress >= 60) return 'info';
    if (progress >= 40) return 'warning';
    return 'danger';
  };

  if (isLoading) {
    return (
      <div className="student-classes-loading">
        <div className="loading-spinner"></div>
        <p>Loading your classes...</p>
      </div>
    );
  }

  return (
    <div className="student-classes-page">
      <div className="page-header">
        <div className="header-content">
          <h1>My Classes</h1>
          <p>Manage your enrolled classes and track your progress</p>
        </div>
        <div className="header-actions">
          <button className="btn-primary">
            <FaPlus />
            Enroll in New Class
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="filters-section">
        <div className="search-filters">
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search classes, teachers..."
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
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="teacher">Sort by Teacher</option>
            <option value="subject">Sort by Subject</option>
            <option value="progress">Sort by Progress</option>
            <option value="rating">Sort by Rating</option>
          </select>
          <button className="btn-secondary">
            <FaFilter />
            Filter
          </button>
        </div>
      </div>

      {/* Class Tabs */}
      <div className="class-tabs">
        <button
          className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          <FaBook />
          All Classes ({classes.length})
        </button>
        <button
          className={`tab-button ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          <FaPlay />
          Active ({classes.filter(c => c.status === 'active').length})
        </button>
        <button
          className={`tab-button ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          <FaCalendarAlt />
          Upcoming ({classes.filter(c => c.status === 'upcoming').length})
        </button>
        <button
          className={`tab-button ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          <FaCheckCircle />
          Completed ({classes.filter(c => c.status === 'completed').length})
        </button>
      </div>

      {/* Classes Grid */}
      <div className="classes-grid">
        {sortedClasses.length > 0 ? (
          sortedClasses.map(classItem => (
            <div key={classItem.id} className={`class-card ${classItem.color}`}>
              <div className="class-header">
                <div className="class-info">
                  <h3>{classItem.name}</h3>
                  <p className="teacher-name">
                    <FaChalkboardTeacher />
                    {classItem.teacher}
                  </p>
                  <p className="subject-badge">{classItem.subject}</p>
                </div>
                <div className="class-status">
                  {getStatusBadge(classItem.status)}
                  <div className="class-rating">
                    <FaStar />
                    {classItem.rating}
                  </div>
                </div>
              </div>

              <div className="class-content">
                <p className="class-description">{classItem.description}</p>
                
                <div className="class-schedule">
                  <div className="schedule-item">
                    <FaCalendarAlt />
                    <span>{classItem.schedule}</span>
                  </div>
                  <div className="schedule-item">
                    <FaClock />
                    <span>{classItem.duration}</span>
                  </div>
                  <div className="schedule-item">
                    <FaUsers />
                    <span>{classItem.students} students</span>
                  </div>
                </div>

                <div className="progress-section">
                  <div className="progress-header">
                    <span>Progress</span>
                    <span>{classItem.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className={`progress-fill ${getProgressColor(classItem.progress)}`}
                      style={{ width: `${classItem.progress}%` }}
                    ></div>
                  </div>
                </div>

                {classItem.materials.length > 0 && (
                  <div className="materials-section">
                    <h4>Materials</h4>
                    <div className="materials-list">
                      {classItem.materials.map((material, index) => (
                        <div key={index} className="material-item">
                          <span className="material-name">{material.name}</span>
                          <button 
                            className="download-btn"
                            onClick={() => handleDownloadMaterial(material)}
                          >
                            <FaDownload />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {classItem.assignments.length > 0 && (
                  <div className="assignments-section">
                    <h4>Recent Assignments</h4>
                    <div className="assignments-list">
                      {classItem.assignments.map(assignment => (
                        <div key={assignment.id} className="assignment-item">
                          <span className="assignment-title">{assignment.title}</span>
                          <span className={`assignment-status ${assignment.status}`}>
                            {assignment.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="class-actions">
                {classItem.status === 'active' && (
                  <button 
                    className="btn-primary join-class"
                    onClick={() => handleJoinClass(classItem.id)}
                  >
                    <FaPlay />
                    Join Class
                  </button>
                )}
                {classItem.status === 'upcoming' && (
                  <button className="btn-secondary">
                    <FaCalendarAlt />
                    View Schedule
                  </button>
                )}
                <button className="btn-outline">
                  <FaEye />
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <FaBook />
            <h3>No Classes Found</h3>
            <p>Try adjusting your search or filters</p>
            <button className="btn-primary">
              <FaPlus />
              Browse Available Classes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentClassesPage;