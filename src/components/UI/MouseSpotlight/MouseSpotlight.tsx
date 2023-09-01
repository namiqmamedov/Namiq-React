import { useState } from 'react';
import '../../../styles/mousespotlight.css'
import {useNavigate } from 'react-router-dom';

const MouseSpotlight = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  }

  const handleMouseMove = (e:any) => {
    setMousePosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  };

  return (
    <div className="error-index w-full h-screen" onMouseMove={handleMouseMove}>
      <div className="image">
        <div
          className="overlay"
          style={{
            backgroundImage: `radial-gradient(circle 50px at ${mousePosition.x}px ${mousePosition.y}px, transparent 100px, rgba(9 9 9 / 90%) 250px)`,
          }}
          
        >
          <div className="page-content">
            <h1>Page not fo<span>u</span>nd</h1>
            <p className='mt-3 ml-10 mr-10'>Hmm, the page you were looking for doesn’t seem to exist anymore.</p>
              <button type="button" className="btn btn-primary text-black bg-white px-4 py-2 mt-2" onClick={handleClick} >
                Back to home
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MouseSpotlight;
