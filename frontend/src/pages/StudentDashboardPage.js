import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const StudentDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const studentData = {
    name: 'Sarah Johnson',
    grade: 'Grade 8',
    program: 'Middle School STEM',
    progress: 75,
    nextClass: 'Mathematics - Algebra Basics',
    nextClassTime: 'Today at 2:00 PM'
  };

  const upcomingClasses = [
    {
      id: 1,
      subject: 'Mathematics',
      topic: 'Algebra Basics',
      time: 'Today 2:00 PM',
      teacher: 'Ms. Emily Chen',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      status: 'upcoming'
    },
    {
      id: 2,
      subject: 'Science',
      topic: 'Chemistry Lab',
      time: 'Tomorrow 10:00 AM',
      teacher: 'Prof. Michael Johnson',
      meetingLink: 'https://meet.google.com/xyz-1234-abc',
      status: 'upcoming'
    },
    {
      id: 3,
      subject: 'Physics',
      topic: 'Forces and Motion',
      time: 'Wednesday 3:00 PM',
      teacher: 'Dr. Sarah Williams',
      meetingLink: 'https://meet.google.com/def-5678-ghi',
      status: 'upcoming'
    }
  ];

  const assignments = [
    {
      id: 1,
      title: 'Algebra Worksheet #5',
      subject: 'Mathematics',
      dueDate: 'Tomorrow',
      status: 'pending',
      points: 25
    },
    {
      id: 2,
      title: 'Chemistry Lab Report',
      subject: 'Science',
      dueDate: 'Friday',
      status: 'in-progress',
      points: 50
    },
    {
      id: 3,
      title: 'Physics Problem Set',
      subject: 'Physics',
      dueDate: 'Next Monday',
      status: 'pending',
      points: 30
    }
  ];

  const recentGrades = [
    {
      subject: 'Mathematics',
      assignment: 'Algebra Quiz #3',
      grade: 'A',
      points: '18/20',
      date: 'Last Friday'
    },
    {
      subject: 'Science',
      assignment: 'Chemistry Test',
      grade: 'B+',
      points: '42/50',
      date: 'Last Wednesday'
    },
    {
      subject: 'Physics',
      assignment: 'Forces Lab',
      grade: 'A-',
      points: '28/30',
      date: 'Last Monday'
    }
  ];

  const resources = [
    {
      title: 'Algebra Study Guide',
      type: 'PDF',
      subject: 'Mathematics',
      size: '2.3 MB'
    },
    {
      title: 'Chemistry Lab Manual',
      type: 'PDF',
      subject: 'Science',
      size: '5.1 MB'
    },
    {
      title: 'Physics Formula Sheet',
      type: 'PDF',
      subject: 'Physics',
      size: '1.8 MB'
    },
    {
      title: 'Math Practice Problems',
      type: 'Interactive',
      subject: 'Mathematics',
      size: 'Online'
    }
  ];

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div className="welcome-section">
              <h1>Welcome back, {studentData.name}!</h1>
              <p>{studentData.grade} • {studentData.program}</p>
            </div>
            <div className="progress-section">
              <div className="progress-circle">
                <div className="progress-value">{studentData.progress}%</div>
                <div className="progress-label">Overall Progress</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="dashboard-nav">
        <div className="container">
          <div className="nav-tabs">
            <button 
              className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              📊 Overview
            </button>
            <button 
              className={`nav-tab ${activeTab === 'classes' ? 'active' : ''}`}
              onClick={() => setActiveTab('classes')}
            >
              🎓 Classes
            </button>
            <button 
              className={`nav-tab ${activeTab === 'assignments' ? 'active' : ''}`}
              onClick={() => setActiveTab('assignments')}
            >
              📝 Assignments
            </button>
            <button 
              className={`nav-tab ${activeTab === 'grades' ? 'active' : ''}`}
              onClick={() => setActiveTab('grades')}
            >
              📈 Grades
            </button>
            <button 
              className={`nav-tab ${activeTab === 'resources' ? 'active' : ''}`}
              onClick={() => setActiveTab('resources')}
            >
              📚 Resources
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        <div className="container">
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <div className="overview-grid">
                <div className="overview-card next-class">
                  <h3>Next Class</h3>
                  <div className="class-info">
                    <h4>{studentData.nextClass}</h4>
                    <p>⏰ {studentData.nextClassTime}</p>
                    <button className="join-btn">Join Class</button>
                  </div>
                </div>

                <div className="overview-card progress-card">
                  <h3>Progress Overview</h3>
                  <div className="progress-bars">
                    <div className="progress-item">
                      <span>Mathematics</span>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{width: '80%'}}></div>
                      </div>
                      <span>80%</span>
                    </div>
                    <div className="progress-item">
                      <span>Science</span>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{width: '75%'}}></div>
                      </div>
                      <span>75%</span>
                    </div>
                    <div className="progress-item">
                      <span>Physics</span>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{width: '70%'}}></div>
                      </div>
                      <span>70%</span>
                    </div>
                  </div>
                </div>

                <div className="overview-card recent-activity">
                  <h3>Recent Activity</h3>
                  <div className="activity-list">
                    <div className="activity-item">
                      <div className="activity-icon">✅</div>
                      <div className="activity-text">
                        <p>Completed Algebra Quiz #3</p>
                        <span>2 hours ago</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-icon">📝</div>
                      <div className="activity-text">
                        <p>Submitted Chemistry Lab Report</p>
                        <span>1 day ago</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-icon">🎓</div>
                      <div className="activity-text">
                        <p>Attended Physics Class</p>
                        <span>2 days ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'classes' && (
            <div className="classes-tab">
              <h2>Upcoming Classes</h2>
              <div className="classes-grid">
                {upcomingClasses.map(classItem => (
                  <div key={classItem.id} className="class-card">
                    <div className="class-header">
                      <h3>{classItem.subject}</h3>
                      <span className="class-status">{classItem.status}</span>
                    </div>
                    <div className="class-details">
                      <h4>{classItem.topic}</h4>
                      <p>👨‍🏫 {classItem.teacher}</p>
                      <p>⏰ {classItem.time}</p>
                    </div>
                    <div className="class-actions">
                      <a 
                        href={classItem.meetingLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="join-class-btn"
                      >
                        Join Google Meet
                      </a>
                      <button className="class-notes-btn">View Notes</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'assignments' && (
            <div className="assignments-tab">
              <h2>Your Assignments</h2>
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
                      <p>📚 {assignment.subject}</p>
                      <p>📅 Due: {assignment.dueDate}</p>
                      <p>⭐ Points: {assignment.points}</p>
                    </div>
                    <div className="assignment-actions">
                      <button className="view-assignment-btn">View Assignment</button>
                      <button className="submit-btn">Submit Work</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'grades' && (
            <div className="grades-tab">
              <h2>Your Grades</h2>
              <div className="grades-table">
                <div className="grades-header">
                  <div>Subject</div>
                  <div>Assignment</div>
                  <div>Grade</div>
                  <div>Points</div>
                  <div>Date</div>
                </div>
                {recentGrades.map((grade, index) => (
                  <div key={index} className="grades-row">
                    <div>{grade.subject}</div>
                    <div>{grade.assignment}</div>
                    <div className={`grade-value ${grade.grade}`}>{grade.grade}</div>
                    <div>{grade.points}</div>
                    <div>{grade.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="resources-tab">
              <h2>Learning Resources</h2>
              <div className="resources-grid">
                {resources.map((resource, index) => (
                  <div key={index} className="resource-card">
                    <div className="resource-icon">
                      {resource.type === 'PDF' ? '📄' : '💻'}
                    </div>
                    <div className="resource-info">
                      <h3>{resource.title}</h3>
                      <p>📚 {resource.subject}</p>
                      <p>📦 {resource.size}</p>
                    </div>
                    <div className="resource-actions">
                      <button className="download-btn">Download</button>
                      <button className="view-btn">View</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardPage;
