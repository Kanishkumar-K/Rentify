import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext'; // Assuming you have AuthContext defined
import './Navbar.css'; // Import your custom CSS for Navbar styling

function Navbar() {
  const { user, logoutUser } = useContext(AuthContext); // Use AuthContext to get user state and logout function
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logoutUser(); // Call logout function from AuthContext
  };

  return (
    <nav className="navbar-container">
      <ul className="navbar-menu">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link">About</Link>
        </li>
        <li className="nav-item">
          <Link to="/contacts" className="nav-link">Contacts</Link>
        </li>
      </ul>
      <ul className="user-section">
        <li className="user-info">
          {user ? (
            <>
              <span className="welcome-message">Welcome, {user.full_name}</span>
              <button className="menu-button" onClick={() => setShowMenu(!showMenu)}>☰</button>
            </>
          ) : (
            <Link to="/register" className="signup-link">Sign Up</Link>
          )}
        </li>
      </ul>
      {showMenu && user && (
        <div className="dropdown-menu">
          <ul className="dropdown-list">
          <li className="dropdown-item">
              <Link to="/" className="dropdown-link">Home</Link>
            </li>
            <li className="dropdown-item">
              <Link to="/dashboard" className="dropdown-link">Profile</Link>
            </li>
            <li className="dropdown-item">
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
