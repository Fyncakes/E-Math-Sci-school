import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaSort, FaPlus, FaEye, FaEdit, FaTrash, FaDownload, FaUpload, FaClock, FaCalendarAlt, FaCheckCircle, FaExclamationTriangle, FaBook, FaClipboardList, FaTrophy, FaRocket, FaGraduationCap, FaChalkboardTeacher, FaUsers, FaBookOpen, FaTasks, FaAward, FaMedal, FaArrowUp, FaArrowDown, FaMinus, FaFilePdf, FaVideo as FaVideoIcon, FaImage, FaMusic, FaCode, FaFileAlt, FaStar } from 'react-icons/fa';

const StudentAssignmentsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('dueDate');
  const [isLoading, setIsLoading] = useState(false);

  // Dynamic assignment data
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: 'Quadratic Equations Problem Set',
      subject: 'Mathematics',
      teacher: 'Mr. Davis',
      class: 'Advanced Algebra',
      dueDate: '2024-10-18T23:59:00Z',
      assignedDate: '2024-10-15T09:00:00Z',
      status: 'pending',
      priority: 'high',
      points: 100,
      description: 'Solve 20 quadratic equations using different methods: factoring, completing the square, and quadratic formula.',
      instructions: 'Show all work clearly. Use proper mathematical notation. Submit as PDF.',
      attachments: [
        { name: 'Problem Set 5.pdf', type: 'pdf', size: '1.2 MB' },
        { name: 'Answer Sheet Template.docx', type: 'doc', size: '0.5 MB' }
      ],
      submittedFiles: [],
      grade: null,
      feedback: null,
      timeSpent: 0,
      estimatedTime: 120
    },
    {
      id: 2,
      title: 'Cell Structure Lab Report',
      subject: 'Science',
      teacher: 'Ms. Chen',
      class: 'Cell Biology',
      dueDate: '2024-10-19T23:59:00Z',
      assignedDate: '2024-10-16T10:00:00Z',
      status: 'in_progress',
      priority: 'high',
      points: 150,
      description: 'Write a detailed lab report on the cell structure observations made during the microscopy session.',
      instructions: 'Include hypothesis, methodology, observations, analysis, and conclusion. Minimum 1000 words.',
      attachments: [
        { name: 'Lab Manual Chapter 3.pdf', type: 'pdf', size: '2.1 MB' },
        { name: 'Microscopy Images.zip', type: 'zip', size: '15.3 MB' }
      ],
      submittedFiles: [
        { name: 'Draft_Report.docx', type: 'doc', size: '0.8 MB', uploadedAt: '2024-10-17T14:30:00Z' }
      ],
      grade: null,
      feedback: null,
      timeSpent: 45,
      estimatedTime: 180
    },
    {
      id: 3,
      title: 'Polynomial Functions Quiz',
      subject: 'Mathematics',
      teacher: 'Mr. Davis',
      class: 'Advanced Algebra',
      dueDate: '2024-10-20T23:59:00Z',
      assignedDate: '2024-10-17T11:00:00Z',
      status: 'completed',
      priority: 'medium',
      points: 50,
      description: 'Online quiz covering polynomial functions, graphing, and transformations.',
      instructions: 'Complete within 30 minutes. No external resources allowed.',
      attachments: [
        { name: 'Quiz Guidelines.pdf', type: 'pdf', size: '0.3 MB' }
      ],
      submittedFiles: [
        { name: 'Quiz_Answers.pdf', type: 'pdf', size: '0.2 MB', uploadedAt: '2024-10-20T15:45:00Z' }
      ],
      grade: 'A-',
      feedback: 'Excellent work! Good understanding of polynomial transformations. Minor error in question 7.',
      timeSpent: 28,
      estimatedTime: 30
    },
    {
      id: 4,
      title: 'Wave Function Analysis',
      subject: 'Physics',
      teacher: 'Dr. Lee',
      class: 'Quantum Physics',
      dueDate: '2024-10-21T23:59:00Z',
      assignedDate: '2024-10-18T15:00:00Z',
      status: 'pending',
      priority: 'high',
      points: 200,
      description: 'Analyze the wave function for a particle in a box and calculate probability densities.',
      instructions: 'Use mathematical software for calculations. Include graphs and detailed explanations.',
      attachments: [
        { name: 'Wave Function Problems.pdf', type: 'pdf', size: '3.2 MB' },
        { name: 'Mathematical Software Guide.pdf', type: 'pdf', size: '1.8 MB' }
      ],
      submittedFiles: [],
      grade: null,
      feedback: null,
      timeSpent: 0,
      estimatedTime: 240
    },
    {
      id: 5,
      title: 'Mitosis vs Meiosis Comparison',
      subject: 'Science',
      teacher: 'Ms. Chen',
      class: 'Cell Biology',
      dueDate: '2024-10-22T23:59:00Z',
      assignedDate: '2024-10-19T10:00:00Z',
      status: 'in_progress',
      priority: 'medium',
      points: 80,
      description: 'Create a detailed comparison chart of mitosis and meiosis processes.',
      instructions: 'Include diagrams, key differences, and biological significance. Use digital tools.',
      attachments: [
        { name: 'Cell Division Reference.pdf', type: 'pdf', size: '2.5 MB' }
      ],
      submittedFiles: [
        { name: 'Comparison_Outline.docx', type: 'doc', size: '0.3 MB', uploadedAt: '2024-10-20T16:20:00Z' }
      ],
      grade: null,
      feedback: null,
      timeSpent: 30,
      estimatedTime: 90
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

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === 'All' || assignment.subject === filterSubject;
    const matchesStatus = filterStatus === 'All' || assignment.status === filterStatus;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'pending' && assignment.status === 'pending') ||
                      (activeTab === 'in_progress' && assignment.status === 'in_progress') ||
                      (activeTab === 'completed' && assignment.status === 'completed') ||
                      (activeTab === 'overdue' && new Date(assignment.dueDate) < new Date() && assignment.status !== 'completed');
    
    return matchesSearch && matchesSubject && matchesStatus && matchesTab;
  });

  const sortedAssignments = [...filteredAssignments].sort((a, b) => {
    switch (sortBy) {
      case 'dueDate':
        return new Date(a.dueDate) - new Date(b.dueDate);
      case 'title':
        return a.title.localeCompare(b.title);
      case 'subject':
        return a.subject.localeCompare(b.subject);
      case 'points':
        return b.points - a.points;
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      default:
        return 0;
    }
  });

  const handleSubmitAssignment = (assignmentId) => {
    // Simulate submitting assignment
    setIsLoading(true);
    setTimeout(() => {
      setAssignments(prev => prev.map(assignment => 
        assignment.id === assignmentId 
          ? { ...assignment, status: 'submitted', submittedFiles: [...assignment.submittedFiles, { name: 'Final_Submission.pdf', type: 'pdf', size: '1.5 MB', uploadedAt: new Date().toISOString() }] }
          : assignment
      ));
      alert('Assignment submitted successfully!');
      setIsLoading(false);
    }, 1000);
  };

  const handleUploadFile = (assignmentId) => {
    // Simulate file upload
    const file = { name: 'New_File.pdf', type: 'pdf', size: '1.2 MB', uploadedAt: new Date().toISOString() };
    setAssignments(prev => prev.map(assignment => 
      assignment.id === assignmentId 
        ? { ...assignment, submittedFiles: [...assignment.submittedFiles, file] }
        : assignment
    ));
    alert('File uploaded successfully!');
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { text: 'Pending', class: 'warning' },
      in_progress: { text: 'In Progress', class: 'info' },
      completed: { text: 'Completed', class: 'success' },
      submitted: { text: 'Submitted', class: 'primary' },
      overdue: { text: 'Overdue', class: 'danger' }
    };
    const badge = badges[status] || badges.pending;
    return <span className={`status-badge ${badge.class}`}>{badge.text}</span>;
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      high: { text: 'High', class: 'danger' },
      medium: { text: 'Medium', class: 'warning' },
      low: { text: 'Low', class: 'success' }
    };
    const badge = badges[priority] || badges.medium;
    return <span className={`priority-badge ${badge.class}`}>{badge.text}</span>;
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeRemaining = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diff = due - now;
    
    if (diff <= 0) return 'Overdue';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} left`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} left`;
    return 'Due soon';
  };

  if (isLoading) {
    return (
      <div className="student-assignments-loading">
        <div className="loading-spinner"></div>
        <p>Processing assignment...</p>
      </div>
    );
  }

  return (
    <div className="student-assignments-page">
      <div className="page-header">
        <div className="header-content">
          <h1>My Assignments</h1>
          <p>Track and manage all your assignments and submissions</p>
        </div>
        <div className="header-actions">
          <button className="btn-primary">
            <FaPlus />
            New Assignment
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon pending">
            <FaClock />
          </div>
          <div className="stat-info">
            <span className="stat-value">{assignments.filter(a => a.status === 'pending').length}</span>
            <span className="stat-label">Pending</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon in-progress">
            <FaTasks />
          </div>
          <div className="stat-info">
            <span className="stat-value">{assignments.filter(a => a.status === 'in_progress').length}</span>
            <span className="stat-label">In Progress</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon completed">
            <FaCheckCircle />
          </div>
          <div className="stat-info">
            <span className="stat-value">{assignments.filter(a => a.status === 'completed').length}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon overdue">
            <FaExclamationTriangle />
          </div>
          <div className="stat-info">
            <span className="stat-value">{assignments.filter(a => isOverdue(a.dueDate) && a.status !== 'completed').length}</span>
            <span className="stat-label">Overdue</span>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="filters-section">
        <div className="search-filters">
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search assignments..."
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
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="dueDate">Sort by Due Date</option>
            <option value="title">Sort by Title</option>
            <option value="subject">Sort by Subject</option>
            <option value="points">Sort by Points</option>
            <option value="priority">Sort by Priority</option>
          </select>
          <button className="btn-secondary">
            <FaFilter />
            Filter
          </button>
        </div>
      </div>

      {/* Assignment Tabs */}
      <div className="assignment-tabs">
        <button
          className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          <FaClipboardList />
          All Assignments ({assignments.length})
        </button>
        <button
          className={`tab-button ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          <FaClock />
          Pending ({assignments.filter(a => a.status === 'pending').length})
        </button>
        <button
          className={`tab-button ${activeTab === 'in_progress' ? 'active' : ''}`}
          onClick={() => setActiveTab('in_progress')}
        >
          <FaTasks />
          In Progress ({assignments.filter(a => a.status === 'in_progress').length})
        </button>
        <button
          className={`tab-button ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          <FaCheckCircle />
          Completed ({assignments.filter(a => a.status === 'completed').length})
        </button>
        <button
          className={`tab-button ${activeTab === 'overdue' ? 'active' : ''}`}
          onClick={() => setActiveTab('overdue')}
        >
          <FaExclamationTriangle />
          Overdue ({assignments.filter(a => isOverdue(a.dueDate) && a.status !== 'completed').length})
        </button>
      </div>

      {/* Assignments List */}
      <div className="assignments-list">
        {sortedAssignments.length > 0 ? (
          sortedAssignments.map(assignment => (
            <div key={assignment.id} className={`assignment-card ${assignment.priority}`}>
              <div className="assignment-header">
                <div className="assignment-title-section">
                  <h3>{assignment.title}</h3>
                  <div className="assignment-meta">
                    <span className="subject-badge">{assignment.subject}</span>
                    <span className="teacher-name">
                      <FaChalkboardTeacher />
                      {assignment.teacher}
                    </span>
                    <span className="class-name">{assignment.class}</span>
                  </div>
                </div>
                <div className="assignment-status-section">
                  {getStatusBadge(assignment.status)}
                  {getPriorityBadge(assignment.priority)}
                  <div className="points-badge">{assignment.points} pts</div>
                </div>
              </div>

              <div className="assignment-content">
                <p className="assignment-description">{assignment.description}</p>
                
                <div className="assignment-details">
                  <div className="detail-item">
                    <FaCalendarAlt />
                    <span>Due: {formatDate(assignment.dueDate)}</span>
                    <span className={`time-remaining ${isOverdue(assignment.dueDate) ? 'overdue' : ''}`}>
                      {getTimeRemaining(assignment.dueDate)}
                    </span>
                  </div>
                  <div className="detail-item">
                    <FaClock />
                    <span>Estimated Time: {assignment.estimatedTime} min</span>
                    {assignment.timeSpent > 0 && (
                      <span className="time-spent">Time Spent: {assignment.timeSpent} min</span>
                    )}
                  </div>
                </div>

                {assignment.attachments.length > 0 && (
                  <div className="attachments-section">
                    <h4>Attachments</h4>
                    <div className="attachments-list">
                      {assignment.attachments.map((attachment, index) => (
                        <div key={index} className="attachment-item">
                          <FaFilePdf />
                          <span>{attachment.name}</span>
                          <button className="download-btn">
                            <FaDownload />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {assignment.submittedFiles.length > 0 && (
                  <div className="submitted-files-section">
                    <h4>Submitted Files</h4>
                    <div className="submitted-files-list">
                      {assignment.submittedFiles.map((file, index) => (
                        <div key={index} className="submitted-file-item">
                          <FaFileAlt />
                          <span>{file.name}</span>
                          <span className="upload-time">
                            {formatDate(file.uploadedAt)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {assignment.grade && (
                  <div className="grade-section">
                    <h4>Grade & Feedback</h4>
                    <div className="grade-info">
                      <div className="grade-badge">{assignment.grade}</div>
                      <p className="feedback">{assignment.feedback}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="assignment-actions">
                {assignment.status === 'pending' && (
                  <button 
                    className="btn-primary"
                    onClick={() => handleSubmitAssignment(assignment.id)}
                  >
                    <FaUpload />
                    Start Assignment
                  </button>
                )}
                {assignment.status === 'in_progress' && (
                  <>
                    <button 
                      className="btn-primary"
                      onClick={() => handleSubmitAssignment(assignment.id)}
                    >
                      <FaUpload />
                      Submit Assignment
                    </button>
                    <button 
                      className="btn-secondary"
                      onClick={() => handleUploadFile(assignment.id)}
                    >
                      <FaPlus />
                      Add File
                    </button>
                  </>
                )}
                {assignment.status === 'completed' && (
                  <button className="btn-outline">
                    <FaEye />
                    View Submission
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
            <FaClipboardList />
            <h3>No Assignments Found</h3>
            <p>Try adjusting your search or filters</p>
            <button className="btn-primary">
              <FaPlus />
              Browse Available Assignments
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAssignmentsPage;