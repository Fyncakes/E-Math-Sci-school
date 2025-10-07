import React, { useState } from 'react';
import { 
  FaClipboardList, FaCalendarAlt, FaClock, FaFileAlt, FaUpload, 
  FaDownload, FaCheckCircle, FaExclamationTriangle, FaStar, 
  FaFilter, FaSearch, FaChevronDown, FaChevronUp, FaEdit,
  FaTrash, FaEye, FaBook, FaGraduationCap, FaChalkboardTeacher,
  FaFilePdf, FaFileWord, FaFilePowerpoint, FaFileExcel, FaVideo,
  FaRocket, FaTarget, FaLightbulb, FaTrophy, FaAward
} from 'react-icons/fa';

const StudentAssignmentsPage = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');

  const assignments = [
    {
      id: 1,
      title: 'Algebra Problem Set #3',
      subject: 'Mathematics',
      teacher: 'Dr. Sarah Johnson',
      grade: 'Grade 8',
      description: 'Solve the following algebraic equations and show your work',
      dueDate: '2024-01-20',
      dueTime: '11:59 PM',
      status: 'pending',
      priority: 'high',
      points: 100,
      submitted: false,
      submission: null,
      materials: [
        { name: 'Problem Set.pdf', type: 'PDF', size: '1.2 MB' },
        { name: 'Solution Template.docx', type: 'Word', size: '890 KB' }
      ],
      instructions: 'Complete all 15 problems. Show your work clearly. Submit as PDF.',
      rubric: 'Grading based on: Correctness (60%), Work shown (25%), Neatness (15%)'
    },
    {
      id: 2,
      title: 'Physics Lab Report - Motion',
      subject: 'Science',
      teacher: 'Prof. Michael Chen',
      grade: 'Grade 9',
      description: 'Write a comprehensive lab report on the motion experiment',
      dueDate: '2024-01-18',
      dueTime: '3:00 PM',
      status: 'submitted',
      priority: 'medium',
      points: 150,
      submitted: true,
      submission: {
        fileName: 'Lab_Report_Motion.pdf',
        submittedDate: '2024-01-17',
        submittedTime: '2:45 PM',
        grade: null,
        feedback: null
      },
      materials: [
        { name: 'Lab Instructions.pdf', type: 'PDF', size: '2.1 MB' },
        { name: 'Data Sheet.xlsx', type: 'Excel', size: '456 KB' }
      ],
      instructions: 'Include: Introduction, Methodology, Results, Analysis, Conclusion',
      rubric: 'Grading based on: Scientific accuracy (40%), Analysis (30%), Presentation (20%), Conclusion (10%)'
    },
    {
      id: 3,
      title: 'Chemistry Quiz - Periodic Table',
      subject: 'Science',
      teacher: 'Dr. Emily Davis',
      grade: 'Grade 10',
      description: 'Online quiz covering periodic table elements and properties',
      dueDate: '2024-01-16',
      dueTime: '11:59 PM',
      status: 'overdue',
      priority: 'high',
      points: 50,
      submitted: false,
      submission: null,
      materials: [
        { name: 'Periodic Table Reference.pdf', type: 'PDF', size: '3.4 MB' },
        { name: 'Study Guide.docx', type: 'Word', size: '1.8 MB' }
      ],
      instructions: 'Complete the online quiz. You have 30 minutes. No external resources allowed.',
      rubric: 'Grading based on: Correct answers (100%)'
    }
  ];

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === 'all' || assignment.subject === filterSubject;
    return matchesSearch && matchesSubject;
  });

  const getFileIcon = (type) => {
    switch (type) {
      case 'PDF': return <FaFilePdf />;
      case 'Word': return <FaFileWord />;
      case 'PowerPoint': return <FaFilePowerpoint />;
      case 'Excel': return <FaFileExcel />;
      case 'Video': return <FaVideo />;
      default: return <FaFileAlt />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'submitted': return 'success';
      case 'overdue': return 'danger';
      case 'graded': return 'info';
      default: return 'secondary';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const isOverdue = (dueDate, dueTime) => {
    const now = new Date();
    const due = new Date(`${dueDate} ${dueTime}`);
    return now > due;
  };

  return (
    <div className="student-assignments-page">
      <div className="page-header">
        <div className="header-content">
          <h1>My Assignments</h1>
          <p>Track your assignments, submit work, and view grades</p>
        </div>
        <div className="header-actions">
          <button className="btn-primary">
            <FaUpload />
            Submit Assignment
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
                placeholder="Search assignments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
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

          <div className="tab-navigation">
            <button
              className={`tab-button ${activeTab === 'pending' ? 'active' : ''}`}
              onClick={() => setActiveTab('pending')}
            >
              <FaClipboardList />
              Pending ({assignments.filter(a => a.status === 'pending').length})
            </button>
            <button
              className={`tab-button ${activeTab === 'submitted' ? 'active' : ''}`}
              onClick={() => setActiveTab('submitted')}
            >
              <FaCheckCircle />
              Submitted ({assignments.filter(a => a.status === 'submitted').length})
            </button>
            <button
              className={`tab-button ${activeTab === 'overdue' ? 'active' : ''}`}
              onClick={() => setActiveTab('overdue')}
            >
              <FaExclamationTriangle />
              Overdue ({assignments.filter(a => a.status === 'overdue').length})
            </button>
          </div>
        </div>

        <div className="assignments-grid">
          {filteredAssignments
            .filter(assignment => {
              if (activeTab === 'pending') return assignment.status === 'pending';
              if (activeTab === 'submitted') return assignment.status === 'submitted';
              if (activeTab === 'overdue') return assignment.status === 'overdue';
              return true;
            })
            .map(assignment => (
            <div key={assignment.id} className="assignment-card">
              <div className="assignment-header">
                <div className="assignment-info">
                  <h3>{assignment.title}</h3>
                  <div className="assignment-meta">
                    <span className="subject">
                      <FaBook />
                      {assignment.subject}
                    </span>
                    <span className="teacher">
                      <FaChalkboardTeacher />
                      {assignment.teacher}
                    </span>
                    <span className="grade">
                      <FaGraduationCap />
                      {assignment.grade}
                    </span>
                  </div>
                </div>
                <div className="assignment-status">
                  <span className={`status-badge ${getStatusColor(assignment.status)}`}>
                    {assignment.status}
                  </span>
                  <span className={`priority-badge ${getPriorityColor(assignment.priority)}`}>
                    {assignment.priority}
                  </span>
                </div>
              </div>

              <div className="assignment-details">
                <p className="assignment-description">{assignment.description}</p>

                <div className="due-date-section">
                  <div className="due-info">
                    <FaCalendarAlt />
                    <span>Due: {assignment.dueDate} at {assignment.dueTime}</span>
                  </div>
                  <div className="points-info">
                    <FaStar />
                    <span>{assignment.points} points</span>
                  </div>
                </div>

                {assignment.status === 'pending' && (
                  <div className="assignment-actions">
                    <button className="btn-primary">
                      <FaEdit />
                      Start Assignment
                    </button>
                    <button className="btn-secondary">
                      <FaEye />
                      View Instructions
                    </button>
                  </div>
                )}

                {assignment.status === 'submitted' && (
                  <div className="submission-info">
                    <div className="submission-details">
                      <FaCheckCircle />
                      <span>Submitted on {assignment.submission.submittedDate} at {assignment.submission.submittedTime}</span>
                    </div>
                    <div className="submission-file">
                      <FaFileAlt />
                      <span>{assignment.submission.fileName}</span>
                      <button className="download-btn">
                        <FaDownload />
                      </button>
                    </div>
                  </div>
                )}

                {assignment.status === 'overdue' && (
                  <div className="overdue-warning">
                    <FaExclamationTriangle />
                    <span>This assignment is overdue. Please submit as soon as possible.</span>
                  </div>
                )}

                <div className="materials-section">
                  <h4>Assignment Materials</h4>
                  <div className="materials-list">
                    {assignment.materials.map((material, index) => (
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

                <div className="instructions-section">
                  <h4>Instructions</h4>
                  <p>{assignment.instructions}</p>
                </div>

                <div className="rubric-section">
                  <h4>Grading Rubric</h4>
                  <p>{assignment.rubric}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAssignments.length === 0 && (
          <div className="empty-state">
            <FaClipboardList />
            <h3>No assignments found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAssignmentsPage;
