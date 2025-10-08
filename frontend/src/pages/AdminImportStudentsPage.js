import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowLeft, FaUpload, FaDownload, FaFileExcel, FaFileCsv,
  FaCheck, FaExclamationTriangle, FaInfoCircle, FaTimes,
  FaEye, FaTrash, FaPlus, FaSave
} from 'react-icons/fa';

const AdminImportStudentsPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [importData, setImportData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importStatus, setImportStatus] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImportStatus(null);
      processFile(file);
    }
  };

  const processFile = async (file) => {
    setIsProcessing(true);
    try {
      // Simulate file processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data for preview
      const mockData = [
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          grade: 'Grade 10',
          parentName: 'Jane Doe',
          parentEmail: 'jane.doe@example.com',
          status: 'valid'
        },
        {
          firstName: 'Alice',
          lastName: 'Smith',
          email: 'alice.smith@example.com',
          grade: 'Grade 9',
          parentName: 'Bob Smith',
          parentEmail: 'bob.smith@example.com',
          status: 'valid'
        },
        {
          firstName: 'Emma',
          lastName: 'Wilson',
          email: 'invalid-email',
          grade: 'Grade 11',
          parentName: 'David Wilson',
          parentEmail: 'david.wilson@example.com',
          status: 'error'
        }
      ];
      
      setPreviewData(mockData);
      setShowPreview(true);
      setImportStatus('processed');
    } catch (error) {
      setImportStatus('error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImport = async () => {
    setIsProcessing(true);
    try {
      // Simulate import process
      await new Promise(resolve => setTimeout(resolve, 2000));
      setImportStatus('success');
    } catch (error) {
      setImportStatus('error');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadTemplate = () => {
    // Create CSV template
    const csvContent = "firstName,lastName,email,phone,dateOfBirth,grade,parentName,parentEmail,parentPhone,address,subjects\n" +
      "John,Doe,john.doe@example.com,+1-555-0101,2005-01-15,Grade 10,Jane Doe,jane.doe@example.com,+1-555-0102,123 Main St,\"Math,Science,English\"\n" +
      "Alice,Smith,alice.smith@example.com,+1-555-0103,2006-03-20,Grade 9,Bob Smith,bob.smith@example.com,+1-555-0104,456 Oak Ave,\"Math,Science,History\"";
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student_import_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
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
            <h1>Import Students</h1>
            <p>Bulk import students from CSV or Excel file</p>
          </div>
        </div>
      </div>

      <div className="admin-content">
        <div className="import-container">
          {/* Instructions */}
          <div className="import-instructions">
            <h3>
              <FaInfoCircle />
              Import Instructions
            </h3>
            <div className="instructions-content">
              <div className="instruction-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Download Template</h4>
                  <p>Download our CSV template to ensure proper formatting</p>
                  <button onClick={downloadTemplate} className="btn-outline">
                    <FaDownload />
                    Download Template
                  </button>
                </div>
              </div>
              
              <div className="instruction-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Prepare Your File</h4>
                  <p>Fill in student information following the template format</p>
                  <ul>
                    <li>Required fields: firstName, lastName, email, grade, parentName, parentEmail</li>
                    <li>Optional fields: phone, dateOfBirth, parentPhone, address, subjects</li>
                    <li>Subjects should be comma-separated: "Math,Science,English"</li>
                  </ul>
                </div>
              </div>
              
              <div className="instruction-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Upload and Import</h4>
                  <p>Upload your file and review the data before importing</p>
                </div>
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="upload-section">
            <h3>
              <FaUpload />
              Upload File
            </h3>
            
            <div className="file-upload-area">
              <input
                type="file"
                id="fileInput"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
              
              <label htmlFor="fileInput" className="file-upload-label">
                <div className="upload-icon">
                  <FaFileExcel />
                </div>
                <div className="upload-text">
                  <h4>Choose File to Upload</h4>
                  <p>Select CSV or Excel file with student data</p>
                  <span className="file-types">Supported: .csv, .xlsx, .xls</span>
                </div>
              </label>
            </div>

            {selectedFile && (
              <div className="selected-file">
                <div className="file-info">
                  <FaFileExcel />
                  <div className="file-details">
                    <span className="file-name">{selectedFile.name}</span>
                    <span className="file-size">
                      {(selectedFile.size / 1024).toFixed(1)} KB
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setSelectedFile(null);
                    setShowPreview(false);
                    setImportStatus(null);
                  }}
                  className="remove-file"
                >
                  <FaTimes />
                </button>
              </div>
            )}
          </div>

          {/* Processing Status */}
          {isProcessing && (
            <div className="processing-status">
              <div className="spinner"></div>
              <p>Processing file...</p>
            </div>
          )}

          {/* Preview Data */}
          {showPreview && previewData.length > 0 && (
            <div className="preview-section">
              <h3>
                <FaEye />
                Preview Data
              </h3>
              <p>Review the data before importing. Fix any errors before proceeding.</p>
              
              <div className="preview-table-container">
                <table className="preview-table">
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Grade</th>
                      <th>Parent Name</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.map((student, index) => (
                      <tr key={index} className={student.status === 'error' ? 'error-row' : ''}>
                        <td>{student.firstName}</td>
                        <td>{student.lastName}</td>
                        <td>{student.email}</td>
                        <td>{student.grade}</td>
                        <td>{student.parentName}</td>
                        <td>
                          <span className={`status-badge ${student.status === 'valid' ? 'success' : 'error'}`}>
                            {student.status === 'valid' ? (
                              <>
                                <FaCheck />
                                Valid
                              </>
                            ) : (
                              <>
                                <FaExclamationTriangle />
                                Error
                              </>
                            )}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="preview-actions">
                <button 
                  onClick={() => setShowPreview(false)}
                  className="btn-secondary"
                >
                  <FaTimes />
                  Cancel
                </button>
                <button 
                  onClick={handleImport}
                  className="btn-primary"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="spinner"></div>
                      Importing...
                    </>
                  ) : (
                    <>
                      <FaUpload />
                      Import Students
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Import Status */}
          {importStatus === 'success' && (
            <div className="success-message">
              <FaCheck />
              <div className="message-content">
                <h4>Import Successful!</h4>
                <p>3 students have been successfully imported into the system.</p>
                <Link to="/admin-dashboard" className="btn-primary">
                  View Students
                </Link>
              </div>
            </div>
          )}

          {importStatus === 'error' && (
            <div className="error-message">
              <FaExclamationTriangle />
              <div className="message-content">
                <h4>Import Failed</h4>
                <p>There was an error processing the file. Please check the format and try again.</p>
                <button 
                  onClick={() => setImportStatus(null)}
                  className="btn-secondary"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminImportStudentsPage;
