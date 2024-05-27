import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
import bgi from './img/image4.png';
import { Box, Typography, Container, Grid, TextField, Button, Link as MuiLink } from '@mui/material';

const Contacts = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${bgi})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        minHeight: '100vh',
        paddingTop: '500px',
        marginLeft:"-600px", marginBottom: '-50px'
      }}
    >
      <Navbar />
      <Container maxWidth="md" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 2, padding: 3 }}>
        <Typography variant="h2" align="center" gutterBottom>
          Contact Information
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Welcome to Rentify! Learn about our services and find the perfect rental property with ease.
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Discover the power of Rentify! Elevate your rental experience with our user-friendly platform.
        </Typography>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <FontAwesomeIcon icon={faMapMarkerAlt} style={{ fontSize: '24px', marginBottom: '10px' }} />
            <Typography variant="body1">Official Address (Location)</Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <FontAwesomeIcon icon={faPhone} style={{ fontSize: '24px', marginBottom: '10px' }} />
            <Typography variant="body1">Contact Number: +1234567890</Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: '24px', marginBottom: '10px' }} />
            <Typography variant="body1">Email: example@example.com</Typography>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: 'center', marginTop: 5 }}>
          <Typography variant="h4">Follow Us</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <MuiLink href="https://www.facebook.com/example" sx={{ mx: 2, color: 'grey' }}>
              <FontAwesomeIcon icon={faFacebook} style={{ fontSize: '24px' }} />
            </MuiLink>
            <MuiLink href="https://twitter.com/example" sx={{ mx: 2, color: 'grey' }}>
              <FontAwesomeIcon icon={faTwitter} style={{ fontSize: '24px' }} />
            </MuiLink>
            <MuiLink href="https://www.instagram.com/example" sx={{ mx: 2, color: 'grey' }}>
              <FontAwesomeIcon icon={faInstagram} style={{ fontSize: '24px' }} />
            </MuiLink>
          </Box>
        </Box>
      </Container>
      <br /><br /><br />
      <Box sx={{ backgroundColor: '#101010', color: 'white', width: '100%', marginTop: '30px', paddingBottom: '40px' }}>
        <Container maxWidth="lg">
          <footer style={{ padding: '20px 0', textAlign: 'center', fontFamily: 'serif' }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4} sx={{ textAlign: 'left' }}>
                <Typography variant="h5" gutterBottom>Useful Links</Typography>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '10px' }}><MuiLink href="about" sx={{ color: '#fff', textDecoration: 'none' }}>About Us</MuiLink></li>
                  <li style={{ marginBottom: '10px' }}><MuiLink href="" sx={{ color: '#fff', textDecoration: 'none' }}>Our Services</MuiLink></li>
                  <li style={{ marginBottom: '10px' }}><MuiLink href="" sx={{ color: '#fff', textDecoration: 'none' }}>Contact Us</MuiLink></li>
                </ul>
              </Grid>
              <Grid item xs={12} md={4} sx={{ textAlign: 'left' }}>
                <Typography variant="h5" gutterBottom>Connect with Us</Typography>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '10px' }}><MuiLink href="#" sx={{ color: '#fff', textDecoration: 'none' }}>Facebook</MuiLink></li>
                  <li style={{ marginBottom: '10px' }}><MuiLink href="#" sx={{ color: '#fff', textDecoration: 'none' }}>Twitter</MuiLink></li>
                  <li style={{ marginBottom: '10px' }}><MuiLink href="#" sx={{ color: '#fff', textDecoration: 'none' }}>Instagram</MuiLink></li>
                  <li style={{ marginBottom: '10px' }}><MuiLink href="#" sx={{ color: '#fff', textDecoration: 'none' }}>LinkedIn</MuiLink></li>
                </ul>
              </Grid>
              <Grid item xs={12} md={4} sx={{ textAlign: 'left' }}>
                <Typography variant="h5" gutterBottom>Subscribe to Our Newsletter</Typography>
                <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <TextField variant="filled" placeholder="Enter your email" sx={{ border: "2px solid white", padding: '10px', width: '100%', marginBottom: '10px' }} />
                  <Button type="submit" variant="contained" sx={{ backgroundColor: '#fff', color: '#333', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Subscribe</Button>
                </form>
              </Grid>
            </Grid>
            <Typography variant="body2" sx={{ fontSize: '14px', marginTop: '40px', textAlign: 'center' }}>© 2024 Rentify. All rights reserved.</Typography>
          </footer>
        </Container>
      </Box>
    </Box>
  );
};

export default Contacts;
