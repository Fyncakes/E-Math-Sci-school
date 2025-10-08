import React, { useState, useEffect } from 'react';
import { FaUsers, FaSearch, FaFilter, FaGraduationCap, FaCalendar, FaAward } from 'react-icons/fa';

const ApprovedStudentsPage = () => {
  const [approvedStudents, setApprovedStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');

  useEffect(() => {
    fetchApprovedStudents();
  }, []);

  const fetchApprovedStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/admissions/public/approved');
      
      if (response.ok) {
        const data = await response.json();
        setApprovedStudents(data);
      } else {
        console.error('Error fetching approved students');
      }
    } catch (error) {
      console.error('Error fetching approved students:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = approvedStudents.filter(student => {
    const matchesSearch = student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = gradeFilter === 'all' || student.grade === gradeFilter;
    return matchesSearch && matchesGrade;
  });

  const getGradeOptions = () => {
    const grades = [...new Set(approvedStudents.map(student => student.grade))];
    return grades.sort();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="approved-students-page">
      <div className="page-header">
        <div className="header-content">
          <h1><FaUsers /> Approved Students</h1>
          <p>Congratulations to our newly admitted students!</p>
        </div>
      </div>

      <div className="page-content">
        {/* Search and Filter */}
        <div className="search-section">
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-controls">
            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Grades</option>
              {getGradeOptions().map(grade => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Statistics */}
        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-icon">
              <FaUsers />
            </div>
            <div className="stat-content">
              <h3>{approvedStudents.length}</h3>
              <p>Total Approved</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FaGraduationCap />
            </div>
            <div className="stat-content">
              <h3>{getGradeOptions().length}</h3>
              <p>Grade Levels</p>
            </div>
          </div>
        </div>

        {/* Students List */}
        <div className="students-section">
          <div className="section-header">
            <h3>Approved Students List</h3>
            <p>Students who have been accepted to G'SON INTERNATIONAL ACADEMY</p>
          </div>

          {loading ? (
            <div className="loading-section">
              <div className="spinner"></div>
              <p>Loading approved students...</p>
            </div>
          ) : (
            <div className="students-grid">
              {filteredStudents.map((student, index) => (
                <div key={student._id} className="student-card">
                  <div className="student-header">
                    <div className="student-avatar">
                      {student.firstName[0]}{student.lastName[0]}
                    </div>
                    <div className="student-info">
                      <h4>{student.firstName} {student.lastName}</h4>
                      <p className="student-grade">{student.grade}</p>
                    </div>
                    <div className="approval-badge">
                      <FaAward />
                    </div>
                  </div>
                  
                  <div className="student-details">
                    <div className="detail-item">
                      <FaCalendar />
                      <span>Approved: {formatDate(student.applicationDate)}</span>
                    </div>
                    <div className="detail-item">
                      <FaGraduationCap />
                      <span>Grade: {student.grade}</span>
                    </div>
                  </div>
                  
                  <div className="student-footer">
                    <div className="welcome-message">
                      Welcome to G'SON INTERNATIONAL ACADEMY!
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredStudents.length === 0 && (
            <div className="no-results">
              <FaUsers />
              <h3>No students found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="cta-section">
          <div className="cta-content">
            <h2>Want to Join Our Community?</h2>
            <p>Apply now to become part of our amazing learning community!</p>
            <div className="cta-buttons">
              <a href="/register" className="btn-primary">
                <FaGraduationCap /> Apply Now
              </a>
              <a href="/contact" className="btn-secondary">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovedStudentsPage;
