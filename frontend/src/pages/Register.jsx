import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../context/AuthContext';
import backgroundImage from './img/new.jpeg'; // Import background image

const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [fullNameValid, setFullNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [usernameValid, setUsernameValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);

  const fullNameRegex = /^[a-zA-Z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const validateFullName = (input) => {
    const value = input.trim();
    if (!value) {
      setFullNameError('Full Name is required');
      setFullNameValid(false);
    } else if (!fullNameRegex.test(value)) {
      setFullNameError('Invalid full name');
      setFullNameValid(false);
    } else {
      setFullNameError('');
      setFullNameValid(true);
    }
  };

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

  const validateUsername = (input) => {
    const value = input.trim();
    if (!value) {
      setUsernameError('Phone Number is required');
      setUsernameValid(false);
    } else {
      setUsernameError('');
      setUsernameValid(true);
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

  const validateConfirmPassword = (input) => {
    if (input !== password) {
      setConfirmPasswordError('Passwords do not match');
      setConfirmPasswordValid(false);
    } else {
      setConfirmPasswordError('');
      setConfirmPasswordValid(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous errors
    setFullNameError('');
    setEmailError('');
    setUsernameError('');
    setPasswordError('');
    setConfirmPasswordError('');

    // Validate form fields
    validateFullName(fullName);
    validateEmail(email);
    validateUsername(username);
    validatePassword(password);
    validateConfirmPassword(confirmPassword);

    // If there are errors, return early
    if (!fullNameValid || !emailValid || !usernameValid || !passwordValid || !confirmPasswordValid) {
      return;
    }

    // Call registerUser function from AuthContext
    registerUser(fullName, email, username, password, confirmPassword);
  };

  return (
    <div style={{
      display: 'flex',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      width: '100vw',
      marginLeft: '-594px',marginBottom:'-50px', marginTop:'-50px',
      fontFamily: 'Arial, sans-serif',
    }}>

      <div style={{
        marginTop: '20px',
        marginBottom: '20px',
        marginLeft: '900px',
        marginRight: '100px',
        position: 'relative',
        border: '2px solid #000',
        padding: '40px',
        borderRadius: '5px',
        width: '500px',
        backgroundColor: '#ffffff',
        fontSize: '16px',
        paddingBottom:'100px'
      }}>

        <h1 style={{ marginBottom: '20px' }}>Sign Up</h1>
        <form onSubmit={handleSubmit} className="register-form">
          <label htmlFor="fullName">Name:</label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Your Name"
              value={fullName}
              onChange={(e) => { setFullName(e.target.value); validateFullName(e.target.value); }}
              style={{ border: fullNameValid ? '2px solid green' : fullNameError ? '2px solid red' : '2px solid #ccc', borderRadius: '4px', padding: '8px', marginBottom: '10px', width: '100%' }}
            />
          </div>
          {fullNameError && <p style={{ color: 'red', marginBottom: '10px' }}>{fullNameError}</p>}

          <label htmlFor="username">Phone:</label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Phone Number"
              value={username}
              onChange={(e) => { setUsername(e.target.value); }}
              style={{ border: usernameValid ? '2px solid green' : usernameError ? '2px solid red' : '2px solid #ccc', borderRadius: '4px', padding: '8px', marginBottom: '10px', width: '100%' }}
            />
          </div>
          {usernameError && <p style={{ color: 'red', marginBottom: '10px' }}>{usernameError}</p>}

          <label htmlFor="email">Email:</label>
          <div style={{ position: 'relative' }}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); validateEmail(e.target.value); }}
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
            onChange={(e) => { setPassword(e.target.value); validatePassword(e.target.value); }}
            style={{ border: passwordValid ? '2px solid green' : passwordError ? '2px solid red' : '2px solid #ccc', borderRadius: '4px', padding: '8px', marginBottom: '10px', width: '100%' }}
          />
          {passwordError && <p style={{ color: 'red', marginBottom: '10px' }}>{passwordError}</p>}

          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Your Password"
            value={confirmPassword}
            onChange={(e) => { setConfirmPassword(e.target.value); validateConfirmPassword(e.target.value); }}
            style={{ border: confirmPasswordValid ? '2px solid green' : confirmPasswordError ? '2px solid red' : '2px solid #ccc', borderRadius: '4px', padding: '8px', marginBottom: '10px', width: '100%' }}
          />
          {confirmPasswordError && <p style={{ color: 'red', marginBottom: '10px' }}>{confirmPasswordError}</p>}

          <br /><br />
          <div className='btn-container'>
            <button type='submit' style={{ backgroundColor: '#77ef14', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer', paddingLeft:'135px', paddingRight:'135px' }}>
              Create Account
            </button>
          </div><br />
          <p style={{ fontSize: '14px' }}>Already Have an Account?&nbsp;
            <Link to="/login" style={{ textDecoration: 'none', color: '#4285F4' }}>Login</Link>
          </p>

        </form>
      </div>
    </div>
  )
}

export default Register;
