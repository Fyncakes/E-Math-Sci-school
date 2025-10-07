import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaSort, FaDownload, FaChartLine, FaTrophy, FaStar, FaCalendarAlt, FaBook, FaClipboardList, FaRocket, FaGraduationCap, FaChalkboardTeacher, FaUsers, FaBookOpen, FaTasks, FaAward, FaMedal, FaArrowUp, FaArrowDown, FaMinus, FaEye, FaEdit, FaTrash, FaPlus, FaCog, FaSignOutAlt, FaBell, FaFilePdf, FaVideo as FaVideoIcon, FaImage, FaMusic, FaCode, FaFileAlt, FaCheckCircle, FaExclamationTriangle, FaClock } from 'react-icons/fa';

const StudentGradesPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('All');
  const [filterPeriod, setFilterPeriod] = useState('current');
  const [isLoading, setIsLoading] = useState(false);

  // Dynamic grades data
  const [grades, setGrades] = useState([
    {
      id: 1,
      assignment: 'Quadratic Equations Problem Set',
      subject: 'Mathematics',
      teacher: 'Mr. Davis',
      class: 'Advanced Algebra',
      dueDate: '2024-10-18T23:59:00Z',
      submittedDate: '2024-10-18T15:30:00Z',
      grade: 'A-',
      points: 92,
      maxPoints: 100,
      percentage: 92,
      feedback: 'Excellent work! Good understanding of quadratic equations. Minor error in question 7.',
      category: 'Homework',
      weight: 0.3,
      semester: 'Fall 2024',
      status: 'graded'
    },
    {
      id: 2,
      assignment: 'Polynomial Functions Quiz',
      subject: 'Mathematics',
      teacher: 'Mr. Davis',
      class: 'Advanced Algebra',
      dueDate: '2024-10-20T23:59:00Z',
      submittedDate: '2024-10-20T15:45:00Z',
      grade: 'A-',
      points: 47,
      maxPoints: 50,
      percentage: 94,
      feedback: 'Great job! Good understanding of polynomial transformations. Minor error in question 7.',
      category: 'Quiz',
      weight: 0.2,
      semester: 'Fall 2024',
      status: 'graded'
    },
    {
      id: 3,
      assignment: 'Cell Structure Lab Report',
      subject: 'Science',
      teacher: 'Ms. Chen',
      class: 'Cell Biology',
      dueDate: '2024-10-19T23:59:00Z',
      submittedDate: '2024-10-19T22:15:00Z',
      grade: 'B+',
      points: 87,
      maxPoints: 100,
      percentage: 87,
      feedback: 'Good work overall. Lab observations were accurate. Consider improving the analysis section.',
      category: 'Lab Report',
      weight: 0.25,
      semester: 'Fall 2024',
      status: 'graded'
    },
    {
      id: 4,
      assignment: 'Mitosis vs Meiosis Comparison',
      subject: 'Science',
      teacher: 'Ms. Chen',
      class: 'Cell Biology',
      dueDate: '2024-10-22T23:59:00Z',
      submittedDate: '2024-10-22T20:30:00Z',
      grade: 'A',
      points: 95,
      maxPoints: 100,
      percentage: 95,
      feedback: 'Outstanding work! Excellent comparison with clear diagrams and thorough analysis.',
      category: 'Project',
      weight: 0.3,
      semester: 'Fall 2024',
      status: 'graded'
    },
    {
      id: 5,
      assignment: 'Wave Function Analysis',
      subject: 'Physics',
      teacher: 'Dr. Lee',
      class: 'Quantum Physics',
      dueDate: '2024-10-21T23:59:00Z',
      submittedDate: '2024-10-21T18:45:00Z',
      grade: 'B',
      points: 78,
      maxPoints: 100,
      percentage: 78,
      feedback: 'Good attempt. Mathematical calculations were mostly correct. Work on explaining the physical significance.',
      category: 'Assignment',
      weight: 0.2,
      semester: 'Fall 2024',
      status: 'graded'
    },
    {
      id: 6,
      assignment: 'Midterm Exam',
      subject: 'Mathematics',
      teacher: 'Mr. Davis',
      class: 'Advanced Algebra',
      dueDate: '2024-10-25T09:00:00Z',
      submittedDate: '2024-10-25T10:30:00Z',
      grade: 'A-',
      points: 88,
      maxPoints: 100,
      percentage: 88,
      feedback: 'Strong performance! Good understanding of all topics. Minor errors in complex number problems.',
      category: 'Exam',
      weight: 0.4,
      semester: 'Fall 2024',
      status: 'graded'
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

  // Calculate overall statistics
  const overallStats = {
    totalAssignments: grades.length,
    averageGrade: grades.reduce((sum, grade) => sum + grade.percentage, 0) / grades.length,
    highestGrade: Math.max(...grades.map(grade => grade.percentage)),
    lowestGrade: Math.min(...grades.map(grade => grade.percentage)),
    totalPoints: grades.reduce((sum, grade) => sum + grade.points, 0),
    maxPoints: grades.reduce((sum, grade) => sum + grade.maxPoints, 0)
  };

  // Calculate subject-wise statistics
  const subjectStats = grades.reduce((acc, grade) => {
    if (!acc[grade.subject]) {
      acc[grade.subject] = {
        total: 0,
        count: 0,
        average: 0,
        grades: []
      };
    }
    acc[grade.subject].total += grade.percentage;
    acc[grade.subject].count += 1;
    acc[grade.subject].grades.push(grade);
    acc[grade.subject].average = acc[grade.subject].total / acc[grade.subject].count;
    return acc;
  }, {});

  // Calculate category-wise statistics
  const categoryStats = grades.reduce((acc, grade) => {
    if (!acc[grade.category]) {
      acc[grade.category] = {
        total: 0,
        count: 0,
        average: 0,
        weight: 0
      };
    }
    acc[grade.category].total += grade.percentage;
    acc[grade.category].count += 1;
    acc[grade.category].weight += grade.weight;
    acc[grade.category].average = acc[grade.category].total / acc[grade.category].count;
    return acc;
  }, {});

  const filteredGrades = grades.filter(grade => {
    const matchesSearch = grade.assignment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grade.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grade.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === 'All' || grade.subject === filterSubject;
    const matchesPeriod = filterPeriod === 'all' || 
                         (filterPeriod === 'current' && grade.semester === 'Fall 2024') ||
                         (filterPeriod === 'previous' && grade.semester !== 'Fall 2024');
    
    return matchesSearch && matchesSubject && matchesPeriod;
  });

  const getGradeColor = (percentage) => {
    if (percentage >= 90) return 'success';
    if (percentage >= 80) return 'info';
    if (percentage >= 70) return 'warning';
    return 'danger';
  };

  const getGradeLetter = (percentage) => {
    if (percentage >= 97) return 'A+';
    if (percentage >= 93) return 'A';
    if (percentage >= 90) return 'A-';
    if (percentage >= 87) return 'B+';
    if (percentage >= 83) return 'B';
    if (percentage >= 80) return 'B-';
    if (percentage >= 77) return 'C+';
    if (percentage >= 73) return 'C';
    if (percentage >= 70) return 'C-';
    if (percentage >= 67) return 'D+';
    if (percentage >= 63) return 'D';
    if (percentage >= 60) return 'D-';
    return 'F';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleDownloadReport = () => {
    // Simulate downloading grade report
    alert('Downloading grade report...');
  };

  if (isLoading) {
    return (
      <div className="student-grades-loading">
        <div className="loading-spinner"></div>
        <p>Loading your grades...</p>
      </div>
    );
  }

  return (
    <div className="student-grades-page">
      <div className="page-header">
        <div className="header-content">
          <h1>My Grades</h1>
          <p>Track your academic performance and progress</p>
        </div>
        <div className="header-actions">
          <button className="btn-primary" onClick={handleDownloadReport}>
            <FaDownload />
            Download Report
          </button>
        </div>
      </div>

      {/* Overall Statistics */}
      <div className="stats-overview">
        <div className="stat-card main-stat">
          <div className="stat-icon">
            <FaTrophy />
          </div>
          <div className="stat-info">
            <span className="stat-value">{overallStats.averageGrade.toFixed(1)}%</span>
            <span className="stat-label">Overall Average</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaChartLine />
          </div>
          <div className="stat-info">
            <span className="stat-value">{overallStats.totalAssignments}</span>
            <span className="stat-label">Total Assignments</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaStar />
          </div>
          <div className="stat-info">
            <span className="stat-value">{overallStats.highestGrade}%</span>
            <span className="stat-label">Highest Grade</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaBook />
          </div>
          <div className="stat-info">
            <span className="stat-value">{overallStats.totalPoints}/{overallStats.maxPoints}</span>
            <span className="stat-label">Total Points</span>
          </div>
        </div>
      </div>

      {/* Grade Tabs */}
      <div className="grade-tabs">
        <button
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <FaChartLine />
          Overview
        </button>
        <button
          className={`tab-button ${activeTab === 'detailed' ? 'active' : ''}`}
          onClick={() => setActiveTab('detailed')}
        >
          <FaClipboardList />
          Detailed Grades
        </button>
        <button
          className={`tab-button ${activeTab === 'subjects' ? 'active' : ''}`}
          onClick={() => setActiveTab('subjects')}
        >
          <FaBook />
          By Subject
        </button>
        <button
          className={`tab-button ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          <FaTasks />
          By Category
        </button>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="search-filters">
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search grades..."
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
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
          >
            <option value="current">Current Semester</option>
            <option value="previous">Previous Semesters</option>
            <option value="all">All Time</option>
          </select>
          <button className="btn-secondary">
            <FaFilter />
            Filter
          </button>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'overview' && (
        <div className="overview-content">
          <div className="overview-grid">
            {/* Subject Performance */}
            <div className="overview-card">
              <h3>Subject Performance</h3>
              <div className="subject-performance">
                {Object.entries(subjectStats).map(([subject, stats]) => (
                  <div key={subject} className="subject-item">
                    <div className="subject-info">
                      <span className="subject-name">{subject}</span>
                      <span className="subject-average">{stats.average.toFixed(1)}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className={`progress-fill ${getGradeColor(stats.average)}`}
                        style={{ width: `${stats.average}%` }}
                      ></div>
                    </div>
                    <span className="subject-count">{stats.count} assignments</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Performance */}
            <div className="overview-card">
              <h3>Category Performance</h3>
              <div className="category-performance">
                {Object.entries(categoryStats).map(([category, stats]) => (
                  <div key={category} className="category-item">
                    <div className="category-info">
                      <span className="category-name">{category}</span>
                      <span className="category-average">{stats.average.toFixed(1)}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className={`progress-fill ${getGradeColor(stats.average)}`}
                        style={{ width: `${stats.average}%` }}
                      ></div>
                    </div>
                    <span className="category-weight">Weight: {(stats.weight * 100).toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Grades */}
            <div className="overview-card">
              <h3>Recent Grades</h3>
              <div className="recent-grades">
                {grades.slice(0, 5).map(grade => (
                  <div key={grade.id} className="recent-grade-item">
                    <div className="grade-info">
                      <span className="assignment-name">{grade.assignment}</span>
                      <span className="assignment-subject">{grade.subject}</span>
                    </div>
                    <div className="grade-score">
                      <span className={`grade-badge ${getGradeColor(grade.percentage)}`}>
                        {grade.grade}
                      </span>
                      <span className="grade-percentage">{grade.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'detailed' && (
        <div className="detailed-grades">
          <div className="grades-list">
            {filteredGrades.map(grade => (
              <div key={grade.id} className="grade-card">
                <div className="grade-header">
                  <div className="grade-title-section">
                    <h3>{grade.assignment}</h3>
                    <div className="grade-meta">
                      <span className="subject-badge">{grade.subject}</span>
                      <span className="teacher-name">
                        <FaChalkboardTeacher />
                        {grade.teacher}
                      </span>
                      <span className="category-badge">{grade.category}</span>
                    </div>
                  </div>
                  <div className="grade-score-section">
                    <div className={`grade-badge large ${getGradeColor(grade.percentage)}`}>
                      {grade.grade}
                    </div>
                    <div className="grade-details">
                      <span className="grade-percentage">{grade.percentage}%</span>
                      <span className="grade-points">{grade.points}/{grade.maxPoints} pts</span>
                    </div>
                  </div>
                </div>

                <div className="grade-content">
                  <div className="grade-info">
                    <div className="info-item">
                      <FaCalendarAlt />
                      <span>Due: {formatDate(grade.dueDate)}</span>
                    </div>
                    <div className="info-item">
                      <FaCheckCircle />
                      <span>Submitted: {formatDate(grade.submittedDate)}</span>
                    </div>
                    <div className="info-item">
                      <FaBook />
                      <span>Class: {grade.class}</span>
                    </div>
                    <div className="info-item">
                      <FaTrophy />
                      <span>Weight: {(grade.weight * 100).toFixed(0)}%</span>
                    </div>
                  </div>

                  {grade.feedback && (
                    <div className="feedback-section">
                      <h4>Teacher Feedback</h4>
                      <p>{grade.feedback}</p>
                    </div>
                  )}
                </div>

                <div className="grade-actions">
                  <button className="btn-outline">
                    <FaEye />
                    View Assignment
                  </button>
                  <button className="btn-outline">
                    <FaDownload />
                    Download Feedback
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'subjects' && (
        <div className="subjects-view">
          {Object.entries(subjectStats).map(([subject, stats]) => (
            <div key={subject} className="subject-card">
              <div className="subject-header">
                <h3>{subject}</h3>
                <div className="subject-average">
                  <span className="average-score">{stats.average.toFixed(1)}%</span>
                  <span className="average-grade">{getGradeLetter(stats.average)}</span>
                </div>
              </div>
              <div className="subject-grades">
                {stats.grades.map(grade => (
                  <div key={grade.id} className="subject-grade-item">
                    <span className="assignment-name">{grade.assignment}</span>
                    <span className={`grade-badge ${getGradeColor(grade.percentage)}`}>
                      {grade.grade}
                    </span>
                    <span className="grade-percentage">{grade.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'categories' && (
        <div className="categories-view">
          {Object.entries(categoryStats).map(([category, stats]) => (
            <div key={category} className="category-card">
              <div className="category-header">
                <h3>{category}</h3>
                <div className="category-stats">
                  <span className="category-average">{stats.average.toFixed(1)}%</span>
                  <span className="category-weight">Weight: {(stats.weight * 100).toFixed(0)}%</span>
                  <span className="category-count">{stats.count} assignments</span>
                </div>
              </div>
              <div className="category-progress">
                <div className="progress-bar">
                  <div 
                    className={`progress-fill ${getGradeColor(stats.average)}`}
                    style={{ width: `${stats.average}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentGradesPage;