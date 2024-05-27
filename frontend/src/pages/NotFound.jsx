import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import imgop from './img/imag109.png';
import './NotFound.css'; 
import { Link } from 'react-router-dom';

const NotFound = () => {
  const vehicleRef = useRef(null);

  useEffect(() => {
    const vehicleAnimation = anime({
      targets: vehicleRef.current,
      translateX: '-100vw', // Move the vehicle from right to left
      duration: 10000, // Duration of the animation in milliseconds
      easing: 'linear', // Use linear easing for constant speed
      loop: true, // Loop the animation infinitely
    });

    return () => {
      vehicleAnimation.pause(); // Pause the animation when the component unmounts
    };
  }, []);

  return (
    <div style={{marginLeft:"-600px", marginBottom:'-50px', marginTop:"-30px"}} className="not-found-container">
      <div className="road"></div> {/* Road animation */}
      <div className="clouds"></div> {/* Passing clouds animation */}
      <img
        ref={vehicleRef}
        src={imgop}
        alt="Vehicle"
        className="vehicle"
      /> {/* Vehicle animation */}
      <div className="content">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <button className="switch-button"><Link to="/">Go Home</Link></button> {/* Switch button */}
      </div>
    </div>
  );
}

export default NotFound;
