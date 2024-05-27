import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../context/AuthContext';
import backgroundImage from './img/new.jpeg'; // Import background image

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const validateEmail = (input) => {
    const value = input.trim();
    if (!value) {
      setEmailError('Email is required');
      setEmailValid(false);
    } else if (!emailRegex.test(value)) {
      setEmailError('Invalid email address');
      setEmailValid(false);
    } else {
      setEmailError('');
      setEmailValid(true);
    }
  };

  const validatePassword = (input) => {
    const value = input.trim();
    if (!value) {
      setPasswordError('Password is required');
      setPasswordValid(false);
    } else if (!passwordRegex.test(value)) {
      setPasswordError(
        'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number'
      );
      setPasswordValid(false);
    } else {
      setPasswordError('');
      setPasswordValid(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    validateEmail(email);
    validatePassword(password);

    if (!emailValid || !passwordValid) {
      return;
    }

    // Call loginUser function from AuthContext
    const response = await loginUser(email, password);

    if (response && response.token) {
      // Store token in localStorage
      localStorage.setItem('token', response.token);
      <Link to ="/dashboard"></Link>
    } 
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  return (
    <div style={{
      display: 'flex',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      width: '100vw',
      marginLeft: '-594px',
      marginTop: '0px',
      fontFamily: 'Arial, sans-serif',marginBottom:'-50px', marginTop:'-35px'
    }}>

      <div style={{
        marginTop: '80px',
        marginBottom: '100px',
        marginLeft: '900px',
        marginRight: '100px',
        position: 'relative',
        border: '2px solid #000',
        padding: '40px',
        borderRadius: '5px',
        width: '500px',
        backgroundColor: '#ffffff',
        fontSize: '16px'
      }}>

        <h1 style={{ marginBottom: '20px' }}>Login</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="email">Email:</label>
          <div style={{ position: 'relative' }}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              value={email}
              onChange={handleEmailChange}
              style={{ border: emailValid ? '2px solid green' : emailError ? '2px solid red' : '2px solid #ccc', borderRadius: '4px', padding: '8px', marginBottom: '10px', width: '100%' }}
            />
            {emailValid && <FontAwesomeIcon icon={faCheck} style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', color: 'green' }} />}
          </div>
          {emailError && <p style={{ color: 'red', marginBottom: '10px' }}>{emailError}</p>}

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Your Password"
            value={password}
            onChange={handlePasswordChange}
            style={{ border: passwordValid ? '2px solid green' : passwordError ? '2px solid red' : '2px solid #ccc', borderRadius: '4px', padding: '8px', width: '100%' }}
          />
          {passwordError && <p style={{ color: 'red', marginBottom: '10px' }}>{passwordError}</p>}
          <br /><br />
          <div className='btn-container'>
            <button type='submit' style={{ backgroundColor: '#77ef14', padding: '14px 20px', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer', paddingLeft:'180px', paddingRight:'180px' }}>
              Login
            </button>
          </div><br />
          <p style={{ fontSize: '14px' }}>Don't Have an Account?&nbsp;
            <Link to="/register" style={{ textDecoration: 'none', color: '#4285F4' }}>Register</Link>
          </p>

        </form>
      </div>
    </div>
  )
}

export default Login;
