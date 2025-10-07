import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUsers, FaChalkboardTeacher, FaBook, FaClipboardList, FaChartBar, 
  FaCog, FaBell, FaSignOutAlt, FaPlus, FaEdit, FaTrash, FaEye,
  FaGraduationCap, FaUserPlus, FaBookOpen, FaTasks, FaCalendarAlt,
  FaFileAlt, FaVideo, FaImage, FaDownload, FaUpload, FaSearch,
  FaFilter, FaSort, FaChevronDown, FaChevronUp, FaCheck, FaTimes,
  FaClock, FaCheckCircle, FaExclamationTriangle, FaInfoCircle,
  FaArrowUp, FaArrowDown, FaMinus, FaCrown, FaStar, FaTrophy
} from 'react-icons/fa';

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifications, setNotifications] = useState(3);

  const stats = {
    students: 487,
    teachers: 52,
    classes: 24,
    courses: 18,
    assignments: 156,
    pending: 8,
    revenue: 125000,
    growth: 12.5
  };

  const recentActivity = [
    { 
      id: 1, 
      type: 'student', 
      message: 'New student registration: John Smith', 
      time: '2 hours ago', 
      status: 'pending',
      priority: 'high',
      avatar: 'JS'
    },
    { 
      id: 2, 
      type: 'course', 
      message: 'New lesson uploaded: Advanced Calculus', 
      time: '4 hours ago', 
      status: 'completed',
      priority: 'medium',
      avatar: 'AC'
    },
    { 
      id: 3, 
      type: 'teacher', 
      message: 'Teacher application approved: Dr. Lisa Johnson', 
      time: '6 hours ago', 
      status: 'completed',
      priority: 'low',
      avatar: 'LJ'
    },
    { 
      id: 4, 
      type: 'assignment', 
      message: 'Assignment submitted: Math Homework #3', 
      time: '8 hours ago', 
      status: 'pending',
      priority: 'medium',
      avatar: 'MH'
    }
  ];

  const systemAlerts = [
    { 
      id: 1, 
      type: 'warning', 
      message: 'Server load is high (85%)', 
      time: '2 hours ago', 
      action: 'Dismiss',
      icon: FaExclamationTriangle
    },
    { 
      id: 2, 
      type: 'info', 
      message: 'New student registrations require review', 
      time: '4 hours ago', 
      action: 'Review',
      icon: FaInfoCircle
    },
    { 
      id: 3, 
      type: 'success', 
      message: 'Backup completed successfully', 
      time: '6 hours ago', 
      action: null,
      icon: FaCheckCircle
    }
  ];

  const topStudents = [
    { name: 'Alex Johnson', grade: 'Grade 11', score: 98, subject: 'Mathematics' },
    { name: 'Sarah Chen', grade: 'Grade 10', score: 96, subject: 'Physics' },
    { name: 'Michael Brown', grade: 'Grade 9', score: 94, subject: 'Chemistry' },
    { name: 'Emily Davis', grade: 'Grade 12', score: 92, subject: 'Advanced Math' }
  ];

  const upcomingEvents = [
    { title: 'Parent-Teacher Conference', date: 'March 20, 2024', time: '2:00 PM', type: 'meeting' },
    { title: 'Science Fair', date: 'March 25, 2024', time: '9:00 AM', type: 'event' },
    { title: 'Math Competition', date: 'March 30, 2024', time: '10:00 AM', type: 'competition' },
    { title: 'Staff Meeting', date: 'April 2, 2024', time: '3:00 PM', type: 'meeting' }
  ];

  const handleApprove = (id) => {
    console.log(`Approving item ${id}`);
    // Handle approval logic
  };

  const handleReject = (id) => {
    console.log(`Rejecting item ${id}`);
    // Handle rejection logic
  };

  const dismissNotification = () => {
    setNotifications(0);
  };

  return (
    <div className="admin-dashboard">
      {/* Modern Header */}
      <header className="admin-header">
        <div className="admin-header-content">
          <div className="admin-brand">
            <div className="admin-logo">
              <FaGraduationCap />
            </div>
            <div className="admin-title">
              <h1>E-School Admin</h1>
              <span>Management Dashboard</span>
            </div>
          </div>
          
          <div className="admin-header-actions">
            <div className="admin-search">
              <FaSearch />
              <input type="text" placeholder="Search students, teachers, courses..." />
            </div>
            
            <button className="admin-notification-btn" onClick={dismissNotification}>
              <FaBell />
              {notifications > 0 && <span className="notification-badge">{notifications}</span>}
            </button>
            
            <div className="admin-user-menu">
              <div className="admin-user-avatar">
                <FaCrown />
              </div>
              <div className="admin-user-info">
                <span className="admin-user-name">Admin User</span>
                <span className="admin-user-role">Administrator</span>
              </div>
              <FaChevronDown />
            </div>
          </div>
        </div>
      </header>

      <div className="admin-layout">
        {/* Modern Sidebar */}
        <aside className={`admin-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="sidebar-header">
            <button 
              className="sidebar-toggle"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              {sidebarCollapsed ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
          
          <nav className="admin-nav">
            <button 
              className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <FaChartBar />
              <span>Overview</span>
            </button>
            
            <button 
              className={`admin-nav-item ${activeTab === 'students' ? 'active' : ''}`}
              onClick={() => setActiveTab('students')}
            >
              <FaUsers />
              <span>Students</span>
              <span className="nav-badge">{stats.students}</span>
            </button>
            
            <button 
              className={`admin-nav-item ${activeTab === 'teachers' ? 'active' : ''}`}
              onClick={() => setActiveTab('teachers')}
            >
              <FaChalkboardTeacher />
              <span>Teachers</span>
              <span className="nav-badge">{stats.teachers}</span>
            </button>
            
            <button 
              className={`admin-nav-item ${activeTab === 'courses' ? 'active' : ''}`}
              onClick={() => setActiveTab('courses')}
            >
              <FaBook />
              <span>Courses</span>
              <span className="nav-badge">{stats.courses}</span>
            </button>
            
            <button 
              className={`admin-nav-item ${activeTab === 'assignments' ? 'active' : ''}`}
              onClick={() => setActiveTab('assignments')}
            >
              <FaClipboardList />
              <span>Assignments</span>
              <span className="nav-badge">{stats.assignments}</span>
            </button>
            
            <button 
              className={`admin-nav-item ${activeTab === 'content' ? 'active' : ''}`}
              onClick={() => setActiveTab('content')}
            >
              <FaFileAlt />
              <span>Content</span>
            </button>
            
            <button 
              className={`admin-nav-item ${activeTab === 'media' ? 'active' : ''}`}
              onClick={() => setActiveTab('media')}
            >
              <FaVideo />
              <span>Media</span>
            </button>
            
            <button 
              className={`admin-nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              <FaChartBar />
              <span>Analytics</span>
            </button>
            
            <button 
              className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <FaCog />
              <span>Settings</span>
            </button>
          </nav>
          
          <div className="sidebar-footer">
            <Link to="/" className="admin-logout-btn">
              <FaSignOutAlt />
              <span>Logout</span>
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="admin-main">
          {activeTab === 'overview' && (
            <div className="admin-section">
              <div className="section-header">
                <h2>Dashboard Overview</h2>
                <div className="section-actions">
                  <button className="btn-primary">
                    <FaPlus />
                    Quick Add
                  </button>
                  <button className="btn-secondary">
                    <FaDownload />
                    Export Data
                  </button>
                </div>
              </div>

              {/* Modern Stats Grid */}
              <div className="stats-grid">
                <div className="stat-card primary">
                  <div className="stat-icon">
                    <FaUsers />
                  </div>
                  <div className="stat-content">
                    <div className="stat-number">{stats.students}</div>
                    <div className="stat-label">Total Students</div>
                    <div className="stat-change positive">
                      <FaArrowUp />
                      +12 this week
                    </div>
                  </div>
                </div>
                
                <div className="stat-card success">
                  <div className="stat-icon">
                    <FaChalkboardTeacher />
                  </div>
                  <div className="stat-content">
                    <div className="stat-number">{stats.teachers}</div>
                    <div className="stat-label">Active Teachers</div>
                    <div className="stat-change positive">
                      <FaArrowUp />
                      +3 this month
                    </div>
                  </div>
                </div>
                
                <div className="stat-card warning">
                  <div className="stat-icon">
                    <FaBook />
                  </div>
                  <div className="stat-content">
                    <div className="stat-number">{stats.classes}</div>
                    <div className="stat-label">Active Classes</div>
                    <div className="stat-change neutral">
                      <FaMinus />
                      No change
                    </div>
                  </div>
                </div>
                
                <div className="stat-card info">
                  <div className="stat-icon">
                    <FaClipboardList />
                  </div>
                  <div className="stat-content">
                    <div className="stat-number">{stats.courses}</div>
                    <div className="stat-label">Total Courses</div>
                    <div className="stat-change positive">
                      <FaArrowUp />
                      +2 new
                    </div>
                  </div>
                </div>
                
                <div className="stat-card danger">
                  <div className="stat-icon">
                    <FaTasks />
                  </div>
                  <div className="stat-content">
                    <div className="stat-number">{stats.pending}</div>
                    <div className="stat-label">Pending Approvals</div>
                    <div className="stat-change negative">
                      <FaExclamationTriangle />
                      Requires attention
                    </div>
                  </div>
                </div>
                
                <div className="stat-card secondary">
                  <div className="stat-icon">
                    <FaTrophy />
                  </div>
                  <div className="stat-content">
                    <div className="stat-number">${stats.revenue.toLocaleString()}</div>
                    <div className="stat-label">Revenue</div>
                    <div className="stat-change positive">
                      <FaArrowUp />
                      +{stats.growth}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="dashboard-content">
                <div className="content-grid">
                  <div className="content-card">
                    <div className="card-header">
                      <h3>Recent Activity</h3>
                      <button className="btn-text">View All</button>
                    </div>
                    <div className="activity-list">
                      {recentActivity.map(activity => (
                        <div key={activity.id} className="activity-item">
                          <div className="activity-avatar">
                            {activity.avatar}
                          </div>
                          <div className="activity-content">
                            <p className="activity-message">{activity.message}</p>
                            <div className="activity-meta">
                              <span className="activity-time">{activity.time}</span>
                              <span className={`activity-status ${activity.status}`}>
                                {activity.status === 'pending' ? <FaClock /> : <FaCheckCircle />}
                                {activity.status}
                              </span>
                            </div>
                          </div>
                          <div className="activity-actions">
                            <button className="btn-small">
                              {activity.status === 'pending' ? 'Review' : 'View'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="content-card">
                    <div className="card-header">
                      <h3>System Alerts</h3>
                      <button className="btn-text">Manage</button>
                    </div>
                    <div className="alerts-list">
                      {systemAlerts.map(alert => (
                        <div key={alert.id} className={`alert-item ${alert.type}`}>
                          <div className="alert-icon">
                            <alert.icon />
                          </div>
                          <div className="alert-content">
                            <p className="alert-message">{alert.message}</p>
                            <span className="alert-time">{alert.time}</span>
                          </div>
                          {alert.action && (
                            <button className="btn-small">
                              {alert.action}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="content-card">
                    <div className="card-header">
                      <h3>Top Students</h3>
                      <button className="btn-text">View All</button>
                    </div>
                    <div className="top-students-list">
                      {topStudents.map((student, index) => (
                        <div key={index} className="student-item">
                          <div className="student-rank">
                            <FaTrophy className={index < 3 ? 'trophy' : ''} />
                            {index + 1}
                          </div>
                          <div className="student-info">
                            <h4>{student.name}</h4>
                            <p>{student.grade} - {student.subject}</p>
                          </div>
                          <div className="student-score">
                            <span className="score">{student.score}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="content-card">
                    <div className="card-header">
                      <h3>Upcoming Events</h3>
                      <button className="btn-text">View Calendar</button>
                    </div>
                    <div className="events-list">
                      {upcomingEvents.map((event, index) => (
                        <div key={index} className="event-item">
                          <div className="event-icon">
                            <FaCalendarAlt />
                          </div>
                          <div className="event-content">
                            <h4>{event.title}</h4>
                            <p>{event.date} at {event.time}</p>
                          </div>
                          <div className="event-type">
                            <span className={`type-badge ${event.type}`}>{event.type}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Students Tab */}
          {activeTab === 'students' && (
            <div className="admin-section">
              <div className="section-header">
                <h2>Student Management</h2>
                <div className="section-actions">
                  <button className="btn-primary">
                    <FaPlus />
                    Add Student
                  </button>
                  <button className="btn-secondary">
                    <FaUpload />
                    Import Students
                  </button>
                  <button className="btn-outline">
                    <FaDownload />
                    Export Data
                  </button>
                </div>
              </div>
              
              <div className="content-card">
                <div className="card-header">
                  <h3>All Students</h3>
                  <div className="card-filters">
                    <div className="search-box">
                      <FaSearch />
                      <input type="text" placeholder="Search students..." />
                    </div>
                    <button className="btn-outline">
                      <FaFilter />
                      Filter
                    </button>
                    <button className="btn-outline">
                      <FaSort />
                      Sort
                    </button>
                  </div>
                </div>
                <div className="table-container">
                  <div className="modern-table">
                    <div className="table-header">
                      <div className="table-cell">Student</div>
                      <div className="table-cell">Grade</div>
                      <div className="table-cell">Program</div>
                      <div className="table-cell">Status</div>
                      <div className="table-cell">Last Active</div>
                      <div className="table-cell">Actions</div>
                    </div>
                    <div className="table-body">
                      <div className="table-row">
                        <div className="table-cell">
                          <div className="student-info">
                            <div className="student-avatar">JS</div>
                            <div>
                              <h4>John Smith</h4>
                              <p>john.smith@email.com</p>
                            </div>
                          </div>
                        </div>
                        <div className="table-cell">Grade 9</div>
                        <div className="table-cell">High School Advanced</div>
                        <div className="table-cell">
                          <span className="status-badge active">Active</span>
                        </div>
                        <div className="table-cell">2 hours ago</div>
                        <div className="table-cell">
                          <div className="action-buttons">
                            <button className="btn-icon" title="View">
                              <FaEye />
                            </button>
                            <button className="btn-icon" title="Edit">
                              <FaEdit />
                            </button>
                            <button className="btn-icon danger" title="Delete">
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Teachers Tab */}
          {activeTab === 'teachers' && (
            <div className="admin-section">
              <div className="section-header">
                <h2>Teacher Management</h2>
                <div className="section-actions">
                  <button className="btn-primary">
                    <FaPlus />
                    Add Teacher
                  </button>
                  <button className="btn-secondary">
                    <FaCalendarAlt />
                    Schedule
                  </button>
                </div>
              </div>
              
              <div className="content-card">
                <div className="card-header">
                  <h3>All Teachers</h3>
                  <div className="card-filters">
                    <div className="search-box">
                      <FaSearch />
                      <input type="text" placeholder="Search teachers..." />
                    </div>
                    <button className="btn-outline">
                      <FaFilter />
                      Filter
                    </button>
                  </div>
                </div>
                <div className="table-container">
                  <p className="empty-state">Teacher management interface will be implemented here.</p>
                </div>
              </div>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div className="admin-section">
              <div className="section-header">
                <h2>Course Management</h2>
                <div className="section-actions">
                  <button className="btn-primary">
                    <FaPlus />
                    Create Course
                  </button>
                  <button className="btn-secondary">
                    <FaBookOpen />
                    Curriculum
                  </button>
                </div>
              </div>
              
              <div className="content-card">
                <div className="card-header">
                  <h3>All Courses</h3>
                  <div className="card-filters">
                    <div className="search-box">
                      <FaSearch />
                      <input type="text" placeholder="Search courses..." />
                    </div>
                    <button className="btn-outline">
                      <FaFilter />
                      Filter
                    </button>
                  </div>
                </div>
                <div className="table-container">
                  <p className="empty-state">Course management interface will be implemented here.</p>
                </div>
              </div>
            </div>
          )}

          {/* Assignments Tab */}
          {activeTab === 'assignments' && (
            <div className="admin-section">
              <div className="section-header">
                <h2>Assignment Management</h2>
                <div className="section-actions">
                  <button className="btn-primary">
                    <FaPlus />
                    Create Assignment
                  </button>
                  <button className="btn-secondary">
                    <FaTasks />
                    Bulk Actions
                  </button>
                </div>
              </div>
              
              <div className="content-card">
                <div className="card-header">
                  <h3>All Assignments</h3>
                  <div className="card-filters">
                    <div className="search-box">
                      <FaSearch />
                      <input type="text" placeholder="Search assignments..." />
                    </div>
                    <button className="btn-outline">
                      <FaFilter />
                      Filter
                    </button>
                  </div>
                </div>
                <div className="table-container">
                  <p className="empty-state">Assignment management interface will be implemented here.</p>
                </div>
              </div>
            </div>
          )}

          {/* Content Tab */}
          {activeTab === 'content' && (
            <div className="admin-section">
              <div className="section-header">
                <h2>Content Management</h2>
                <div className="section-actions">
                  <button className="btn-primary">
                    <FaPlus />
                    Add Content
                  </button>
                  <button className="btn-secondary">
                    <FaFileAlt />
                    Templates
                  </button>
                </div>
              </div>
              
              <div className="content-grid">
                <div className="content-card">
                  <div className="card-header">
                    <h3>Lessons</h3>
                    <button className="btn-text">View All</button>
                  </div>
                  <p className="empty-state">Lesson management interface will be implemented here.</p>
                </div>
                
                <div className="content-card">
                  <div className="card-header">
                    <h3>Resources</h3>
                    <button className="btn-text">View All</button>
                  </div>
                  <p className="empty-state">Resource management interface will be implemented here.</p>
                </div>
              </div>
            </div>
          )}

          {/* Media Tab */}
          {activeTab === 'media' && (
            <div className="admin-section">
              <div className="section-header">
                <h2>Media Management</h2>
                <div className="section-actions">
                  <button className="btn-primary">
                    <FaUpload />
                    Upload Media
                  </button>
                  <button className="btn-secondary">
                    <FaImage />
                    Gallery
                  </button>
                </div>
              </div>
              
              <div className="content-card">
                <div className="card-header">
                  <h3>Media Library</h3>
                  <div className="card-filters">
                    <div className="search-box">
                      <FaSearch />
                      <input type="text" placeholder="Search media..." />
                    </div>
                    <button className="btn-outline">
                      <FaFilter />
                      Filter
                    </button>
                  </div>
                </div>
                <div className="media-grid">
                  <p className="empty-state">Media management interface will be implemented here.</p>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="admin-section">
              <div className="section-header">
                <h2>Analytics Dashboard</h2>
                <div className="section-actions">
                  <button className="btn-primary">
                    <FaDownload />
                    Export Report
                  </button>
                </div>
              </div>
              
              <div className="analytics-grid">
                <div className="content-card">
                  <div className="card-header">
                    <h3>Student Enrollment Trends</h3>
                  </div>
                  <div className="chart-placeholder">
                    <FaChartBar />
                    <p>Chart would be displayed here</p>
                  </div>
                </div>
                
                <div className="content-card">
                  <div className="card-header">
                    <h3>Class Performance</h3>
                  </div>
                  <div className="chart-placeholder">
                    <FaTrophy />
                    <p>Performance metrics would be shown here</p>
                  </div>
                </div>
                
                <div className="content-card">
                  <div className="card-header">
                    <h3>Teacher Activity</h3>
                  </div>
                  <div className="chart-placeholder">
                    <FaChalkboardTeacher />
                    <p>Teacher engagement data would be displayed here</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="admin-section">
              <div className="section-header">
                <h2>System Settings</h2>
                <div className="section-actions">
                  <button className="btn-primary">
                    <FaCog />
                    Save Changes
                  </button>
                </div>
              </div>
              
              <div className="settings-grid">
                <div className="content-card">
                  <div className="card-header">
                    <h3>General Settings</h3>
                  </div>
                  <p className="empty-state">General settings interface will be implemented here.</p>
                </div>
                
                <div className="content-card">
                  <div className="card-header">
                    <h3>User Permissions</h3>
                  </div>
                  <p className="empty-state">Permission settings interface will be implemented here.</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;