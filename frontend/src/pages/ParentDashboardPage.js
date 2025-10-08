import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaGraduationCap, FaChartLine, FaBook, FaCalendar, FaBell, FaCog, FaSignOutAlt, FaChild, FaSchool, FaAward, FaClock, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const ParentDashboardPage = () => {
  const [userSession, setUserSession] = useState(null);
  const [children, setChildren] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Get user session from localStorage
    const session = JSON.parse(localStorage.getItem('userSession'));
    setUserSession(session);

    // Demo data for children
    setChildren([
      {
        id: 1,
        name: 'John Doe',
        grade: 'Grade 10',
        class: 'Mathematics & Science',
        avatar: 'https://api.dicebear.com/7.x/lorelei/svg?seed=child1',
        progress: 85,
        lastActivity: '2 hours ago',
        status: 'active'
      },
      {
        id: 2,
        name: 'Jane Doe',
        grade: 'Grade 8',
        class: 'Mathematics & Science',
        avatar: 'https://api.dicebear.com/7.x/lorelei/svg?seed=child2',
        progress: 92,
        lastActivity: '1 day ago',
        status: 'active'
      }
    ]);

    // Demo recent activities
    setRecentActivities([
      {
        id: 1,
        child: 'John Doe',
        activity: 'Completed Mathematics Assignment',
        time: '2 hours ago',
        type: 'assignment',
        icon: FaCheckCircle,
        color: '#10B981'
      },
      {
        id: 2,
        child: 'Jane Doe',
        activity: 'Attended Science Class',
        time: '1 day ago',
        type: 'class',
        icon: FaSchool,
        color: '#3B82F6'
      },
      {
        id: 3,
        child: 'John Doe',
        activity: 'Received Grade for Physics Test',
        time: '2 days ago',
        type: 'grade',
        icon: FaAward,
        color: '#F59E0B'
      }
    ]);

    // Demo notifications
    setNotifications([
      {
        id: 1,
        title: 'Parent-Teacher Meeting Scheduled',
        message: 'Meeting with Mr. Smith scheduled for Friday at 3:00 PM',
        time: '1 hour ago',
        type: 'meeting',
        unread: true
      },
      {
        id: 2,
        title: 'Grade Report Available',
        message: 'John\'s Mathematics grade report is now available',
        time: '3 hours ago',
        type: 'grade',
        unread: true
      },
      {
        id: 3,
        title: 'School Event Reminder',
        message: 'Science Fair is tomorrow at 9:00 AM',
        time: '1 day ago',
        type: 'event',
        unread: false
      }
    ]);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userSession');
    localStorage.removeItem('userType');
    localStorage.removeItem('userEmail');
    window.location.href = '/login';
  };

  return (
    <div className="parent-dashboard-page">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="brand">
            <div className="logo">
              <FaGraduationCap />
            </div>
            <div className="brand-info">
              <h1>G'SON INTERNATIONAL ACADEMY</h1>
              <span>Parent Portal</span>
            </div>
          </div>
          <div className="user-info">
            <div className="user-avatar">
              <FaUser />
            </div>
            <div className="user-details">
              <span className="user-name">Parent Portal</span>
              <span className="user-email">{userSession?.email}</span>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <nav className="sidebar-nav">
            <Link to="/parent-dashboard" className="nav-item active">
              <FaUser /> Dashboard
            </Link>
            <Link to="/parent-children" className="nav-item">
              <FaChild /> My Children
            </Link>
            <Link to="/parent-progress" className="nav-item">
              <FaChartLine /> Progress Reports
            </Link>
            <Link to="/parent-grades" className="nav-item">
              <FaAward /> Grades
            </Link>
            <Link to="/parent-schedule" className="nav-item">
              <FaCalendar /> Schedule
            </Link>
            <Link to="/parent-communications" className="nav-item">
              <FaBell /> Communications
            </Link>
            <Link to="/parent-settings" className="nav-item">
              <FaCog /> Settings
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          <div className="dashboard-content">
            {/* Welcome Section */}
            <div className="welcome-section">
              <h2>Welcome to Your Parent Portal</h2>
              <p>Monitor your children's academic progress and stay connected with their education.</p>
            </div>

            {/* Quick Stats */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">
                  <FaChild />
                </div>
                <div className="stat-info">
                  <h3>{children.length}</h3>
                  <p>Children Enrolled</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <FaAward />
                </div>
                <div className="stat-info">
                  <h3>88%</h3>
                  <p>Average Progress</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <FaBell />
                </div>
                <div className="stat-info">
                  <h3>{notifications.filter(n => n.unread).length}</h3>
                  <p>New Notifications</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <FaCalendar />
                </div>
                <div className="stat-info">
                  <h3>3</h3>
                  <p>Upcoming Events</p>
                </div>
              </div>
            </div>

            {/* Children Overview */}
            <div className="children-section">
              <div className="section-header">
                <h3>Your Children</h3>
                <Link to="/parent-children" className="view-all-btn">View All</Link>
              </div>
              <div className="children-grid">
                {children.map(child => (
                  <div key={child.id} className="child-card">
                    <div className="child-avatar">
                      <img src={child.avatar} alt={child.name} />
                    </div>
                    <div className="child-info">
                      <h4>{child.name}</h4>
                      <p>{child.grade} - {child.class}</p>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${child.progress}%` }}></div>
                      </div>
                      <span className="progress-text">{child.progress}% Progress</span>
                    </div>
                    <div className="child-status">
                      <span className={`status-badge ${child.status}`}>
                        {child.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                      <span className="last-activity">{child.lastActivity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="activities-section">
              <div className="section-header">
                <h3>Recent Activities</h3>
                <Link to="/parent-activities" className="view-all-btn">View All</Link>
              </div>
              <div className="activities-list">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon" style={{ color: activity.color }}>
                      <activity.icon />
                    </div>
                    <div className="activity-content">
                      <h4>{activity.activity}</h4>
                      <p>{activity.child} • {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="notifications-section">
              <div className="section-header">
                <h3>Notifications</h3>
                <Link to="/parent-notifications" className="view-all-btn">View All</Link>
              </div>
              <div className="notifications-list">
                {notifications.map(notification => (
                  <div key={notification.id} className={`notification-item ${notification.unread ? 'unread' : ''}`}>
                    <div className="notification-icon">
                      <FaBell />
                    </div>
                    <div className="notification-content">
                      <h4>{notification.title}</h4>
                      <p>{notification.message}</p>
                      <span className="notification-time">{notification.time}</span>
                    </div>
                    {notification.unread && <div className="unread-indicator"></div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ParentDashboardPage;
