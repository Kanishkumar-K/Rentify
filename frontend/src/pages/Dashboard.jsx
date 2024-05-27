import React, { useState, useContext, useEffect } from 'react';
import useAxios from "../utils/useAxios";
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Dashboard.css'; // Import custom CSS for Dashboard styling
import Navbar from './Navbar';
import bgi from './img/image4.png';

const Dashboard = () => {
  const [response, setResponse] = useState("");
  const [tokenValid, setTokenValid] = useState(true); // State to track token validity
  const [lastLogin, setLastLogin] = useState(""); // State to store last login timestamp
  const api = useAxios();
  const token = localStorage.getItem("authTokens");
  const { logoutUser } = useContext(AuthContext);
  let inactivityTimer;

  const decode = jwtDecode(token);
  let user_id = decode.user_id;
  let username = decode.username;
  let email = decode.email;
  let full_name = decode.full_name;

  useEffect(() => {
      localStorage.setItem('full_name', full_name);
    }, [full_name]);
  
    
  useEffect(() => {
    localStorage.setItem('email', email);
  }, [email]);

  const handleInactivityLogout = () => {
    logoutUser();
    clearTimeout(inactivityTimer);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/test/");
        setResponse(response.data.response);

        // Assuming the last login timestamp is provided in the response data
        const lastLoginTimestamp = response.data.last_login;
        setLastLogin(lastLoginTimestamp); // Set the last login timestamp in state
      } catch (error) {
        console.log(error);
        setResponse("Something Went Wrong");
      }
    };

    fetchData();

    // Check token validity and expiry
    const checkTokenValidity = () => {
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert to seconds
        if (decodedToken.exp < currentTime) {
          // Token is expired, logout
          setTokenValid(false); // Token is invalid
          logoutUser();
        } else {
          setTokenValid(true); // Token is valid
        }
      } else {
        // Token is not present, logout
        setTokenValid(false); // Token is invalid
        logoutUser();
      }
    };

    // Start inactivity timer for 1 hour
    inactivityTimer = setTimeout(handleInactivityLogout, 60 * 60 * 1000); // 1 hour

    // Check token validity and start inactivity timer
    checkTokenValidity();

    // Cleanup function
    return () => {
      clearTimeout(inactivityTimer);
    };

  }, [api, token, logoutUser]);

  return (
    
    <div className='dashboard-container' style={{paddingLeft:'763px', paddingRight:'768px', marginLeft:'-600px', marginBottom: '-50px', marginTop:'-20px'}}><br /><br />
      <div className='dashboard'>
        <Navbar />
        <h1>Dashboard</h1><br />
        <p style={{marginLeft:'-10px'}}>Welcome, {full_name}👋</p>
        <span>User ID: {user_id}</span>
        <br />
        <span>Full Name: {full_name}</span>
        <br />
        <span>Email: {email}</span>
        <br />
        <span>Phone Number: {username}</span>
        <br />
        <span>Token validity: {tokenValid ? 'Valid' : 'Invalid'}</span> {/* Display token validity */}
        <br /><br />
        <span>{response}</span>
      </div>
      <div className='dashboard-buttons'>
        <Link to="/" className='dashboard-button'>Enter Rentify!</Link>
      </div>
    </div>
  );
};

export default Dashboard;
