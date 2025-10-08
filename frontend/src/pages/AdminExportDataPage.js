import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowLeft, FaDownload, FaFileExcel, FaFileCsv, FaFilePdf,
  FaUsers, FaChalkboardTeacher, FaBook, FaClipboardList,
  FaCalendar, FaFilter, FaCheck, FaExclamationTriangle,
  FaInfoCircle, FaClock, FaDatabase
} from 'react-icons/fa';

const AdminExportDataPage = () => {
  const [selectedDataType, setSelectedDataType] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [exportFormat, setExportFormat] = useState('csv');
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState(null);

  const dataTypes = [
    {
      id: 'students',
      name: 'Students',
      description: 'Export all student information and records',
      icon: FaUsers,
      count: 156
    },
    {
      id: 'teachers',
      name: 'Teachers',
      description: 'Export teacher profiles and information',
      icon: FaChalkboardTeacher,
      count: 24
    },
    {
      id: 'courses',
      name: 'Courses',
      description: 'Export course catalog and details',
      icon: FaBook,
      count: 45
    },
    {
      id: 'assignments',
      name: 'Assignments',
      description: 'Export assignment data and submissions',
      icon: FaClipboardList,
      count: 89
    },
    {
      id: 'admissions',
      name: 'Admissions',
      description: 'Export admission applications and status',
      icon: FaCalendar,
      count: 67
    }
  ];

  const formatOptions = [
    { id: 'csv', name: 'CSV', icon: FaFileCsv, description: 'Comma-separated values' },
    { id: 'excel', name: 'Excel', icon: FaFileExcel, description: 'Microsoft Excel format' },
    { id: 'pdf', name: 'PDF', icon: FaFilePdf, description: 'Portable Document Format' }
  ];

  const handleExport = async () => {
    if (!selectedDataType) {
      setExportStatus('error');
      return;
    }

    setIsExporting(true);
    setExportStatus(null);

    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate file download
      const fileName = `${selectedDataType}_export_${new Date().toISOString().split('T')[0]}.${exportFormat}`;
      const mockData = `Sample ${selectedDataType} data for export`;
      const blob = new Blob([mockData], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
      
      setExportStatus('success');
    } catch (error) {
      setExportStatus('error');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="admin-header-content">
          <Link to="/admin-dashboard" className="back-btn">
            <FaArrowLeft />
            Back to Dashboard
          </Link>
          <div className="admin-title">
            <h1>Export Data</h1>
            <p>Export system data in various formats</p>
          </div>
        </div>
      </div>

      <div className="admin-content">
        <div className="export-container">
          {/* Data Type Selection */}
          <div className="export-section">
            <h3>
              <FaDatabase />
              Select Data Type
            </h3>
            <p>Choose the type of data you want to export</p>
            
            <div className="data-types-grid">
              {dataTypes.map(dataType => (
                <div 
                  key={dataType.id}
                  className={`data-type-card ${selectedDataType === dataType.id ? 'selected' : ''}`}
                  onClick={() => setSelectedDataType(dataType.id)}
                >
                  <div className="data-type-icon">
                    <dataType.icon />
                  </div>
                  <div className="data-type-content">
                    <h4>{dataType.name}</h4>
                    <p>{dataType.description}</p>
                    <div className="data-count">
                      <FaDatabase />
                      {dataType.count} records
                    </div>
                  </div>
                  {selectedDataType === dataType.id && (
                    <div className="selected-indicator">
                      <FaCheck />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Export Options */}
          <div className="export-section">
            <h3>
              <FaFilter />
              Export Options
            </h3>
            
            <div className="export-options">
              {/* Date Range */}
              <div className="option-group">
                <label>Date Range (Optional)</label>
                <div className="date-range">
                  <div className="date-input">
                    <label htmlFor="startDate">From</label>
                    <input
                      type="date"
                      id="startDate"
                      value={dateRange.startDate}
                      onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                    />
                  </div>
                  <div className="date-input">
                    <label htmlFor="endDate">To</label>
                    <input
                      type="date"
                      id="endDate"
                      value={dateRange.endDate}
                      onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              {/* Export Format */}
              <div className="option-group">
                <label>Export Format</label>
                <div className="format-options">
                  {formatOptions.map(format => (
                    <div 
                      key={format.id}
                      className={`format-option ${exportFormat === format.id ? 'selected' : ''}`}
                      onClick={() => setExportFormat(format.id)}
                    >
                      <format.icon />
                      <div className="format-info">
                        <span className="format-name">{format.name}</span>
                        <span className="format-desc">{format.description}</span>
                      </div>
                      {exportFormat === format.id && (
                        <div className="selected-indicator">
                          <FaCheck />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Export Preview */}
          {selectedDataType && (
            <div className="export-preview">
              <h3>
                <FaInfoCircle />
                Export Preview
              </h3>
              <div className="preview-content">
                <div className="preview-item">
                  <strong>Data Type:</strong> {dataTypes.find(dt => dt.id === selectedDataType)?.name}
                </div>
                <div className="preview-item">
                  <strong>Format:</strong> {formatOptions.find(f => f.id === exportFormat)?.name}
                </div>
                <div className="preview-item">
                  <strong>Records:</strong> {dataTypes.find(dt => dt.id === selectedDataType)?.count} items
                </div>
                {dateRange.startDate && (
                  <div className="preview-item">
                    <strong>Date Range:</strong> {dateRange.startDate} to {dateRange.endDate || 'Present'}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Export Actions */}
          <div className="export-actions">
            {exportStatus === 'success' && (
              <div className="success-message">
                <FaCheck />
                <div className="message-content">
                  <h4>Export Successful!</h4>
                  <p>Your data has been exported and downloaded.</p>
                </div>
              </div>
            )}

            {exportStatus === 'error' && (
              <div className="error-message">
                <FaExclamationTriangle />
                <div className="message-content">
                  <h4>Export Failed</h4>
                  <p>There was an error exporting the data. Please try again.</p>
                </div>
              </div>
            )}

            <div className="action-buttons">
              <Link to="/admin-dashboard" className="btn-secondary">
                <FaArrowLeft />
                Cancel
              </Link>
              <button 
                onClick={handleExport}
                className="btn-primary"
                disabled={!selectedDataType || isExporting}
              >
                {isExporting ? (
                  <>
                    <div className="spinner"></div>
                    Exporting...
                  </>
                ) : (
                  <>
                    <FaDownload />
                    Export Data
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Export History */}
          <div className="export-history">
            <h3>
              <FaClock />
              Recent Exports
            </h3>
            <div className="history-list">
              <div className="history-item">
                <div className="history-info">
                  <span className="history-type">Students</span>
                  <span className="history-date">2024-01-15 14:30</span>
                </div>
                <div className="history-format">CSV</div>
                <button className="download-btn">
                  <FaDownload />
                </button>
              </div>
              <div className="history-item">
                <div className="history-info">
                  <span className="history-type">Teachers</span>
                  <span className="history-date">2024-01-14 09:15</span>
                </div>
                <div className="history-format">Excel</div>
                <button className="download-btn">
                  <FaDownload />
                </button>
              </div>
              <div className="history-item">
                <div className="history-info">
                  <span className="history-type">Courses</span>
                  <span className="history-date">2024-01-13 16:45</span>
                </div>
                <div className="history-format">PDF</div>
                <button className="download-btn">
                  <FaDownload />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminExportDataPage;
