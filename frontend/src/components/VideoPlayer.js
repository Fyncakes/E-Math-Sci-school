import React, { useState } from 'react';

const VideoPlayer = ({ 
  title, 
  description, 
  videoUrl, 
  thumbnail, 
  duration,
  className = '' 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlay = () => {
    setIsLoading(true);
    setIsPlaying(true);
    
    // Simulate video loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div className={`video-player ${className}`}>
      <div className="video-container">
        {!isPlaying ? (
          <div className="video-thumbnail" onClick={handlePlay}>
            <div className="thumbnail-overlay">
              <div className="play-button">
                <div className="play-icon">▶️</div>
              </div>
              <div className="video-info">
                <h3>{title}</h3>
                <p>{description}</p>
                {duration && <span className="duration">{duration}</span>}
              </div>
            </div>
            <div className="thumbnail-image">
              {thumbnail || (
                <div className="default-thumbnail">
                  <div className="video-icon">🎥</div>
                  <p>Demo Video</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="video-content">
            {isLoading ? (
              <div className="video-loading">
                <div className="loading-spinner"></div>
                <p>Loading video...</p>
              </div>
            ) : (
              <div className="video-frame">
                <div className="video-placeholder">
                  <div className="video-icon-large">🎬</div>
                  <h3>{title}</h3>
                  <p>This would be a real video player</p>
                  <div className="video-controls">
                    <button onClick={handlePause} className="control-btn">
                      ⏸️ Pause
                    </button>
                    <button onClick={() => setIsPlaying(false)} className="control-btn">
                      ⏹️ Stop
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
