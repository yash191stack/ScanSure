import React from 'react';
import './CustomCursor.css';

function CustomCursor({ position }) {
  return (
    <>
      <div 
        className="cursor-main"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      ></div>
      <div 
        className="cursor-glow"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      ></div>
      <div 
        className="cursor-trail"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      ></div>
    </>
  );
}

export default CustomCursor;
