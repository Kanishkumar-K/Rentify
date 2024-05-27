import React, { useContext } from 'react';
import {jwtDecode} from 'jwt-decode';
import AuthContext from "../context/AuthContext";
import Navbar from './Navbar';
import Navbar1 from './Navbar1';
import bgi from './img/image4.png';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

const Home = () => {
  const { user } = useContext(AuthContext); // Use useContext to get user state from AuthContext
  const token = localStorage.getItem("authTokens");

  let decodedUser = null;
  if (user && token) {
    decodedUser = jwtDecode(token);
  }

  return (
    <div style={{ 
      backgroundImage: `url(${bgi})`, 
      backgroundColor: 'white', 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat', 
      width: '100vw', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      paddingTop: '20px', 
      marginLeft: '-590px' , marginBottom: '-50px'
    }}>
      {user ? (
        <Navbar />
      ) : (
        <Navbar1 />
      )}
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: 2,
          boxShadow: 3,
          padding: 3,
          textAlign: 'center',
          maxWidth: 600,
          width: '100%',
          mt: 5,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome to Rentify.com
        </Typography>
        <Typography variant="body1" paragraph>
          Discover your perfect rental home with Rentify.com. Browse through our extensive list of properties and find the one that suits your needs and budget. Whether you're looking for a cozy apartment or a spacious house, we have it all!
        </Typography>
        <Typography variant="body1" paragraph>
          Our platform is designed to make the rental process as smooth as possible, offering detailed property descriptions, high-quality images, and virtual tours to help you make an informed decision.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={user ? "/properties" : "/propertylist"}
          sx={{ mt: 3 }}
        >
          View Properties
        </Button>
      </Box>
    </div>
  );
};

export default Home;
