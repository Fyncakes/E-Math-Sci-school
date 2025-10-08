import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUsers, FaCheck, FaTimes, FaEye, FaEdit, FaTrash, FaSearch,
  FaFilter, FaSort, FaCalendar, FaEnvelope, FaPhone, FaFileAlt,
  FaUserCheck, FaUserTimes, FaClock, FaGraduationCap, FaAward,
  FaDownload, FaUpload, FaPrint, FaRedo, FaPlus, FaChartBar
} from 'react-icons/fa';

const AdminAdmissionsPage = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch admissions
  useEffect(() => {
    fetchAdmissions();
  }, [currentPage, statusFilter, searchTerm, sortBy, sortOrder]);

  const fetchAdmissions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10,
        ...(statusFilter !== 'all' && { status: statusFilter }),
        ...(searchTerm && { search: searchTerm })
      });

      const response = await fetch(`http://localhost:5000/api/admissions?${params}&t=${Date.now()}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        // Admissions API returns array directly
        setAdmissions(Array.isArray(data) ? data : []);
        setTotalPages(Math.ceil((Array.isArray(data) ? data.length : 0) / 10));
      } else {
        console.error('Error fetching admissions');
      }
    } catch (error) {
      console.error('Error fetching admissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (admissionId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admissions/${admissionId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: newStatus,
          adminNotes: adminNotes
        })
      });

      if (response.ok) {
        setShowApprovalModal(false);
        setAdminNotes('');
        fetchAdmissions();
      } else {
        console.error('Error updating admission status');
      }
    } catch (error) {
      console.error('Error updating admission status:', error);
    }
  };

  const handleViewDetails = (admission) => {
    setSelectedAdmission(admission);
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'status-approved';
      case 'rejected': return 'status-rejected';
      case 'pending': return 'status-pending';
      case 'waitlisted': return 'status-waitlisted';
      default: return 'status-pending';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <FaCheck />;
      case 'rejected': return <FaTimes />;
      case 'pending': return <FaClock />;
      case 'waitlisted': return <FaUserCheck />;
      default: return <FaClock />;
    }
  };

  return (
    <div className="admin-admissions-page">
      <div className="page-header">
        <div className="header-content">
          <div className="header-title">
            <h1><FaUsers /> Admissions Management</h1>
            <p>Manage student applications and admissions</p>
          </div>
          <div className="header-actions">
            <button className="btn-secondary" onClick={fetchAdmissions}>
              <FaRedo /> Refresh
            </button>
            <button className="btn-primary">
              <FaDownload /> Export
            </button>
          </div>
        </div>
      </div>

      <div className="page-content">
        {/* Filters and Search */}
        <div className="filters-section">
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-controls">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="waitlisted">Waitlisted</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="createdAt">Date Applied</option>
              <option value="firstName">Name</option>
              <option value="grade">Grade</option>
              <option value="status">Status</option>
            </select>
            
            <button
              className="sort-btn"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              <FaSort />
              {sortOrder === 'asc' ? 'Asc' : 'Desc'}
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-icon pending">
              <FaClock />
            </div>
            <div className="stat-content">
              <h3>{admissions ? admissions.filter(a => a.status === 'pending').length : 0}</h3>
              <p>Pending Review</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon approved">
              <FaCheck />
            </div>
            <div className="stat-content">
              <h3>{admissions ? admissions.filter(a => a.status === 'approved').length : 0}</h3>
              <p>Approved</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon rejected">
              <FaTimes />
            </div>
            <div className="stat-content">
              <h3>{admissions ? admissions.filter(a => a.status === 'rejected').length : 0}</h3>
              <p>Rejected</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon total">
              <FaUsers />
            </div>
            <div className="stat-content">
              <h3>{admissions ? admissions.length : 0}</h3>
              <p>Total Applications</p>
            </div>
          </div>
        </div>

        {/* Admissions Table */}
        <div className="admissions-table-section">
          <div className="table-header">
            <h3>Admission Applications</h3>
            <div className="table-actions">
              <button className="btn-secondary">
                <FaPrint /> Print List
              </button>
            </div>
          </div>

          {loading ? (
            <div className="loading-section">
              <div className="spinner"></div>
              <p>Loading admissions...</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="admissions-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Grade</th>
                    <th>Subjects</th>
                    <th>Application Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {admissions && admissions.length > 0 ? admissions.map((admission) => (
                    <tr key={admission._id}>
                      <td>
                        <div className="student-info">
                          <div className="student-avatar">
                            {admission.firstName[0]}{admission.lastName[0]}
                          </div>
                          <div className="student-details">
                            <h4>{admission.firstName} {admission.lastName}</h4>
                            <p>{admission.email}</p>
                          </div>
                        </div>
                      </td>
                      <td>{admission.grade}</td>
                      <td>
                        <div className="subjects-list">
                          {admission.subjects.map((subject, index) => (
                            <span key={index} className="subject-tag">{subject}</span>
                          ))}
                        </div>
                      </td>
                      <td>{new Date(admission.applicationDate).toLocaleDateString()}</td>
                      <td>
                        <span className={`status-badge ${getStatusColor(admission.status)}`}>
                          {getStatusIcon(admission.status)}
                          {admission.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="btn-icon view"
                            onClick={() => handleViewDetails(admission)}
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                          {admission.status === 'pending' && (
                            <>
                              <button
                                className="btn-icon approve"
                                onClick={() => {
                                  setSelectedAdmission(admission);
                                  setShowApprovalModal(true);
                                }}
                                title="Approve"
                              >
                                <FaCheck />
                              </button>
                              <button
                                className="btn-icon reject"
                                onClick={() => {
                                  setSelectedAdmission(admission);
                                  setAdminNotes('');
                                  handleStatusChange(admission._id, 'rejected');
                                }}
                                title="Reject"
                              >
                                <FaTimes />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="7" className="no-data">
                        <div className="no-data-content">
                          <FaUsers />
                          <p>No admissions found</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="page-btn"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="page-info">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="page-btn"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Admission Details Modal */}
      {showModal && selectedAdmission && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Admission Details</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="admission-details">
                <div className="detail-section">
                  <h3>Student Information</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Name:</label>
                      <span>{selectedAdmission.firstName} {selectedAdmission.lastName}</span>
                    </div>
                    <div className="detail-item">
                      <label>Email:</label>
                      <span>{selectedAdmission.email}</span>
                    </div>
                    <div className="detail-item">
                      <label>Phone:</label>
                      <span>{selectedAdmission.phone}</span>
                    </div>
                    <div className="detail-item">
                      <label>Grade:</label>
                      <span>{selectedAdmission.grade}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Parent Information</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Parent Name:</label>
                      <span>{selectedAdmission.parentName}</span>
                    </div>
                    <div className="detail-item">
                      <label>Parent Email:</label>
                      <span>{selectedAdmission.parentEmail}</span>
                    </div>
                    <div className="detail-item">
                      <label>Parent Phone:</label>
                      <span>{selectedAdmission.parentPhone}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Academic Information</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Subjects:</label>
                      <div className="subjects-list">
                        {selectedAdmission.subjects.map((subject, index) => (
                          <span key={index} className="subject-tag">{subject}</span>
                        ))}
                      </div>
                    </div>
                    <div className="detail-item">
                      <label>Previous School:</label>
                      <span>{selectedAdmission.previousSchool || 'Not provided'}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Motivation</h3>
                  <p>{selectedAdmission.motivation}</p>
                </div>

                {selectedAdmission.adminNotes && (
                  <div className="detail-section">
                    <h3>Admin Notes</h3>
                    <p>{selectedAdmission.adminNotes}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>
                Close
              </button>
              {selectedAdmission.status === 'pending' && (
                <button
                  className="btn-primary"
                  onClick={() => {
                    setShowModal(false);
                    setShowApprovalModal(true);
                  }}
                >
                  Review Application
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Approval Modal */}
      {showApprovalModal && selectedAdmission && (
        <div className="modal-overlay" onClick={() => setShowApprovalModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Review Application</h2>
              <button className="modal-close" onClick={() => setShowApprovalModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="review-form">
                <div className="form-group">
                  <label>Admin Notes</label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add notes about this application..."
                    rows="4"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-secondary"
                onClick={() => setShowApprovalModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn-danger"
                onClick={() => handleStatusChange(selectedAdmission._id, 'rejected')}
              >
                <FaTimes /> Reject
              </button>
              <button
                className="btn-success"
                onClick={() => handleStatusChange(selectedAdmission._id, 'approved')}
              >
                <FaCheck /> Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAdmissionsPage;
