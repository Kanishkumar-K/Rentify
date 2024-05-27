import { jwtDecode } from 'jwt-decode';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import bgi from './img/image4.png';
import bgi1 from './img/sale.jpg';
import AuthContext from "../context/AuthContext";

const Home = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [user_id, setUser_id] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authTokens");

    if (user && token) {
      const decoded = jwtDecode(token);
      setUser_id(decoded.user_id);
    }

    // Scroll to the top of the page
    window.scrollTo(0, 0);

  }, [user]);

  return (
    <div style={{ 
      backgroundImage: `url(${bgi})`, 
      backgroundColor: 'white', 
      width: '100vw', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      padding: '20px',
      paddingTop: '650px', // Adjusted padding for better visual balance
      marginLeft:"-600px", marginBottom:'-50px'
      }}>
      {user ? (
        <>
          <h1 style={{ fontSize: '3rem', marginBottom: '20px', textAlign: 'center' }}>Welcome, {user.full_name}!</h1>

          <div style={{ 
            fontSize: '1.5rem', 
            marginBottom: '40px', 
            textAlign: 'center',
            maxWidth: '600px' // Limit width to center align content better
            }}>
            Post Your Property in 3 Simple Steps
          </div>

          <img src={bgi1} alt="Sale" style={{ 
            height: 'auto', 
            maxWidth: '100%', 
            marginBottom: '40px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' // Added box shadow for depth
            }} />

          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginBottom: '40px'
            }}>
            <div style={{ textAlign: 'center', margin: '0 30px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" style={{ fill: 'none', stroke: '#007bff', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }}>
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 8v4l3 3"></path>
                <path d="M12 16v.01"></path>
              </svg>
              <p style={{ marginTop: '10px', fontSize: '1.2rem' }}>Add Title & Description</p>
            </div>
            <div style={{ textAlign: 'center', margin: '0 30px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" style={{ fill: 'none', stroke: '#dc3545', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }}>
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16s-8-4.5-8-8V4h16v3.5c0 3.5-8 8-8 8z"></path>
              </svg>
              <p style={{ marginTop: '10px', fontSize: '1.2rem' }}>Add Images</p>
            </div>
            <div style={{ textAlign: 'center', margin: '0 30px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" style={{ fill: 'none', stroke: '#28a745', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }}>
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M16 12l-4 4-4-4"></path>
              </svg>
              <p style={{ marginTop: '10px', fontSize: '1.2rem' }}>Add Nearby Spots</p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
            <Link to="/add-property" style={{ textDecoration: 'none', margin: '0 10px' }}>
              <button style={{ 
                padding: '14px 28px', 
                fontSize: '1.2rem', 
                backgroundColor: '#007bff', 
                color: '#fff', 
                border: 'none', 
                cursor: 'pointer',
                borderRadius: '6px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' // Added box shadow for depth
                }}>
                Post a Property
              </button>
            </Link>
            <Link to={`/my`} style={{ textDecoration: 'none', margin: '0 10px' }}>
              <button style={{ 
                padding: '14px 28px', 
                fontSize: '1.2rem', 
                backgroundColor: '#dc3545', 
                color: '#fff', 
                border: 'none', 
                cursor: 'pointer',
                borderRadius: '6px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' // Added box shadow for depth
                }}>
                View My Posts
              </button>
            </Link>
          </div>

          <button onClick={logoutUser} style={{ 
            padding: '14px 28px', 
            fontSize: '1.2rem', 
            backgroundColor: '#6c757d', 
            color: '#fff', 
            border: 'none', 
            cursor: 'pointer',
            borderRadius: '6px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' // Added box shadow for depth
            }}>
            Logout
          </button>
        </>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1.5rem', color: '#555', marginBottom: '20px', marginTop:"-500px" }}>Please log in to post your property online.</p>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <button style={{ 
              padding: '12px 24px', 
              fontSize: '1.2rem', 
              backgroundColor: '#007bff', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '6px', 
              cursor: 'pointer', 
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' // Added box shadow for depth
              }}>
              Login
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
