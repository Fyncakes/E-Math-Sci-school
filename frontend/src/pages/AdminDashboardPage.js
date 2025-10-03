import React, { useState } from 'react';

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = {
    totalStudents: 487,
    totalTeachers: 52,
    activeClasses: 24,
    pendingApprovals: 8,
    newRegistrations: 15,
    systemAlerts: 3
  };

  const recentRegistrations = [
    { id: 1, name: 'John Smith', grade: 'Grade 9', program: 'High School Advanced', date: '2024-03-15', status: 'pending' },
    { id: 2, name: 'Emily Davis', grade: 'Grade 6', program: 'Middle School STEM', date: '2024-03-14', status: 'approved' },
    { id: 3, name: 'Michael Brown', grade: 'Grade 3', program: 'Elementary Math', date: '2024-03-14', status: 'pending' },
    { id: 4, name: 'Sarah Wilson', grade: 'Grade 11', program: 'High School Advanced', date: '2024-03-13', status: 'approved' }
  ];

  const pendingApprovals = [
    { id: 1, type: 'Student Registration', name: 'John Smith', details: 'Grade 9 - High School Advanced', priority: 'high' },
    { id: 2, type: 'Teacher Application', name: 'Dr. Lisa Johnson', details: 'Mathematics Department', priority: 'medium' },
    { id: 3, type: 'Course Request', name: 'Advanced Calculus', details: 'Requested by Ms. Chen', priority: 'low' },
    { id: 4, type: 'Resource Upload', name: 'Physics Lab Manual', details: 'Uploaded by Prof. Williams', priority: 'medium' }
  ];

  const systemAlerts = [
    { id: 1, type: 'warning', message: 'Server load is high (85%)', time: '2 hours ago' },
    { id: 2, type: 'info', message: 'New student registrations require review', time: '4 hours ago' },
    { id: 3, type: 'success', message: 'Backup completed successfully', time: '6 hours ago' }
  ];

  const classes = [
    { id: 1, name: 'Algebra Basics', teacher: 'Ms. Emily Chen', students: 25, status: 'active', nextClass: 'Today 2:00 PM' },
    { id: 2, name: 'Chemistry Lab', teacher: 'Prof. Michael Johnson', students: 20, status: 'active', nextClass: 'Tomorrow 10:00 AM' },
    { id: 3, name: 'Physics Advanced', teacher: 'Dr. Sarah Williams', students: 18, status: 'active', nextClass: 'Wednesday 3:00 PM' },
    { id: 4, name: 'Elementary Math', teacher: 'Ms. Lisa Brown', students: 30, status: 'active', nextClass: 'Today 9:00 AM' }
  ];

  const handleApprove = (id) => {
    console.log(`Approving item ${id}`);
    // Handle approval logic
  };

  const handleReject = (id) => {
    console.log(`Rejecting item ${id}`);
    // Handle rejection logic
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-header">
        <div className="container">
          <div className="header-content">
            <h1>Admin Dashboard</h1>
            <div className="admin-actions">
              <button className="btn-primary">Add New Student</button>
              <button className="btn-secondary">Upload Content</button>
              <button className="btn-outline">System Settings</button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="admin-nav">
        <div className="container">
          <div className="nav-tabs">
            <button 
              className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              📊 Overview
            </button>
            <button 
              className={`nav-tab ${activeTab === 'students' ? 'active' : ''}`}
              onClick={() => setActiveTab('students')}
            >
              👥 Students
            </button>
            <button 
              className={`nav-tab ${activeTab === 'teachers' ? 'active' : ''}`}
              onClick={() => setActiveTab('teachers')}
            >
              👨‍🏫 Teachers
            </button>
            <button 
              className={`nav-tab ${activeTab === 'classes' ? 'active' : ''}`}
              onClick={() => setActiveTab('classes')}
            >
              🎓 Classes
            </button>
            <button 
              className={`nav-tab ${activeTab === 'approvals' ? 'active' : ''}`}
              onClick={() => setActiveTab('approvals')}
            >
              ✅ Approvals
            </button>
            <button 
              className={`nav-tab ${activeTab === 'content' ? 'active' : ''}`}
              onClick={() => setActiveTab('content')}
            >
              📚 Content
            </button>
            <button 
              className={`nav-tab ${activeTab === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              📈 Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="admin-content">
        <div className="container">
          {activeTab === 'overview' && (
            <div className="overview-tab">
              {/* Stats Cards */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">👥</div>
                  <div className="stat-info">
                    <h3>{stats.totalStudents}</h3>
                    <p>Total Students</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">👨‍🏫</div>
                  <div className="stat-info">
                    <h3>{stats.totalTeachers}</h3>
                    <p>Total Teachers</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🎓</div>
                  <div className="stat-info">
                    <h3>{stats.activeClasses}</h3>
                    <p>Active Classes</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">⏳</div>
                  <div className="stat-info">
                    <h3>{stats.pendingApprovals}</h3>
                    <p>Pending Approvals</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📝</div>
                  <div className="stat-info">
                    <h3>{stats.newRegistrations}</h3>
                    <p>New Registrations</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">⚠️</div>
                  <div className="stat-info">
                    <h3>{stats.systemAlerts}</h3>
                    <p>System Alerts</p>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="recent-activity">
                <h2>Recent Activity</h2>
                <div className="activity-list">
                  <div className="activity-item">
                    <div className="activity-icon">👤</div>
                    <div className="activity-text">
                      <p>New student registration: John Smith</p>
                      <span>2 hours ago</span>
                    </div>
                    <button className="action-btn">Review</button>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon">📚</div>
                    <div className="activity-text">
                      <p>New lesson uploaded: Advanced Calculus</p>
                      <span>4 hours ago</span>
                    </div>
                    <button className="action-btn">View</button>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon">✅</div>
                    <div className="activity-text">
                      <p>Teacher application approved: Dr. Lisa Johnson</p>
                      <span>6 hours ago</span>
                    </div>
                    <button className="action-btn">Details</button>
                  </div>
                </div>
              </div>

              {/* System Alerts */}
              <div className="system-alerts">
                <h2>System Alerts</h2>
                <div className="alerts-list">
                  {systemAlerts.map(alert => (
                    <div key={alert.id} className={`alert-item ${alert.type}`}>
                      <div className="alert-icon">
                        {alert.type === 'warning' ? '⚠️' : alert.type === 'info' ? 'ℹ️' : '✅'}
                      </div>
                      <div className="alert-content">
                        <p>{alert.message}</p>
                        <span>{alert.time}</span>
                      </div>
                      <button className="alert-action">Dismiss</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div className="students-tab">
              <div className="tab-header">
                <h2>Student Management</h2>
                <div className="tab-actions">
                  <button className="btn-primary">Add Student</button>
                  <button className="btn-secondary">Export Data</button>
                  <button className="btn-outline">Bulk Actions</button>
                </div>
              </div>
              
              <div className="students-table">
                <div className="table-header">
                  <div>Name</div>
                  <div>Grade</div>
                  <div>Program</div>
                  <div>Registration Date</div>
                  <div>Status</div>
                  <div>Actions</div>
                </div>
                {recentRegistrations.map(student => (
                  <div key={student.id} className="table-row">
                    <div>{student.name}</div>
                    <div>{student.grade}</div>
                    <div>{student.program}</div>
                    <div>{student.date}</div>
                    <div className={`status ${student.status}`}>{student.status}</div>
                    <div className="actions">
                      <button className="edit-btn">Edit</button>
                      <button className="view-btn">View</button>
                      <button className="delete-btn">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'approvals' && (
            <div className="approvals-tab">
              <h2>Pending Approvals</h2>
              <div className="approvals-grid">
                {pendingApprovals.map(approval => (
                  <div key={approval.id} className="approval-card">
                    <div className="approval-header">
                      <h3>{approval.type}</h3>
                      <span className={`priority ${approval.priority}`}>{approval.priority}</span>
                    </div>
                    <div className="approval-content">
                      <h4>{approval.name}</h4>
                      <p>{approval.details}</p>
                    </div>
                    <div className="approval-actions">
                      <button 
                        className="approve-btn"
                        onClick={() => handleApprove(approval.id)}
                      >
                        Approve
                      </button>
                      <button 
                        className="reject-btn"
                        onClick={() => handleReject(approval.id)}
                      >
                        Reject
                      </button>
                      <button className="view-btn">View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'classes' && (
            <div className="classes-tab">
              <h2>Class Management</h2>
              <div className="classes-grid">
                {classes.map(classItem => (
                  <div key={classItem.id} className="class-card">
                    <div className="class-header">
                      <h3>{classItem.name}</h3>
                      <span className={`class-status ${classItem.status}`}>{classItem.status}</span>
                    </div>
                    <div className="class-details">
                      <p>👨‍🏫 {classItem.teacher}</p>
                      <p>👥 {classItem.students} students</p>
                      <p>⏰ Next: {classItem.nextClass}</p>
                    </div>
                    <div className="class-actions">
                      <button className="edit-btn">Edit Class</button>
                      <button className="view-btn">View Students</button>
                      <button className="schedule-btn">Schedule</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="content-tab">
              <h2>Content Management</h2>
              <div className="content-actions">
                <button className="btn-primary">Upload New Lesson</button>
                <button className="btn-secondary">Create Assignment</button>
                <button className="btn-outline">Manage Resources</button>
              </div>
              
              <div className="content-upload">
                <h3>Upload New Content</h3>
                <div className="upload-area">
                  <div className="upload-icon">📁</div>
                  <p>Drag and drop files here or click to browse</p>
                  <button className="upload-btn">Choose Files</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="analytics-tab">
              <h2>Analytics Dashboard</h2>
              <div className="analytics-grid">
                <div className="chart-card">
                  <h3>Student Enrollment Trends</h3>
                  <div className="chart-placeholder">
                    <p>📊 Chart would be displayed here</p>
                  </div>
                </div>
                <div className="chart-card">
                  <h3>Class Performance</h3>
                  <div className="chart-placeholder">
                    <p>📈 Performance metrics would be shown here</p>
                  </div>
                </div>
                <div className="chart-card">
                  <h3>Teacher Activity</h3>
                  <div className="chart-placeholder">
                    <p>👨‍🏫 Teacher engagement data would be displayed here</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
