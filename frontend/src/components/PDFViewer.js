import React, { useState } from 'react';
import { FaTimes, FaDownload, FaExpand, FaCompress } from 'react-icons/fa';

const PDFViewer = ({ pdfUrl, title, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const downloadPDF = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = title;
    link.click();
  };

  return (
    <div className={`pdf-viewer-overlay ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="pdf-viewer-container">
        <div className="pdf-viewer-header">
          <h3 className="pdf-title">{title}</h3>
          <div className="pdf-controls">
            <button 
              className="pdf-control-btn" 
              onClick={downloadPDF}
              title="Download PDF"
            >
              <FaDownload />
            </button>
            <button 
              className="pdf-control-btn" 
              onClick={toggleFullscreen}
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <FaCompress /> : <FaExpand />}
            </button>
            <button 
              className="pdf-control-btn close-btn" 
              onClick={onClose}
              title="Close"
            >
              <FaTimes />
            </button>
          </div>
        </div>
        <div className="pdf-viewer-content">
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
            className="pdf-iframe"
            title={title}
          />
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
