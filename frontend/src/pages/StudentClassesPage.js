import React, { useState } from 'react';
import { 
  FaCalendarAlt, FaClock, FaVideo, FaBook, FaDownload, FaPlay, 
  FaChalkboardTeacher, FaUsers, FaStar, FaFilter, FaSearch,
  FaChevronDown, FaChevronUp, FaCheckCircle, FaExclamationTriangle,
  FaFilePdf, FaFileWord, FaFilePowerpoint, FaFileExcel, FaLink,
  FaGraduationCap, FaRocket, FaTarget, FaLightbulb, FaTrophy
} from 'react-icons/fa';

const StudentClassesPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedClass, setSelectedClass] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('all');

  const classes = [
    {
      id: 1,
      title: 'Mathematics - Algebra Basics',
      teacher: 'Dr. Sarah Johnson',
      grade: 'Grade 8',
      subject: 'Mathematics',
      date: '2024-01-15',
      time: '2:00 PM - 3:30 PM',
      duration: '90 minutes',
      type: 'Live Class',
      status: 'upcoming',
      description: 'Introduction to algebraic expressions and equations',
      materials: [
        { name: 'Algebra Workbook.pdf', type: 'PDF', size: '2.3 MB' },
        { name: 'Practice Problems.docx', type: 'Word', size: '1.1 MB' },
        { name: 'Video Lesson.mp4', type: 'Video', size: '45 MB' }
      ],
      zoomLink: 'https://zoom.us/j/123456789',
      recording: 'https://example.com/recording1',
      assignments: 3,
      completed: 1,
      progress: 33
    },
    {
      id: 2,
      title: 'Science - Physics Fundamentals',
      teacher: 'Prof. Michael Chen',
      grade: 'Grade 9',
      subject: 'Science',
      date: '2024-01-16',
      time: '10:00 AM - 11:30 AM',
      duration: '90 minutes',
      type: 'Live Class',
      status: 'upcoming',
      description: 'Understanding motion, forces, and energy',
      materials: [
        { name: 'Physics Lab Manual.pdf', type: 'PDF', size: '3.2 MB' },
        { name: 'Experiment Guide.pptx', type: 'PowerPoint', size: '2.8 MB' }
      ],
      zoomLink: 'https://zoom.us/j/987654321',
      recording: null,
      assignments: 2,
      completed: 0,
      progress: 0
    },
    {
      id: 3,
      title: 'Mathematics - Calculus Advanced',
      teacher: 'Dr. Emily Davis',
      grade: 'Grade 12',
      subject: 'Mathematics',
      date: '2024-01-14',
      time: '3:00 PM - 4:30 PM',
      duration: '90 minutes',
      type: 'Live Class',
      status: 'completed',
      description: 'Advanced calculus concepts and applications',
      materials: [
        { name: 'Calculus Textbook.pdf', type: 'PDF', size: '5.1 MB' },
        { name: 'Problem Sets.xlsx', type: 'Excel', size: '890 KB' }
      ],
      zoomLink: 'https://zoom.us/j/456789123',
      recording: 'https://example.com/recording2',
      assignments: 4,
      completed: 4,
      progress: 100
    }
  ];

  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = filterGrade === 'all' || cls.grade === filterGrade;
    return matchesSearch && matchesGrade;
  });

  const getFileIcon = (type) => {
    switch (type) {
      case 'PDF': return <FaFilePdf />;
      case 'Word': return <FaFileWord />;
      case 'PowerPoint': return <FaFilePowerpoint />;
      case 'Excel': return <FaFileExcel />;
      case 'Video': return <FaVideo />;
      default: return <FaFilePdf />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'warning';
      case 'completed': return 'success';
      case 'cancelled': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <div className="student-classes-page">
      <div className="page-header">
        <div className="header-content">
          <h1>My Classes</h1>
          <p>Manage your classes, access materials, and track your progress</p>
        </div>
        <div className="header-actions">
          <button className="btn-primary">
            <FaRocket />
            Join Live Class
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
                placeholder="Search classes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Grades</option>
              <option value="Grade 8">Grade 8</option>
              <option value="Grade 9">Grade 9</option>
              <option value="Grade 10">Grade 10</option>
              <option value="Grade 11">Grade 11</option>
              <option value="Grade 12">Grade 12</option>
            </select>
          </div>

          <div className="tab-navigation">
            <button
              className={`tab-button ${activeTab === 'upcoming' ? 'active' : ''}`}
              onClick={() => setActiveTab('upcoming')}
            >
              <FaCalendarAlt />
              Upcoming Classes
            </button>
            <button
              className={`tab-button ${activeTab === 'completed' ? 'active' : ''}`}
              onClick={() => setActiveTab('completed')}
            >
              <FaCheckCircle />
              Completed Classes
            </button>
            <button
              className={`tab-button ${activeTab === 'recordings' ? 'active' : ''}`}
              onClick={() => setActiveTab('recordings')}
            >
              <FaVideo />
              Class Recordings
            </button>
          </div>
        </div>

        <div className="classes-grid">
          {filteredClasses
            .filter(cls => {
              if (activeTab === 'upcoming') return cls.status === 'upcoming';
              if (activeTab === 'completed') return cls.status === 'completed';
              if (activeTab === 'recordings') return cls.recording;
              return true;
            })
            .map(cls => (
            <div key={cls.id} className="class-card">
              <div className="class-header">
                <div className="class-info">
                  <h3>{cls.title}</h3>
                  <div className="class-meta">
                    <span className="teacher">
                      <FaChalkboardTeacher />
                      {cls.teacher}
                    </span>
                    <span className="grade">
                      <FaGraduationCap />
                      {cls.grade}
                    </span>
                    <span className="subject">
                      <FaBook />
                      {cls.subject}
                    </span>
                  </div>
                </div>
                <div className="class-status">
                  <span className={`status-badge ${getStatusColor(cls.status)}`}>
                    {cls.status}
                  </span>
                </div>
              </div>

              <div className="class-details">
                <div className="time-info">
                  <div className="date-time">
                    <FaCalendarAlt />
                    <span>{cls.date}</span>
                  </div>
                  <div className="time-duration">
                    <FaClock />
                    <span>{cls.time} ({cls.duration})</span>
                  </div>
                </div>

                <p className="class-description">{cls.description}</p>

                {cls.status === 'upcoming' && (
                  <div className="class-actions">
                    <button className="btn-primary">
                      <FaPlay />
                      Join Class
                    </button>
                    <button className="btn-secondary">
                      <FaCalendarAlt />
                      Add to Calendar
                    </button>
                  </div>
                )}

                {cls.status === 'completed' && cls.recording && (
                  <div className="class-actions">
                    <button className="btn-primary">
                      <FaVideo />
                      Watch Recording
                    </button>
                    <button className="btn-secondary">
                      <FaDownload />
                      Download Materials
                    </button>
                  </div>
                )}

                <div className="progress-section">
                  <div className="progress-header">
                    <span>Assignments Progress</span>
                    <span>{cls.completed}/{cls.assignments} completed</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${cls.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="materials-section">
                  <h4>Class Materials</h4>
                  <div className="materials-list">
                    {cls.materials.map((material, index) => (
                      <div key={index} className="material-item">
                        <div className="material-icon">
                          {getFileIcon(material.type)}
                        </div>
                        <div className="material-info">
                          <span className="material-name">{material.name}</span>
                          <span className="material-size">{material.size}</span>
                        </div>
                        <button className="download-btn">
                          <FaDownload />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {cls.zoomLink && (
                  <div className="zoom-link">
                    <FaLink />
                    <span>Zoom Link: {cls.zoomLink}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredClasses.length === 0 && (
          <div className="empty-state">
            <FaGraduationCap />
            <h3>No classes found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentClassesPage;
