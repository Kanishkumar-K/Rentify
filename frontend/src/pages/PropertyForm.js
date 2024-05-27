import React, { useEffect, useState } from 'react';
import axios from 'axios';
import bgi from './img/image4.png';
import { Container, TextField, Button, Box, Typography, Snackbar, Alert } from '@mui/material';

const Home = () => {

  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    num_bedrooms: '',
    num_bathrooms: '',
    nearby: '',
    price: '',
    owner_name: '',
    owner_phone: '',
    image: null,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('address', formData.address);
      data.append('num_bedrooms', formData.num_bedrooms);
      data.append('num_bathrooms', formData.num_bathrooms);
      data.append('nearby', formData.nearby);
      data.append('price', formData.price);
      data.append('owner_name', formData.owner_name);
      data.append('owner_phone', formData.owner_phone);
      data.append('image', formData.image);

      const response = await axios.post('http://localhost:8000/api/properties/', data);
      console.log(response.data);
      setFormSubmitted(true);
      setOpenSnackbar(true);
      setTimeout(() => setFormSubmitted(false), 3000); // Hide alert after 3 seconds
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <Box 
      sx={{ 
        backgroundImage: `url(${bgi})`, 
        backgroundColor: 'white', 
        width: '100vw', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        padding: '20px',
        paddingTop: '550px', // Adjusted padding for better visual balance
        marginLeft: '-600px', marginBottom:'-50px'
      }}
    >
              <Typography variant="h4" gutterBottom>Add Your Property</Typography><br />

      <Container maxWidth="sm" sx={{ textAlign: 'center', padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px' }}>
        <Typography variant="h4" gutterBottom>Submit Your Property</Typography><br />
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            fullWidth
            sx={{ marginBottom: '15px' }}
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            multiline
            rows={4}
            fullWidth
            sx={{ marginBottom: '15px' }}
          />
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            fullWidth
            sx={{ marginBottom: '15px' }}
          />
          <TextField
            label="Number of Bedrooms"
            name="num_bedrooms"
            value={formData.num_bedrooms}
            onChange={handleChange}
            required
            type="number"
            fullWidth
            sx={{ marginBottom: '15px' }}
          />
          <TextField
            label="Number of Bathrooms"
            name="num_bathrooms"
            value={formData.num_bathrooms}
            onChange={handleChange}
            required
            type="number"
            fullWidth
            sx={{ marginBottom: '15px' }}
          />
          <TextField
            label="Nearby Location"
            name="nearby"
            value={formData.nearby}
            onChange={handleChange}
            required
            fullWidth
            sx={{ marginBottom: '15px' }}
          />
          <TextField
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            type="number"
            fullWidth
            sx={{ marginBottom: '15px' }}
          />
          <TextField
            label="Owner Name"
            name="owner_name"
            value={formData.owner_name}
            onChange={handleChange}
            required
            fullWidth
            sx={{ marginBottom: '15px' }}
          />
          <TextField
            label="Owner Phone"
            name="owner_phone"
            value={formData.owner_phone}
            onChange={handleChange}
            required
            fullWidth
            sx={{ marginBottom: '15px' }}
          />
          <Box sx={{ textAlign: 'left', marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Upload Image:</label>
            <input type="file" name="image" onChange={handleImageChange} accept="image/*" required style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '8px' }} />
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ padding: '10px', borderRadius: '8px' }}>
            Submit
          </Button>
        </form>
      </Container>
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Form submitted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Home;
