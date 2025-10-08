import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [teachers, setTeachers] = useState([]);
  const [teachersLoading, setTeachersLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [assignmentsLoading, setAssignmentsLoading] = useState(false);
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    classes: 0,
    courses: 0,
    assignments: 0,
    pending: 0,
    revenue: 0,
    growth: 0
  });

  // Fetch teachers from API
  const fetchTeachers = async () => {
    try {
      setTeachersLoading(true);
      const response = await fetch(`http://localhost:5000/api/teachers?t=${Date.now()}`);
      if (response.ok) {
        const data = await response.json();
        // Teachers API returns array directly
        setTeachers(Array.isArray(data) ? data : []);
      } else {
        setTeachers([]);
      }
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setTeachers([]);
    } finally {
      setTeachersLoading(false);
    }
  };

  // Fetch courses from API
  const fetchCourses = async () => {
    try {
      setCoursesLoading(true);
      const response = await fetch(`http://localhost:5000/api/courses?t=${Date.now()}`);
      if (response.ok) {
        const data = await response.json();
        // Courses API returns { success: true, data: courses, count: courses.length }
        setCourses(data.success ? (data.data || []) : []);
      } else {
        setCourses([]);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      setCourses([]);
    } finally {
      setCoursesLoading(false);
    }
  };

  // Fetch assignments from API
  const fetchAssignments = async () => {
    try {
      setAssignmentsLoading(true);
      const response = await fetch(`http://localhost:5000/api/assignments?t=${Date.now()}`);
      if (response.ok) {
        const data = await response.json();
        // Assignments API returns { success: true, data: assignments, count: assignments.length }
        setAssignments(data.success ? (data.data || []) : []);
      } else {
        setAssignments([]);
      }
    } catch (error) {
      console.error('Error fetching assignments:', error);
      setAssignments([]);
    } finally {
      setAssignmentsLoading(false);
    }
  };

  // Fetch dashboard stats
  const fetchStats = async () => {
    try {
      // Fetch teachers count
      const teachersResponse = await fetch(`http://localhost:5000/api/teachers?t=${Date.now()}`);
      const teachersData = teachersResponse.ok ? await teachersResponse.json() : [];
      
      // Fetch admissions count (for students)
      const admissionsResponse = await fetch(`http://localhost:5000/api/admissions?t=${Date.now()}`);
      const admissionsData = admissionsResponse.ok ? await admissionsResponse.json() : [];
      
      // Fetch courses count
      const coursesResponse = await fetch(`http://localhost:5000/api/courses?t=${Date.now()}`);
      const coursesData = coursesResponse.ok ? await coursesResponse.json() : { success: false, data: [] };
      
      // Fetch assignments count
      const assignmentsResponse = await fetch(`http://localhost:5000/api/assignments?t=${Date.now()}`);
      const assignmentsData = assignmentsResponse.ok ? await assignmentsResponse.json() : { success: false, data: [] };
      
      // Calculate stats
      const approvedStudents = Array.isArray(admissionsData) ? admissionsData.filter(admission => admission.status === 'approved').length : 0;
      const pendingAdmissions = Array.isArray(admissionsData) ? admissionsData.filter(admission => admission.status === 'pending').length : 0;
      
      setStats({
        students: approvedStudents,
        teachers: Array.isArray(teachersData) ? teachersData.length : 0,
        classes: Math.ceil((Array.isArray(teachersData) ? teachersData.length : 0) / 2), // Estimate classes based on teachers
        courses: coursesData.success ? (coursesData.data ? coursesData.data.length : 0) : 0,
        assignments: assignmentsData.success ? (assignmentsData.data ? assignmentsData.data.length : 0) : 0,
        pending: pendingAdmissions,
        revenue: 125000, // Static for now
        growth: 12.5 // Static for now
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchStats(); // Always fetch stats on component mount
    if (activeTab === 'teachers') {
      fetchTeachers();
    } else if (activeTab === 'courses') {
      fetchCourses();
    } else if (activeTab === 'assignments') {
      fetchAssignments();
    }
  }, [activeTab]);

  // Refresh all data
  const refreshAllData = () => {
    fetchStats();
    if (activeTab === 'teachers') {
      fetchTeachers();
    } else if (activeTab === 'courses') {
      fetchCourses();
    } else if (activeTab === 'assignments') {
      fetchAssignments();
    }
  };

  const handleDeleteTeacher = async (teacherId) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/teachers/${teacherId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          // Refresh the teachers list
          fetchTeachers();
        } else {
          alert('Failed to delete teacher');
        }
      } catch (error) {
        console.error('Error deleting teacher:', error);
        alert('Failed to delete teacher');
      }
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          // Refresh the courses list
          fetchCourses();
        } else {
          alert('Failed to delete course');
        }
      } catch (error) {
        console.error('Error deleting course:', error);
        alert('Failed to delete course');
      }
    }
  };

  const handleDeleteAssignment = async (assignmentId) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/assignments/${assignmentId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          // Refresh the assignments list
          fetchAssignments();
        } else {
          alert('Failed to delete assignment');
        }
      } catch (error) {
        console.error('Error deleting assignment:', error);
        alert('Failed to delete assignment');
      }
    }
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
              <h1>G'SON INTERNATIONAL ACADEMY Admin</h1>
              <span>Management Dashboard</span>
            </div>
          </div>
          
          <div className="admin-header-actions">
            <div className="admin-search">
              <FaSearch />
              <input type="text" placeholder="Search students, teachers, courses..." />
            </div>
            
            <button className="admin-refresh-btn" onClick={refreshAllData} title="Refresh Data">
              <FaArrowUp />
            </button>
            
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
              <span className="nav-badge">{teachers.length}</span>
            </button>
            
            <button 
              className={`admin-nav-item ${activeTab === 'courses' ? 'active' : ''}`}
              onClick={() => setActiveTab('courses')}
            >
              <FaBook />
              <span>Courses</span>
              <span className="nav-badge">{courses.length}</span>
            </button>
            
            <button 
              className={`admin-nav-item ${activeTab === 'assignments' ? 'active' : ''}`}
              onClick={() => setActiveTab('assignments')}
            >
              <FaClipboardList />
              <span>Assignments</span>
              <span className="nav-badge">{assignments.length}</span>
            </button>
            
            <Link 
              to="/admin/programs"
              className="admin-nav-item"
            >
              <FaFileAlt />
              <span>Programs</span>
            </Link>
            
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
                  <Link to="/admin/export-data" className="btn-secondary">
                    <FaDownload />
                    Export Data
                  </Link>
                </div>
              </div>

              {/* Debug Panel */}
              <div className="debug-panel" style={{ background: '#f8f9fa', padding: '1rem', margin: '1rem 0', borderRadius: '8px', border: '1px solid #dee2e6' }}>
                <h4>Debug Information:</h4>
                <p><strong>Teachers:</strong> {teachers.length} loaded {teachersLoading && '(Loading...)'}</p>
                <p><strong>Courses:</strong> {courses.length} loaded {coursesLoading && '(Loading...)'}</p>
                <p><strong>Assignments:</strong> {assignments.length} loaded {assignmentsLoading && '(Loading...)'}</p>
                <p><strong>Stats:</strong> Students: {stats.students}, Teachers: {stats.teachers}, Courses: {stats.courses}, Assignments: {stats.assignments}</p>
                <button onClick={refreshAllData} className="btn-primary" style={{ marginTop: '0.5rem' }}>
                  <FaArrowUp /> Refresh All Data
                </button>
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
                  <Link to="/admin/admissions" className="btn-primary">
                    <FaUsers />
                    Manage Admissions
                  </Link>
                  <Link to="/admin/teachers" className="btn-primary">
                    <FaChalkboardTeacher />
                    Manage Teachers
                  </Link>
                  <Link to="/admin/add-student" className="btn-secondary">
                    <FaPlus />
                    Add Student
                  </Link>
                  <Link to="/admin/import-students" className="btn-secondary">
                    <FaUpload />
                    Import Students
                  </Link>
                  <Link to="/admin/export-data" className="btn-outline">
                    <FaDownload />
                    Export Data
                  </Link>
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
                  <Link to="/admin/add-teacher" className="btn-primary">
                    <FaPlus />
                    Add Teacher
                  </Link>
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
                  {teachersLoading ? (
                    <div className="loading-state">
                      <div className="spinner"></div>
                      <p>Loading teachers...</p>
                    </div>
                  ) : teachers.length > 0 ? (
                    <div className="teachers-grid">
                      {teachers.map((teacher) => (
                        <div key={teacher._id} className="teacher-card">
                          <div className="teacher-avatar">
                            <FaChalkboardTeacher />
                          </div>
                          <div className="teacher-info">
                            <h4>{teacher.firstName} {teacher.lastName}</h4>
                            <p className="teacher-title">{teacher.title}</p>
                            <p className="teacher-email">{teacher.email}</p>
                            <div className="teacher-subjects">
                              {teacher.subjects && teacher.subjects.map((subject, index) => (
                                <span key={index} className="subject-tag">{subject}</span>
                              ))}
                            </div>
                            <div className="teacher-stats">
                              <span className="stat">
                                <FaStar /> {teacher.rating || 'N/A'}
                              </span>
                              <span className="stat">
                                <FaUsers /> {teacher.studentsTaught || 0}
                              </span>
                              <span className={`status ${teacher.status || 'active'}`}>
                                {teacher.status || 'Active'}
                              </span>
                            </div>
                          </div>
                          <div className="teacher-actions">
                            <button 
                              className="btn-icon" 
                              title="View Details"
                              onClick={() => navigate(`/admin/teachers/view/${teacher._id}`)}
                            >
                              <FaEye />
                            </button>
                            <button 
                              className="btn-icon" 
                              title="Edit Teacher"
                              onClick={() => navigate(`/admin/teachers/edit/${teacher._id}`)}
                            >
                              <FaEdit />
                            </button>
                            <button 
                              className="btn-icon danger" 
                              title="Remove Teacher"
                              onClick={() => handleDeleteTeacher(teacher._id)}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <FaChalkboardTeacher />
                      <h3>No Teachers Found</h3>
                      <p>No teachers have been added yet. Click "Add Teacher" to get started.</p>
                    </div>
                  )}
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
                  <button 
                    className="btn-primary"
                    onClick={() => navigate('/admin/create-course')}
                  >
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
                  {coursesLoading ? (
                    <div className="loading-state">
                      <div className="spinner"></div>
                      <p>Loading courses...</p>
                    </div>
                  ) : courses.length === 0 ? (
                    <div className="empty-state">
                      <FaBook />
                      <h3>No courses found</h3>
                      <p>Create your first course to get started.</p>
                      <button 
                        className="btn-primary"
                        onClick={() => navigate('/admin/create-course')}
                      >
                        <FaPlus />
                        Create Course
                      </button>
                    </div>
                  ) : (
                    <div className="courses-grid">
                      {courses.map((course) => (
                        <div key={course.id} className="course-card">
                          <div className="course-header">
                            <h4>{course.title}</h4>
                            <span className={`status-badge ${course.isActive ? 'active' : 'inactive'}`}>
                              {course.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          <div className="course-details">
                            <p className="course-description">{course.description}</p>
                            <div className="course-meta">
                              <span><FaChalkboardTeacher /> {course.instructor}</span>
                              <span><FaUsers /> {course.maxStudents} students</span>
                              <span><FaClock /> {course.duration} weeks</span>
                            </div>
                            <div className="course-subject">
                              <span className="subject-tag">{course.subject}</span>
                              <span className="grade-tag">{course.grade}</span>
                            </div>
                          </div>
                          <div className="course-actions">
                            <button 
                              className="btn-outline"
                              onClick={() => navigate(`/admin/edit-course/${course.id}`)}
                            >
                              <FaEdit />
                              Edit
                            </button>
                            <button 
                              className="btn-outline"
                              onClick={() => navigate(`/admin/view-course/${course.id}`)}
                            >
                              <FaEye />
                              View
                            </button>
                            <button 
                              className="btn-danger"
                              onClick={() => handleDeleteCourse(course.id)}
                            >
                              <FaTrash />
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
                  <button 
                    className="btn-primary"
                    onClick={() => navigate('/admin/create-assignment')}
                  >
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
                  {assignmentsLoading ? (
                    <div className="loading-state">
                      <div className="spinner"></div>
                      <p>Loading assignments...</p>
                    </div>
                  ) : assignments.length === 0 ? (
                    <div className="empty-state">
                      <FaClipboardList />
                      <h3>No assignments found</h3>
                      <p>Create your first assignment to get started.</p>
                      <button 
                        className="btn-primary"
                        onClick={() => navigate('/admin/create-assignment')}
                      >
                        <FaPlus />
                        Create Assignment
                      </button>
                    </div>
                  ) : (
                    <div className="assignments-grid">
                      {assignments.map((assignment) => (
                        <div key={assignment.id} className="assignment-card">
                          <div className="assignment-header">
                            <h4>{assignment.title}</h4>
                            <span className={`status-badge ${assignment.isActive ? 'active' : 'inactive'}`}>
                              {assignment.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          <div className="assignment-details">
                            <p className="assignment-description">{assignment.description}</p>
                            <div className="assignment-meta">
                              <span><FaChalkboardTeacher /> {assignment.instructor}</span>
                              <span><FaFileAlt /> {assignment.maxPoints} points</span>
                              <span><FaCalendarAlt /> Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                            </div>
                            <div className="assignment-subject">
                              <span className="subject-tag">{assignment.subject}</span>
                              <span className="grade-tag">{assignment.grade}</span>
                              <span className="course-tag">{assignment.course}</span>
                            </div>
                          </div>
                          <div className="assignment-actions">
                            <button 
                              className="btn-outline"
                              onClick={() => navigate(`/admin/edit-assignment/${assignment.id}`)}
                            >
                              <FaEdit />
                              Edit
                            </button>
                            <button className="btn-outline">
                              <FaEye />
                              View
                            </button>
                            <button 
                              className="btn-danger"
                              onClick={() => handleDeleteAssignment(assignment.id)}
                            >
                              <FaTrash />
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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