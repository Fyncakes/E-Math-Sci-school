import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaChalkboardTeacher, FaUsers, FaBook, FaCalendarAlt, FaFileAlt, 
  FaVideo, FaImage, FaDownload, FaUpload, FaSearch, FaFilter, FaSort,
  FaChevronDown, FaChevronUp, FaCheck, FaTimes, FaClock, FaCheckCircle,
  FaExclamationTriangle, FaInfoCircle, FaArrowUp, FaArrowDown, FaMinus,
  FaCrown, FaStar, FaTrophy, FaUserFriends, FaUserPlus, FaUserMinus,
  FaEdit, FaTrash, FaEye, FaPlus, FaGraduationCap, FaChartBar,
  FaBell, FaCog, FaSignOutAlt, FaPlay, FaPause, FaStop, FaClipboardList,
  FaTasks, FaAward, FaComments, FaEnvelope, FaPhone, FaUser, FaIdCard,
  FaSchool, FaBookOpen, FaPen, FaCheckSquare, FaTimesCircle, FaFlag,
  FaArrowLeft, FaUserCheck, FaUserTimes, FaCalendar, FaChartLine
} from 'react-icons/fa';

const TeacherDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  // Get teacher data from localStorage
  const currentTeacher = JSON.parse(localStorage.getItem('currentTeacher') || '{}');
  const teacherData = {
    name: currentTeacher.firstName ? `${currentTeacher.firstName} ${currentTeacher.lastName}` : "Dr. Peter Omara",
    subject: currentTeacher.subject || "Mathematics & Physics",
    experience: currentTeacher.experience ? `${currentTeacher.experience} years` : "15+ years",
    totalStudents: 125,
    activeClasses: 8,
    upcomingClasses: 3,
    email: currentTeacher.email || "peter.omara@school.edu",
    department: currentTeacher.department || "Mathematics"
  };

  const classes = [
    { 
      id: 1, 
      name: "Mathematics - Algebra Basics", 
      grade: "Grade 8", 
      students: 25, 
      nextClass: "2024-01-20 10:00 AM",
      status: "active",
      studentsList: [
        { id: 1, name: "John Smith", attendance: 95, lastActive: "2 hours ago", status: "active" },
        { id: 2, name: "Sarah Johnson", attendance: 88, lastActive: "1 day ago", status: "active" },
        { id: 3, name: "Mike Wilson", attendance: 92, lastActive: "3 hours ago", status: "active" }
      ]
    },
    { 
      id: 2, 
      name: "Physics - Fundamentals", 
      grade: "Grade 9", 
      students: 30, 
      nextClass: "2024-01-21 2:00 PM",
      status: "active",
      studentsList: [
        { id: 4, name: "Emma Davis", attendance: 90, lastActive: "1 hour ago", status: "active" },
        { id: 5, name: "Alex Brown", attendance: 85, lastActive: "2 days ago", status: "inactive" }
      ]
    }
  ];

  const assignments = [
    { id: 1, title: "Algebra Homework", class: "Mathematics - Algebra", dueDate: "2024-01-25", submitted: 20, total: 25, status: "active" },
    { id: 2, title: "Physics Lab Report", class: "Physics - Fundamentals", dueDate: "2024-01-28", submitted: 15, total: 30, status: "active" },
    { id: 3, title: "Calculus Problem Set", class: "Mathematics - Calculus", dueDate: "2024-01-30", submitted: 8, total: 20, status: "active" }
  ];

  const recentActivity = [
    { id: 1, type: 'assignment', message: 'New assignment uploaded: Algebra Homework', time: '2 hours ago', status: 'completed' },
    { id: 2, type: 'student', message: 'Sarah Johnson submitted Physics Lab Report', time: '4 hours ago', status: 'completed' },
    { id: 3, type: 'class', message: 'Mathematics class completed successfully', time: '6 hours ago', status: 'completed' }
  ];

  const getTabIcon = (tab) => {
    switch (tab) {
      case 'overview': return <FaChartLine />;
      case 'classes': return <FaChalkboardTeacher />;
      case 'students': return <FaUsers />;
      case 'assignments': return <FaClipboardList />;
      case 'calendar': return <FaCalendar />;
      case 'groups': return <FaUserFriends />;
      default: return <FaChartLine />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <FaCheckCircle className="status-active" />;
      case 'inactive': return <FaTimesCircle className="status-inactive" />;
      case 'pending': return <FaClock className="status-pending" />;
      default: return <FaInfoCircle className="status-default" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#e74c3c';
      case 'medium': return '#f39c12';
      case 'low': return '#27ae60';
      default: return '#7f8c8d';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'assignment': return <FaFileAlt />;
      case 'student': return <FaUser />;
      case 'class': return <FaChalkboardTeacher />;
      case 'grade': return <FaAward />;
      default: return <FaBell />;
    }
  };

  const handleCancelClass = (classId) => {
    setSelectedClass(classId);
    setShowCancelModal(true);
  };

  const handleGroupStudents = (classId) => {
    setSelectedClass(classId);
    setShowGroupModal(true);
  };

  const renderOverview = () => (
    <div className="teacher-overview">
      <div className="overview-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <FaUsers />
          </div>
          <div className="stat-content">
            <h3>{teacherData.totalStudents}</h3>
            <p>Total Students</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaChalkboardTeacher />
          </div>
          <div className="stat-content">
            <h3>{teacherData.activeClasses}</h3>
            <p>Active Classes</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaClipboardList />
          </div>
          <div className="stat-content">
            <h3>{assignments.length}</h3>
            <p>Active Assignments</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaCalendar />
          </div>
          <div className="stat-content">
            <h3>{teacherData.upcomingClasses}</h3>
            <p>Upcoming Classes</p>
          </div>
        </div>
      </div>

      <div className="overview-content">
        <div className="recent-activity">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            {recentActivity.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="activity-content">
                  <p>{activity.message}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
                <div className="activity-status">
                  {getStatusIcon(activity.status)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <Link to="/teacher-upload" className="action-btn">
              <FaUpload />
              Upload Content
            </Link>
            <button className="action-btn">
              <FaPlus />
              Create Assignment
            </button>
            <button className="action-btn">
              <FaCalendar />
              Schedule Class
            </button>
            <button className="action-btn">
              <FaUsers />
              Manage Students
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderClasses = () => (
    <div className="teacher-classes">
      <div className="classes-header">
        <h3>My Classes</h3>
        <button className="btn-primary">
          <FaPlus />
          Add New Class
        </button>
      </div>
      
      <div className="classes-grid">
        {classes.map(cls => (
          <div key={cls.id} className="class-card">
            <div className="class-header">
              <h4>{cls.name}</h4>
              <span className={`class-status ${cls.status}`}>{cls.status}</span>
            </div>
            <div className="class-info">
              <p><FaGraduationCap /> {cls.grade}</p>
              <p><FaUsers /> {cls.students} students</p>
              <p><FaClock /> Next: {cls.nextClass}</p>
            </div>
            <div className="class-actions">
              <button className="btn-secondary">
                <FaEye />
                View Details
              </button>
              <button className="btn-primary">
                <FaPlay />
                Start Class
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="teacher-students">
      <div className="students-header">
        <h3>Student Management</h3>
        <div className="students-filters">
          <div className="filter-group">
            <FaSearch />
            <input type="text" placeholder="Search students..." />
          </div>
          <select className="filter-select">
            <option value="">All Classes</option>
            <option value="math">Mathematics</option>
            <option value="physics">Physics</option>
          </select>
        </div>
      </div>
      
      <div className="students-list">
        {classes.map(cls => (
          <div key={cls.id} className="class-section">
            <h4>{cls.name}</h4>
            <div className="students-grid">
              {cls.studentsList.map(student => (
                <div key={student.id} className="student-card">
                  <div className="student-avatar">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="student-info">
                    <h5>{student.name}</h5>
                    <p>Attendance: {student.attendance}%</p>
                    <p>Last Active: {student.lastActive}</p>
                  </div>
                  <div className="student-status">
                    {getStatusIcon(student.status)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAssignments = () => (
    <div className="teacher-assignments">
      <div className="assignments-header">
        <h3>Assignment Management</h3>
        <button className="btn-primary">
          <FaPlus />
          Create Assignment
        </button>
      </div>
      
      <div className="assignments-list">
        {assignments.map(assignment => (
          <div key={assignment.id} className="assignment-card">
            <div className="assignment-header">
              <h4>{assignment.title}</h4>
              <span className={`assignment-status ${assignment.status}`}>
                {assignment.status}
              </span>
            </div>
            <div className="assignment-info">
              <p><FaBook /> {assignment.class}</p>
              <p><FaClock /> Due: {assignment.dueDate}</p>
              <p><FaUsers /> {assignment.submitted}/{assignment.total} submitted</p>
            </div>
            <div className="assignment-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${(assignment.submitted / assignment.total) * 100}%` }}
                ></div>
              </div>
              <span>{Math.round((assignment.submitted / assignment.total) * 100)}%</span>
            </div>
            <div className="assignment-actions">
              <button className="btn-secondary">
                <FaEye />
                View Submissions
              </button>
              <button className="btn-primary">
                <FaEdit />
                Edit Assignment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCalendar = () => (
    <div className="teacher-calendar">
      <div className="calendar-header">
        <h3>Teaching Schedule</h3>
        <div className="calendar-controls">
          <button className="btn-secondary">Today</button>
          <button className="btn-secondary">Week</button>
          <button className="btn-secondary">Month</button>
        </div>
      </div>
      
      <div className="calendar-content">
        <div className="calendar-grid">
          <div className="calendar-day">
            <h4>Monday</h4>
            <div className="day-events">
              <div className="event-item">
                <FaChalkboardTeacher />
                <div>
                  <h5>Mathematics - Algebra</h5>
                  <p>10:00 AM - 11:30 AM</p>
                </div>
              </div>
            </div>
          </div>
          <div className="calendar-day">
            <h4>Tuesday</h4>
            <div className="day-events">
              <div className="event-item">
                <FaChalkboardTeacher />
                <div>
                  <h5>Physics - Fundamentals</h5>
                  <p>2:00 PM - 3:30 PM</p>
                </div>
              </div>
            </div>
          </div>
          <div className="calendar-day">
            <h4>Wednesday</h4>
            <div className="day-events">
              <div className="event-item">
                <FaChalkboardTeacher />
                <div>
                  <h5>Mathematics - Calculus</h5>
                  <p>10:00 AM - 11:30 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGroups = () => (
    <div className="teacher-groups">
      <div className="groups-header">
        <h3>Student Groups</h3>
        <button className="btn-primary">
          <FaPlus />
          Create Group
        </button>
      </div>
      
      <div className="groups-list">
        <div className="group-card">
          <div className="group-header">
            <h4>Advanced Mathematics</h4>
            <span className="group-count">12 students</span>
          </div>
          <div className="group-members">
            <div className="member-avatar">JS</div>
            <div className="member-avatar">SJ</div>
            <div className="member-avatar">MW</div>
            <div className="member-avatar">+9</div>
          </div>
          <div className="group-actions">
            <button className="btn-secondary">
              <FaEye />
              View Group
            </button>
            <button className="btn-primary">
              <FaEdit />
              Manage
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="teacher-dashboard-page">
      {/* Header */}
      <div className="teacher-header">
        <div className="teacher-header-content">
          <div className="teacher-brand">
            <div className="teacher-logo">
              <FaChalkboardTeacher />
            </div>
            <div className="teacher-title">
              <h1>G'SON INTERNATIONAL ACADEMY</h1>
              <span>Teacher Portal - {teacherData.name}</span>
            </div>
          </div>
          
          <div className="teacher-header-actions">
            <Link to="/" className="back-btn">
              <FaArrowLeft />
              Back to School
            </Link>
            <button className="logout-btn">
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="teacher-content">
        <div className="container">
          {/* Teacher Info Card */}
          <div className="teacher-info-card">
            <div className="teacher-avatar">
              {teacherData.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="teacher-details">
              <h2>{teacherData.name}</h2>
              <p><FaBook /> {teacherData.subject}</p>
              <p><FaSchool /> {teacherData.department}</p>
              <p><FaAward /> {teacherData.experience} experience</p>
            </div>
            <div className="teacher-stats">
              <div className="stat-item">
                <FaUsers />
                <span>{teacherData.totalStudents} Students</span>
              </div>
              <div className="stat-item">
                <FaChalkboardTeacher />
                <span>{teacherData.activeClasses} Classes</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="teacher-nav">
            <div className="teacher-nav-tabs">
              {['overview', 'classes', 'students', 'assignments', 'calendar', 'groups'].map(tab => (
                <button
                  key={tab}
                  className={`teacher-nav-tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {getTabIcon(tab)}
                  <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="teacher-tab-content">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'classes' && renderClasses()}
            {activeTab === 'students' && renderStudents()}
            {activeTab === 'assignments' && renderAssignments()}
            {activeTab === 'calendar' && renderCalendar()}
            {activeTab === 'groups' && renderGroups()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboardPage;