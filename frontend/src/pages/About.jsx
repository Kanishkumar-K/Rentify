import React from 'react';
import { Link } from 'react-router-dom';
import bgi from './img/image4.png';
import Navbar from './Navbar';
import { Box, Typography, Container, Button, Grid, TextField } from '@mui/material';

const About = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${bgi})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
        width: '100vw',
        minHeight: '100vh',
        paddingTop: '450px',
        marginLeft:"-600px", marginBottom: '-50px'
      }}
    >
      <Container maxWidth="md" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 2, padding: 3 }}>
      <Typography variant="h3" align="center" gutterBottom>
          About Rentify
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '20px', textAlign: 'justify', marginBottom: '20px' }}>
          Welcome to Rentify, your premier online platform for buying and selling properties. We are dedicated to providing a seamless experience for both buyers and sellers in the real estate market.
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '20px', textAlign: 'justify', marginBottom: '20px' }}>
          Whether you're looking to find your dream home or sell your property quickly, Rentify offers comprehensive tools and resources to facilitate your real estate transactions. Our platform ensures accessibility and ease of use for all users, whether you're new to property transactions or a seasoned investor.
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '20px', textAlign: 'justify', marginBottom: '20px' }}>
          Thank you for choosing Rentify as your preferred online marketplace for real estate. Let's explore the world of property buying and selling together!
        </Typography>

        <Link to="/contacts" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="success" sx={{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
            Contact Us
          </Button>
        </Link>
      </Container>
<br />
      <Box sx={{ backgroundColor: '#101010', color: 'white', width: '100%', marginTop: '30px', paddingBottom: '40px' }}>
        <Container maxWidth="lg">
          <footer style={{ padding: '20px 0', textAlign: 'center', fontFamily: 'serif' }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4} sx={{ textAlign: 'left' }}>
                <Typography variant="h5" gutterBottom>Useful Links</Typography>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '10px' }}><a href="about" style={{ color: '#fff', textDecoration: 'none' }}>About Us</a></li>
                  <li style={{ marginBottom: '10px' }}><a href="#services" style={{ color: '#fff', textDecoration: 'none' }}>Our Services</a></li>
                  <li style={{ marginBottom: '10px' }}><a href="contacts" style={{ color: '#fff', textDecoration: 'none' }}>Contact Us</a></li>
                </ul>
              </Grid>
              <Grid item xs={12} md={4} sx={{ textAlign: 'left' }}>
                <Typography variant="h5" gutterBottom>Connect with Us</Typography>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Facebook</a></li>
                  <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Twitter</a></li>
                  <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Instagram</a></li>
                  <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: '#fff', textDecoration: 'none' }}>LinkedIn</a></li>
                </ul>
              </Grid>
              <Grid item xs={12} md={4} sx={{ textAlign: 'left' }}>
                <Typography variant="h5" gutterBottom>Subscribe to Our Newsletter</Typography>
                <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <TextField variant="outlined" placeholder="Enter your email" sx={{ border: "2px solid white", padding: '10px', width: '100%', marginBottom: '10px' }} />
                  <Button type="submit" variant="contained" sx={{ backgroundColor: '#fff', color: '#333', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
                    Subscribe
                  </Button>
                </form>
              </Grid>
            </Grid>
            <Typography variant="body2" sx={{ fontSize: '14px', marginTop: '40px' }}>© 2024 Rentify. All rights reserved.</Typography>
          </footer>
        </Container>
      </Box>
      <Navbar />
    </Box>
  );
};

export default About;
