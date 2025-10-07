import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUser, FaGraduationCap, FaChartLine, FaBook, FaClipboardList, 
  FaTrophy, FaCalendarAlt, FaClock, FaVideo, FaFileAlt, FaDownload,
  FaPlay, FaCheckCircle, FaExclamationTriangle, FaStar, FaBell,
  FaCog, FaSignOutAlt, FaSearch, FaFilter, FaSort, FaPlus,
  FaEye, FaEdit, FaTrash, FaArrowUp, FaArrowDown, FaMinus,
  FaUsers, FaChalkboardTeacher, FaTasks, FaAward, FaMedal,
  FaRocket, FaTarget, FaLightbulb, FaBookOpen, FaFilePdf,
  FaVideo as FaVideoIcon, FaImage, FaMusic, FaCode
} from 'react-icons/fa';

const StudentDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [studentData, setStudentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate different student profiles
  const studentProfiles = {
    'sarah': {
      id: 'sarah',
      name: 'Sarah Johnson',
      grade: 'Grade 8',
      program: 'Middle School STEM',
      progress: 75,
      avatar: 'SJ',
      theme: 'blue',
      nextClass: 'Mathematics - Algebra Basics',
      nextClassTime: 'Today at 2:00 PM',
      achievements: ['Math Star', 'Science Explorer', 'Perfect Attendance'],
      streak: 12,
      totalPoints: 2450
    },
    'alex': {
      id: 'alex',
      name: 'Alex Chen',
      grade: 'Grade 10',
      program: 'High School Advanced',
      progress: 88,
      avatar: 'AC',
      theme: 'green',
      nextClass: 'Physics - Quantum Mechanics',
      nextClassTime: 'Tomorrow at 10:00 AM',
      achievements: ['Physics Genius', 'Lab Master', 'Top Performer'],
      streak: 18,
      totalPoints: 3200
    },
    'emily': {
      id: 'emily',
      name: 'Emily Davis',
      grade: 'Grade 6',
      program: 'Elementary Math',
      progress: 92,
      avatar: 'ED',
      theme: 'purple',
      nextClass: 'Mathematics - Fractions',
      nextClassTime: 'Today at 9:00 AM',
      achievements: ['Math Whiz', 'Creative Thinker', 'Team Player'],
      streak: 25,
      totalPoints: 1800
    },
    'michael': {
      id: 'michael',
      name: 'Michael Brown',
      grade: 'Grade 11',
      program: 'High School Advanced',
      progress: 81,
      avatar: 'MB',
      theme: 'orange',
      nextClass: 'Chemistry - Organic Chemistry',
      nextClassTime: 'Wednesday at 3:00 PM',
      achievements: ['Chemistry Expert', 'Problem Solver', 'Future Scientist'],
      streak: 15,
      totalPoints: 2800
    }
  };

  // Get student data based on URL or localStorage
  useEffect(() => {
    const studentId = localStorage.getItem('studentId') || 'sarah';
    setStudentData(studentProfiles[studentId]);
    setIsLoading(false);
  }, []);

  if (isLoading || !studentData) {
    return (
      <div className="student-dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  const upcomingClasses = [
    {
      id: 1,
      subject: 'Mathematics',
      topic: 'Algebra Basics',
      time: 'Today 2:00 PM',
      teacher: 'Ms. Emily Chen',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      status: 'upcoming',
      duration: '45 min',
      room: 'Virtual Room A'
    },
    {
      id: 2,
      subject: 'Science',
      topic: 'Chemistry Lab',
      time: 'Tomorrow 10:00 AM',
      teacher: 'Prof. Michael Johnson',
      meetingLink: 'https://meet.google.com/xyz-1234-abc',
      status: 'upcoming',
      duration: '60 min',
      room: 'Lab Room 2'
    },
    {
      id: 3,
      subject: 'Physics',
      topic: 'Forces and Motion',
      time: 'Wednesday 3:00 PM',
      teacher: 'Dr. Sarah Williams',
      meetingLink: 'https://meet.google.com/def-5678-ghi',
      status: 'upcoming',
      duration: '50 min',
      room: 'Physics Lab'
    }
  ];

  const assignments = [
    {
      id: 1,
      title: 'Algebra Worksheet #5',
      subject: 'Mathematics',
      dueDate: 'Tomorrow',
      status: 'pending',
      points: 25,
      priority: 'high',
      description: 'Complete problems 1-20 on quadratic equations'
    },
    {
      id: 2,
      title: 'Chemistry Lab Report',
      subject: 'Science',
      dueDate: 'Friday',
      status: 'in-progress',
      points: 50,
      priority: 'medium',
      description: 'Write a detailed report on the acid-base titration experiment'
    },
    {
      id: 3,
      title: 'Physics Problem Set',
      subject: 'Physics',
      dueDate: 'Next Monday',
      status: 'pending',
      points: 30,
      priority: 'low',
      description: 'Solve problems on Newton\'s laws of motion'
    }
  ];

  const recentGrades = [
    {
      subject: 'Mathematics',
      assignment: 'Algebra Quiz #3',
      grade: 'A',
      points: '18/20',
      date: 'Last Friday',
      improvement: '+2'
    },
    {
      subject: 'Science',
      assignment: 'Chemistry Test',
      grade: 'B+',
      points: '42/50',
      date: 'Last Wednesday',
      improvement: '+5'
    },
    {
      subject: 'Physics',
      assignment: 'Forces Lab',
      grade: 'A-',
      points: '28/30',
      date: 'Last Monday',
      improvement: '+3'
    }
  ];

  const resources = [
    {
      title: 'Algebra Study Guide',
      type: 'PDF',
      subject: 'Mathematics',
      size: '2.3 MB',
      downloads: 45,
      rating: 4.8
    },
    {
      title: 'Chemistry Lab Manual',
      type: 'PDF',
      subject: 'Science',
      size: '5.1 MB',
      downloads: 32,
      rating: 4.6
    },
    {
      title: 'Physics Formula Sheet',
      type: 'PDF',
      subject: 'Physics',
      size: '1.8 MB',
      downloads: 67,
      rating: 4.9
    },
    {
      title: 'Interactive Math Problems',
      type: 'Interactive',
      subject: 'Mathematics',
      size: 'Online',
      downloads: 89,
      rating: 4.7
    }
  ];

  const progressData = [
    { subject: 'Mathematics', progress: 80, color: '#667eea' },
    { subject: 'Science', progress: 75, color: '#48bb78' },
    { subject: 'Physics', progress: 70, color: '#ed8936' },
    { subject: 'English', progress: 85, color: '#9f7aea' }
  ];

  const recentActivity = [
    { 
      id: 1, 
      type: 'completed', 
      message: 'Completed Algebra Quiz #3', 
      time: '2 hours ago',
      points: 18,
      icon: FaCheckCircle
    },
    { 
      id: 2, 
      type: 'submitted', 
      message: 'Submitted Chemistry Lab Report', 
      time: '1 day ago',
      points: 50,
      icon: FaFileAlt
    },
    { 
      id: 3, 
      type: 'attended', 
      message: 'Attended Physics Class', 
      time: '2 days ago',
      points: 10,
      icon: FaGraduationCap
    },
    { 
      id: 4, 
      type: 'achievement', 
      message: 'Earned Math Star Badge', 
      time: '3 days ago',
      points: 100,
      icon: FaTrophy
    }
  ];

  const getThemeClass = () => `theme-${studentData.theme}`;

  return (
    <div className={`student-dashboard ${getThemeClass()}`}>
      {/* Modern Header */}
      <header className="student-header">
        <div className="student-header-content">
          <div className="student-brand">
            <div className="student-logo">
              <FaGraduationCap />
            </div>
            <div className="student-title">
              <h1>E-School</h1>
              <span>Student Portal</span>
            </div>
          </div>
          
          <div className="student-header-actions">
            <div className="student-search">
              <FaSearch />
              <input type="text" placeholder="Search classes, assignments..." />
            </div>
            
            <button className="student-notification-btn">
              <FaBell />
              <span className="notification-badge">3</span>
            </button>
            
            <div className="student-user-menu">
              <div className="student-avatar">
                {studentData.avatar}
              </div>
              <div className="student-user-info">
                <span className="student-user-name">{studentData.name}</span>
                <span className="student-user-grade">{studentData.grade}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Banner */}
      <div className="progress-banner">
        <div className="progress-content">
          <div className="progress-info">
            <h2>Welcome back, {studentData.name}!</h2>
            <p>{studentData.grade} • {studentData.program}</p>
          </div>
          <div className="progress-circle">
            <div className="progress-value">{studentData.progress}%</div>
            <div className="progress-label">Overall Progress</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="student-nav">
        <div className="nav-tabs">
          <button 
            className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <FaChartLine />
            <span>Overview</span>
          </button>
          <button 
            className={`nav-tab ${activeTab === 'classes' ? 'active' : ''}`}
            onClick={() => setActiveTab('classes')}
          >
            <FaGraduationCap />
            <span>Classes</span>
          </button>
          <button 
            className={`nav-tab ${activeTab === 'assignments' ? 'active' : ''}`}
            onClick={() => setActiveTab('assignments')}
          >
            <FaClipboardList />
            <span>Assignments</span>
          </button>
          <button 
            className={`nav-tab ${activeTab === 'grades' ? 'active' : ''}`}
            onClick={() => setActiveTab('grades')}
          >
            <FaTrophy />
            <span>Grades</span>
          </button>
          <button 
            className={`nav-tab ${activeTab === 'resources' ? 'active' : ''}`}
            onClick={() => setActiveTab('resources')}
          >
            <FaBook />
            <span>Resources</span>
          </button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="student-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="overview-grid">
              {/* Next Class Card */}
              <div className="overview-card next-class">
                <div className="card-header">
                  <h3>Next Class</h3>
                  <span className="status-badge upcoming">Upcoming</span>
                </div>
                <div className="class-info">
                  <h4>{studentData.nextClass}</h4>
                  <p><FaClock /> {studentData.nextClassTime}</p>
                  <button className="join-btn">
                    <FaVideo />
                    Join Class
                  </button>
                </div>
              </div>

              {/* Progress Overview */}
              <div className="overview-card progress-card">
                <div className="card-header">
                  <h3>Progress Overview</h3>
                  <span className="progress-total">{studentData.progress}%</span>
                </div>
                <div className="progress-bars">
                  {progressData.map((item, index) => (
                    <div key={index} className="progress-item">
                      <div className="progress-label">
                        <span>{item.subject}</span>
                        <span>{item.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{
                            width: `${item.progress}%`,
                            backgroundColor: item.color
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="overview-card recent-activity">
                <div className="card-header">
                  <h3>Recent Activity</h3>
                  <Link to="/activity" className="view-all">View All</Link>
                </div>
                <div className="activity-list">
                  {recentActivity.map(activity => (
                    <div key={activity.id} className="activity-item">
                      <div className="activity-icon">
                        <activity.icon />
                      </div>
                      <div className="activity-content">
                        <p className="activity-message">{activity.message}</p>
                        <div className="activity-meta">
                          <span className="activity-time">{activity.time}</span>
                          <span className="activity-points">+{activity.points} pts</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="overview-card achievements">
                <div className="card-header">
                  <h3>Achievements</h3>
                  <span className="achievement-count">{studentData.achievements.length}</span>
                </div>
                <div className="achievements-list">
                  {studentData.achievements.map((achievement, index) => (
                    <div key={index} className="achievement-item">
                      <FaMedal />
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Cards */}
              <div className="overview-card stats">
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-icon">
                      <FaRocket />
                    </div>
                    <div className="stat-content">
                      <div className="stat-number">{studentData.streak}</div>
                      <div className="stat-label">Day Streak</div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon">
                      <FaStar />
                    </div>
                    <div className="stat-content">
                      <div className="stat-number">{studentData.totalPoints}</div>
                      <div className="stat-label">Total Points</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'classes' && (
          <div className="classes-tab">
            <div className="tab-header">
              <h2>Upcoming Classes</h2>
              <div className="tab-actions">
                <button className="btn-primary">
                  <FaPlus />
                  Add Class
                </button>
                <button className="btn-secondary">
                  <FaCalendarAlt />
                  View Calendar
                </button>
              </div>
            </div>
            
            <div className="classes-grid">
              {upcomingClasses.map(classItem => (
                <div key={classItem.id} className="class-card">
                  <div className="class-header">
                    <h3>{classItem.subject}</h3>
                    <span className={`class-status ${classItem.status}`}>
                      {classItem.status}
                    </span>
                  </div>
                  <div className="class-details">
                    <h4>{classItem.topic}</h4>
                    <p><FaUser /> {classItem.teacher}</p>
                    <p><FaClock /> {classItem.time}</p>
                    <p><FaGraduationCap /> {classItem.room}</p>
                    <p><FaClock /> Duration: {classItem.duration}</p>
                  </div>
                  <div className="class-actions">
                    <a 
                      href={classItem.meetingLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="join-class-btn"
                    >
                      <FaVideo />
                      Join Google Meet
                    </a>
                    <button className="class-notes-btn">
                      <FaFileAlt />
                      View Notes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'assignments' && (
          <div className="assignments-tab">
            <div className="tab-header">
              <h2>Your Assignments</h2>
              <div className="tab-actions">
                <button className="btn-primary">
                  <FaPlus />
                  New Assignment
                </button>
                <button className="btn-secondary">
                  <FaFilter />
                  Filter
                </button>
              </div>
            </div>
            
            <div className="assignments-grid">
              {assignments.map(assignment => (
                <div key={assignment.id} className="assignment-card">
                  <div className="assignment-header">
                    <h3>{assignment.title}</h3>
                    <span className={`assignment-status ${assignment.status}`}>
                      {assignment.status}
                    </span>
                  </div>
                  <div className="assignment-details">
                    <p><FaBook /> {assignment.subject}</p>
                    <p><FaCalendarAlt /> Due: {assignment.dueDate}</p>
                    <p><FaStar /> Points: {assignment.points}</p>
                    <p className="assignment-description">{assignment.description}</p>
                  </div>
                  <div className="assignment-actions">
                    <button className="view-assignment-btn">
                      <FaEye />
                      View Assignment
                    </button>
                    <button className="submit-btn">
                      <FaFileAlt />
                      Submit Work
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'grades' && (
          <div className="grades-tab">
            <div className="tab-header">
              <h2>Your Grades</h2>
              <div className="tab-actions">
                <button className="btn-primary">
                  <FaDownload />
                  Export Grades
                </button>
                <button className="btn-secondary">
                  <FaChartLine />
                  View Analytics
                </button>
              </div>
            </div>
            
            <div className="grades-table">
              <div className="grades-header">
                <div>Subject</div>
                <div>Assignment</div>
                <div>Grade</div>
                <div>Points</div>
                <div>Date</div>
                <div>Improvement</div>
              </div>
              {recentGrades.map((grade, index) => (
                <div key={index} className="grades-row">
                  <div>{grade.subject}</div>
                  <div>{grade.assignment}</div>
                  <div className={`grade-value ${grade.grade}`}>{grade.grade}</div>
                  <div>{grade.points}</div>
                  <div>{grade.date}</div>
                  <div className="improvement positive">
                    <FaArrowUp />
                    {grade.improvement}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="resources-tab">
            <div className="tab-header">
              <h2>Learning Resources</h2>
              <div className="tab-actions">
                <button className="btn-primary">
                  <FaPlus />
                  Upload Resource
                </button>
                <button className="btn-secondary">
                  <FaSearch />
                  Search
                </button>
              </div>
            </div>
            
            <div className="resources-grid">
              {resources.map((resource, index) => (
                <div key={index} className="resource-card">
                  <div className="resource-icon">
                    {resource.type === 'PDF' ? <FaFilePdf /> : 
                     resource.type === 'Video' ? <FaVideoIcon /> :
                     resource.type === 'Interactive' ? <FaCode /> : <FaFileAlt />}
                  </div>
                  <div className="resource-info">
                    <h3>{resource.title}</h3>
                    <p><FaBook /> {resource.subject}</p>
                    <p><FaDownload /> {resource.size}</p>
                    <div className="resource-meta">
                      <span><FaDownload /> {resource.downloads} downloads</span>
                      <span><FaStar /> {resource.rating}/5</span>
                    </div>
                  </div>
                  <div className="resource-actions">
                    <button className="download-btn">
                      <FaDownload />
                      Download
                    </button>
                    <button className="view-btn">
                      <FaEye />
                      View
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

export default StudentDashboardPage;