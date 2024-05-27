import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext'; 


function Navbar() {
  const { user, logoutUser } = useContext(AuthContext); 
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logoutUser(); 
  };

  return (
    <nav style={{ backgroundColor: '#171717', color: 'white', width: '100%', position: 'fixed', top: 0, left: 0, zIndex: 9999 }}>
      <ul style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', margin: 0, fontSize: '16px' }}>
        <li style={{ listStyleType: 'none' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '18px' }}>Home</Link>
          <Link to="/about" style={{ color: 'white', textDecoration: 'none', marginRight: '18px' }}>About</Link>
          <Link to="/contacts" style={{ color: 'white', textDecoration: 'none', marginRight: '18px' }}>Contacts</Link>
        </li>
        <li className="user-info" style={{ listStyleType: 'none', fontSize: '16px' }}>
          {user ? (
            <>
              <span style={{ marginRight: '10px' }}>Welcome, Guest</span> {/* Assuming username is in user object */}
              <button onClick={() => setShowMenu(!showMenu)}>☰</button>
            </>
          ) : (
            <Link to="/register" style={{ color: 'white', textDecoration: 'none', marginRight: '10px' }}>Sign Up</Link>
          )}
        </li>
      </ul>
      {showMenu && user && (
        <div style={{ backgroundColor: '#171717', color: 'white', padding: '10px', position: 'absolute', top: '50px', right: '20px' }}>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
