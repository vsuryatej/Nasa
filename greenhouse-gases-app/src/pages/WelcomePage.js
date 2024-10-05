import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import video from '../content/videoo.mp4'; // Import the video file

const WelcomePage = () => {
  const [videoEnded, setVideoEnded] = useState(false);
  const navigate = useNavigate();

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <video
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        src={video} // Use the imported video file
        autoPlay
        muted
        onEnded={handleVideoEnd}
      />
      {videoEnded && (
        <button
          style={{
            position: 'absolute',
            bottom: '50px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '10px 20px',
            backgroundColor: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/login')}
        >
          Know More...
        </button>
      )}
    </div>
  );
};

export default WelcomePage;
