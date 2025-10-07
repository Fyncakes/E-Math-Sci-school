import React, { useState } from 'react';
import { 
  FaChartLine, FaTrophy, FaMedal, FaStar, FaAward, FaGraduationCap,
  FaBook, FaChalkboardTeacher, FaFilter, FaSearch, FaDownload,
  FaEye, FaFileAlt, FaCalendarAlt, FaClock, FaCheckCircle,
  FaExclamationTriangle, FaArrowUp, FaArrowDown, FaMinus,
  FaRocket, FaTarget, FaLightbulb, FaUsers, FaClipboardList
} from 'react-icons/fa';

const StudentGradesPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  const studentData = {
    name: 'Sarah Johnson',
    grade: 'Grade 8',
    overallGPA: 3.8,
    rank: 12,
    totalStudents: 150,
    improvement: '+0.3',
    trend: 'up'
  };

  const subjects = [
    {
      name: 'Mathematics',
      teacher: 'Dr. Sarah Johnson',
      currentGrade: 'A-',
      percentage: 87,
      gpa: 3.7,
      trend: 'up',
      assignments: 15,
      completed: 14,
      average: 87,
      lastGrade: 'A',
      improvement: '+5'
    },
    {
      name: 'Science',
      teacher: 'Prof. Michael Chen',
      currentGrade: 'A',
      percentage: 92,
      gpa: 4.0,
      trend: 'up',
      assignments: 12,
      completed: 12,
      average: 92,
      lastGrade: 'A-',
      improvement: '+8'
    },
    {
      name: 'English',
      teacher: 'Ms. Emily Davis',
      currentGrade: 'B+',
      percentage: 83,
      gpa: 3.3,
      trend: 'down',
      assignments: 10,
      completed: 9,
      average: 83,
      lastGrade: 'A-',
      improvement: '-7'
    },
    {
      name: 'History',
      teacher: 'Mr. John Smith',
      currentGrade: 'A',
      percentage: 94,
      gpa: 4.0,
      trend: 'up',
      assignments: 8,
      completed: 8,
      average: 94,
      lastGrade: 'A',
      improvement: '+2'
    }
  ];

  const recentGrades = [
    {
      id: 1,
      assignment: 'Algebra Problem Set #3',
      subject: 'Mathematics',
      grade: 'A',
      percentage: 95,
      points: 95,
      maxPoints: 100,
      date: '2024-01-15',
      feedback: 'Excellent work! Your algebraic reasoning is very clear.',
      teacher: 'Dr. Sarah Johnson'
    },
    {
      id: 2,
      assignment: 'Physics Lab Report',
      subject: 'Science',
      grade: 'A-',
      percentage: 88,
      points: 88,
      maxPoints: 100,
      date: '2024-01-12',
      feedback: 'Good analysis, but include more detailed calculations next time.',
      teacher: 'Prof. Michael Chen'
    },
    {
      id: 3,
      assignment: 'Essay: The Great Gatsby',
      subject: 'English',
      grade: 'B+',
      percentage: 85,
      points: 85,
      maxPoints: 100,
      date: '2024-01-10',
      feedback: 'Strong thesis, but work on paragraph transitions.',
      teacher: 'Ms. Emily Davis'
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'Math Star',
      description: 'Scored 90% or above in 5 consecutive math assignments',
      icon: FaStar,
      date: '2024-01-15',
      points: 50
    },
    {
      id: 2,
      title: 'Science Explorer',
      description: 'Completed all science lab reports with excellence',
      icon: FaRocket,
      date: '2024-01-12',
      points: 75
    },
    {
      id: 3,
      title: 'Perfect Attendance',
      description: 'Attended all classes for 30 consecutive days',
      icon: FaTrophy,
      date: '2024-01-10',
      points: 100
    }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <FaArrowUp />;
      case 'down': return <FaArrowDown />;
      default: return <FaMinus />;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'success';
      case 'down': return 'danger';
      default: return 'secondary';
    }
  };

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'success';
    if (grade.startsWith('B')) return 'warning';
    if (grade.startsWith('C')) return 'info';
    return 'danger';
  };

  const filteredSubjects = selectedSubject === 'all' 
    ? subjects 
    : subjects.filter(subject => subject.name === selectedSubject);

  return (
    <div className="student-grades-page">
      <div className="page-header">
        <div className="header-content">
          <h1>My Grades</h1>
          <p>Track your academic performance and achievements</p>
        </div>
        <div className="header-actions">
          <button className="btn-primary">
            <FaDownload />
            Download Report
          </button>
        </div>
      </div>

      <div className="page-content">
        <div className="overview-section">
          <div className="overview-cards">
            <div className="overview-card">
              <div className="card-icon">
                <FaChartLine />
              </div>
              <div className="card-content">
                <h3>Overall GPA</h3>
                <div className="gpa-display">
                  <span className="gpa-number">{studentData.overallGPA}</span>
                  <span className="gpa-trend success">
                    {getTrendIcon('up')} {studentData.improvement}
                  </span>
                </div>
              </div>
            </div>

            <div className="overview-card">
              <div className="card-icon">
                <FaTrophy />
              </div>
              <div className="card-content">
                <h3>Class Rank</h3>
                <div className="rank-display">
                  <span className="rank-number">#{studentData.rank}</span>
                  <span className="rank-total">of {studentData.totalStudents}</span>
                </div>
              </div>
            </div>

            <div className="overview-card">
              <div className="card-icon">
                <FaAward />
              </div>
              <div className="card-content">
                <h3>Achievements</h3>
                <div className="achievements-count">
                  <span className="count-number">{achievements.length}</span>
                  <span className="count-label">earned</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="filters-section">
          <div className="search-filters">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject.name} value={subject.name}>
                  {subject.name}
                </option>
              ))}
            </select>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="filter-select"
            >
              <option value="current">Current Semester</option>
              <option value="previous">Previous Semester</option>
              <option value="year">Full Year</option>
            </select>
          </div>

          <div className="tab-navigation">
            <button
              className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <FaChartLine />
              Overview
            </button>
            <button
              className={`tab-button ${activeTab === 'subjects' ? 'active' : ''}`}
              onClick={() => setActiveTab('subjects')}
            >
              <FaBook />
              By Subject
            </button>
            <button
              className={`tab-button ${activeTab === 'recent' ? 'active' : ''}`}
              onClick={() => setActiveTab('recent')}
            >
              <FaClipboardList />
              Recent Grades
            </button>
            <button
              className={`tab-button ${activeTab === 'achievements' ? 'active' : ''}`}
              onClick={() => setActiveTab('achievements')}
            >
              <FaTrophy />
              Achievements
            </button>
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="overview-content">
            <div className="subjects-overview">
              <h3>Subject Performance</h3>
              <div className="subjects-grid">
                {filteredSubjects.map(subject => (
                  <div key={subject.name} className="subject-card">
                    <div className="subject-header">
                      <h4>{subject.name}</h4>
                      <span className={`grade-badge ${getGradeColor(subject.currentGrade)}`}>
                        {subject.currentGrade}
                      </span>
                    </div>
                    <div className="subject-stats">
                      <div className="stat">
                        <span className="stat-label">Percentage</span>
                        <span className="stat-value">{subject.percentage}%</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">GPA</span>
                        <span className="stat-value">{subject.gpa}</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">Trend</span>
                        <span className={`trend ${getTrendColor(subject.trend)}`}>
                          {getTrendIcon(subject.trend)} {subject.improvement}
                        </span>
                      </div>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${subject.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'subjects' && (
          <div className="subjects-content">
            <div className="subjects-grid">
              {filteredSubjects.map(subject => (
                <div key={subject.name} className="subject-detail-card">
                  <div className="subject-header">
                    <h3>{subject.name}</h3>
                    <span className="teacher">
                      <FaChalkboardTeacher />
                      {subject.teacher}
                    </span>
                  </div>
                  <div className="subject-grades">
                    <div className="current-grade">
                      <span className="grade-label">Current Grade</span>
                      <span className={`grade-value ${getGradeColor(subject.currentGrade)}`}>
                        {subject.currentGrade} ({subject.percentage}%)
                      </span>
                    </div>
                    <div className="grade-trend">
                      <span className="trend-label">Improvement</span>
                      <span className={`trend-value ${getTrendColor(subject.trend)}`}>
                        {getTrendIcon(subject.trend)} {subject.improvement}
                      </span>
                    </div>
                  </div>
                  <div className="assignments-info">
                    <div className="assignments-stats">
                      <span>{subject.completed}/{subject.assignments} assignments completed</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${(subject.completed / subject.assignments) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'recent' && (
          <div className="recent-grades-content">
            <div className="grades-list">
              {recentGrades.map(grade => (
                <div key={grade.id} className="grade-item">
                  <div className="grade-header">
                    <h4>{grade.assignment}</h4>
                    <span className="subject-tag">{grade.subject}</span>
                  </div>
                  <div className="grade-details">
                    <div className="grade-info">
                      <span className={`grade-badge ${getGradeColor(grade.grade)}`}>
                        {grade.grade}
                      </span>
                      <span className="percentage">{grade.percentage}%</span>
                      <span className="points">{grade.points}/{grade.maxPoints} points</span>
                    </div>
                    <div className="grade-meta">
                      <span className="date">
                        <FaCalendarAlt />
                        {grade.date}
                      </span>
                      <span className="teacher">
                        <FaChalkboardTeacher />
                        {grade.teacher}
                      </span>
                    </div>
                  </div>
                  <div className="feedback">
                    <p>{grade.feedback}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="achievements-content">
            <div className="achievements-grid">
              {achievements.map(achievement => (
                <div key={achievement.id} className="achievement-card">
                  <div className="achievement-icon">
                    <achievement.icon />
                  </div>
                  <div className="achievement-content">
                    <h4>{achievement.title}</h4>
                    <p>{achievement.description}</p>
                    <div className="achievement-meta">
                      <span className="date">
                        <FaCalendarAlt />
                        {achievement.date}
                      </span>
                      <span className="points">
                        <FaStar />
                        {achievement.points} points
                      </span>
                    </div>
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

export default StudentGradesPage;
