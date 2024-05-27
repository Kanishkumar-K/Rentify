import React from 'react';
import { Link } from 'react-router-dom';
import title from './img/rental.png';
import tenant from './img/tenant.jpg';
import owner from './img/owner.jpg';
import './article.css';
import Navbar from './Navbar';
import { Box, Typography, Container, Grid, TextField, Button } from '@mui/material';

const Article = () => {
  return (
    <div style={{ padding: '50px', paddingTop: "600px", marginBottom:"-50px" }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <img style={{ height: "550px", width: "1000px" }} src={title} alt="Rental" />
      </div>

      <Box sx={{ padding: '0 40px', textAlign: 'center', paddingTop: '20px', backgroundImage: "url(./img/image4.png)" }}>
        <Container maxWidth="md">
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', border: '1px solid black', borderRadius: '10px', padding: '20px', marginBottom: '50px' }}>
            <Typography variant="h5" component="h3" sx={{ marginBottom: '20px' }}>
              Who are we?
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1rem', lineHeight: '1.6' }}>
              Rentify is a leading online platform dedicated to simplifying the process of buying, selling, and renting properties. We provide a user-friendly experience that connects property owners, buyers, and renters.
            </Typography>
          </div>

          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', border: '1px solid black', borderRadius: '10px', padding: '20px', marginBottom: '50px' }}>
            <Typography variant="h5" component="h3" sx={{ marginBottom: '20px' }}>
              Is Rentify suitable for large-scale property transactions?
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1rem', lineHeight: '1.6' }}>
              Yes, Rentify is designed to handle large-scale property transactions efficiently. Our platform's robust architecture and advanced tools ensure smooth operations for both individual property deals and comprehensive real estate portfolios.
            </Typography>
          </div>

          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', border: '1px solid black', borderRadius: '10px', padding: '20px', marginBottom: '50px' }}>
            <Typography variant="h5" component="h3" sx={{ marginBottom: '20px' }}>
              How does Rentify differ from traditional real estate methods?
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1rem', lineHeight: '1.6' }}>
              Unlike traditional real estate methods, Rentify offers a modern, digital approach to property transactions. We leverage innovative technologies to streamline the buying, selling, and renting processes, ensuring efficiency and transparency throughout.
            </Typography>
          </div>
        </Container>
        <Navbar />
      </Box>

      <div className="signup-container">
        <div className="signup-half owner">
          <Link to="/owner" className="signup-link">
            <div className="signup-content"><br />
              <img style={{ height: "200px", width: "300px" }} src={owner} alt="Owners" className="signup-image" />
              <h2>For Sellers</h2><br />
            </div>
          </Link>
        </div>
        <div className="signup-half tenant">
          <Link to="/propertieslist" className="signup-link">
            <div className="signup-content"><br />
              <img style={{ height: "200px", width: "300px" }} src={tenant} alt="Tenants" className="signup-image" />
              <h2>For Buyers</h2><br />
            </div>
          </Link>
        </div>
      </div><br /><br />

      <Box sx={{ backgroundColor: '#101010', color: 'white', width: '100%', marginTop: '30px', paddingBottom: '40px', marginLeft:'-60px', width:'1540px', marginBottom:'-80px'}}>
        <Container maxWidth="lg">
          <footer style={{ padding: '20px 0', textAlign: 'center', fontFamily: 'serif' }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4} sx={{ textAlign: 'left' }}>
                <Typography variant="h5" gutterBottom>Useful Links</Typography>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '10px' }}><Link to="/about" style={{ color: '#fff', textDecoration: 'none' }}>About Us</Link></li>
                  <li style={{ marginBottom: '10px' }}><Link to="#services" style={{ color: '#fff', textDecoration: 'none' }}>Our Services</Link></li>
                  <li style={{ marginBottom: '10px' }}><Link to="/contacts" style={{ color: '#fff', textDecoration: 'none' }}>Contact Us</Link></li>
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
                  <TextField variant="outlined" placeholder="Enter your email" sx={{  width: '100%', marginBottom: '3s0px', backgroundColor: 'white', borderRadius: '5px' }} /><br />
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
    </div>
  );
};

export default Article;
