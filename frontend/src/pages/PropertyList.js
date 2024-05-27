import React, { useEffect, useState } from 'react';
import axios from 'axios';
import emailjs from 'emailjs-com';
import bgi from './img/image4.png';
import {
    Card, CardContent, CardHeader, CardMedia, Typography, Button, Dialog, DialogContent, DialogActions, IconButton, Select, MenuItem, FormControl, InputLabel, Box, Snackbar, SnackbarContent, Pagination
} from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Error from '@mui/icons-material/Error';
import Close from '@mui/icons-material/Close';

const PropertyList = () => {
    const [properties, setProperties] = useState([]);
    const [wishlist, setWishlist] = useState(() => {
        const saved = localStorage.getItem('wishlist');
        return saved ? JSON.parse(saved) : [];
    });
    const [likes, setLikes] = useState(() => {
        const saved = localStorage.getItem('likes');
        return saved ? JSON.parse(saved) : {};
    });
    const [likeCounts, setLikeCounts] = useState(() => {
        const saved = localStorage.getItem('likeCounts');
        return saved ? JSON.parse(saved) : {};
    });
    const [fullscreenProperty, setFullscreenProperty] = useState(null);
    const [sortOption, setSortOption] = useState('');
    const [filterLocation, setFilterLocation] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    useEffect(() => {
        axios.get('http://localhost:8000/api/properties/')
            .then((response) => {
                setProperties(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const addToWishlist = (id) => {
        const index = wishlist.indexOf(id);
        let newWishlist = [];

        if (index === -1) {
            newWishlist = [...wishlist, id];
            setSnackbarMessage('Added to wishlist');
        } else {
            newWishlist = wishlist.filter(item => item !== id);
            setSnackbarMessage('Removed from wishlist');
        }

        setWishlist(newWishlist);
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
        setShowSnackbar(true);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowSnackbar(false);
    };

    const toggleLike = (id) => {
        const newLikes = { ...likes };
        const newLikeCounts = { ...likeCounts };

        if (newLikes[id]) {
            newLikes[id] = false;
            newLikeCounts[id] = (newLikeCounts[id] || 1) - 1;
        } else {
            newLikes[id] = true;
            newLikeCounts[id] = (newLikeCounts[id] || 0) + 1;
        }

        setLikes(newLikes);
        setLikeCounts(newLikeCounts);
        localStorage.setItem('likes', JSON.stringify(newLikes));
        localStorage.setItem('likeCounts', JSON.stringify(newLikeCounts));
    };

    const toggleFullscreen = (property) => {
        setFullscreenProperty(property ? property : null);
    };

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
        const sortedProperties = [...properties].sort((a, b) => {
            if (event.target.value === 'asc') {
                return a.price - b.price;
            } else if (event.target.value === 'desc') {
                return b.price - a.price;
            }
            return 0;
        });
        setProperties(sortedProperties);
    };

    const handleFilterChange = (event) => {
        setFilterLocation(event.target.value);
    };

    const filteredProperties = properties.filter(property => {
        if (!filterLocation) return true;
        return property.num_bedrooms === parseInt(filterLocation);
    });

    const indexOfLastProperty = currentPage * itemsPerPage;
    const indexOfFirstProperty = indexOfLastProperty - itemsPerPage;
    const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const sendEmail = (property) => {
        const email = localStorage.getItem('email');
        const full_name = localStorage.getItem('full_name');
        console.log('User Email:', email);
        console.log('Name:', full_name);

        if (!email) {
            alert('Unable to send Email');
            return;
        }


        const templateParams = {
            name: full_name,
            from_email: 'kanishkumar0409@gmail.com', 
            to_email: email,
            property_title: property.title,
            property_address: property.address,
            property_description: property.description,
            property_price: (property.price * 75).toLocaleString(),
            property_bedrooms: property.num_bedrooms,
            property_bathrooms: property.num_bathrooms,
            property_nearby: property.nearby,
            owner_name: property.owner_name,
            owner_phone: property.owner_phone,
        };

        emailjs.send('service_4wqjidi', 'template_izueejs', templateParams, 'cWcWJdKk9kDMkeYb1')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                setSnackbarMessage('Email sent successfully');
                setShowSnackbar(true);
            }, (error) => {
                console.log('FAILED...', error);
                setSnackbarMessage('Failed to send email');
                setShowSnackbar(true);
            });
    };

    return (
        <div style={{ backgroundImage: `url(${bgi})`, backgroundColor: 'white', width: '100vw', minHeight: '100vh', marginLeft:'-600px',alignItems: 'center', paddingTop: '250px', paddingBottom: '10px', marginBottom:'-50px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
                <h1>Property Listings</h1>
                <p>Click I'm Interested, to get contact info!</p>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <FormControl variant="outlined" style={{ minWidth: 150 }}>
                        <InputLabel>Sort by Cost</InputLabel>
                        <Select value={sortOption} onChange={handleSortChange} label="Sort by Cost">
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="asc">Low to High</MenuItem>
                            <MenuItem value="desc">High to Low</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" style={{ minWidth: 200 }}>
                        <InputLabel>Filter by Bedrooms</InputLabel>
                        <Select value={filterLocation} onChange={handleFilterChange} label="Filter by Bedrooms">
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="1">1 Bedroom</MenuItem>
                            <MenuItem value="2">2 Bedrooms</MenuItem>
                            <MenuItem value="3">3 Bedrooms</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                {currentProperties.map((property) => (
                    <Card key={property.id} sx={{ width: '30%', margin: '10px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                        <CardHeader
                            title={property.title}
                            subheader={`₹${(property.price * 75).toLocaleString()}`}
                        />
                        {property.image && (
                            <CardMedia
                                component="img"
                                height="200"
                                image={property.image}
                                alt={property.title}
                                style={{ objectFit: 'cover' }}
                            />
                        )}
                        <CardContent>
                            <Typography variant="body2" color="text.secondary" textAlign="left">
                                Address: {property.address}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" textAlign="left">
                                Description: {property.description}
                            </Typography><br />
                            <Typography variant="body2" color="text.secondary" textAlign="left">
                                Number of Bedrooms: {property.num_bedrooms}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" textAlign="left">
                                Number of Bathrooms: {property.num_bathrooms}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" textAlign="left">
                                Nearby Places: {property.nearby}
                            </Typography>
                            {wishlist.includes(property.id) && (
                                <>
                                    <Typography variant="body2" color="text.secondary" textAlign="left">
                                        Owner: {property.owner_name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" textAlign="left">
                                        Contact: {property.owner_phone}
                                    </Typography>
                                </>
                            )}
                            <Button
                                onClick={() => addToWishlist(property.id)}
                                variant="contained"
                                style={{ marginTop: '10px' }}
                            >
                                {wishlist.includes(property.id) ? 'Remove Interest' : 'I\'m Interested'}
                            </Button>

                            <Snackbar
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                open={showSnackbar}
                                autoHideDuration={6000}
                                onClose={handleCloseSnackbar}
                            >
                                <SnackbarContent
                                    style={{
                                        backgroundColor: snackbarMessage === 'Added to wishlist' ? '#43a047' : snackbarMessage === 'Removed from wishlist' ? '#f44336' : snackbarMessage === 'Email sent successfully' ? '#43a047' : '#f44336',
                                    }}
                                    message={
                                        <span style={{ display: 'flex', alignItems: 'center' }}>
                                            {snackbarMessage === 'Added to wishlist' || snackbarMessage === 'Email sent successfully' ? <CheckCircle style={{ marginRight: '8px' }} /> : <Error style={{ marginRight: '8px' }} />}
                                            {snackbarMessage}
                                        </span>
                                    }
                                    action={
                                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
                                            <Close fontSize="small" />
                                        </IconButton>
                                    }
                                />
                            </Snackbar>

                            <Button
                                onClick={() => sendEmail(property)}
                                variant="contained"
                                color="primary"
                                style={{ marginTop: '10px', marginLeft: '10px' }}
                            >
                                Email
                            </Button>
                            <Button onClick={() => toggleFullscreen(property)} startIcon={<FullscreenIcon />} variant="outlined" style={{ marginTop: '10px', marginLeft: '10px' }}>
                                Expand
                            </Button>
                            <IconButton onClick={() => toggleLike(property.id)} color="secondary" style={{ marginTop: '10px', marginLeft: '10px' }}>
                                {likes[property.id] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                <Typography variant="body2" style={{ marginLeft: '5px' }}>{likeCounts[property.id] || 0}</Typography>
                            </IconButton>


                        </CardContent>
                    </Card>
                ))}
            </div>
            <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                    count={Math.ceil(filteredProperties.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
            {fullscreenProperty && (
                <Dialog
                    open={true}
                    onClose={() => toggleFullscreen(null)}
                    maxWidth="lg"
                    fullWidth
                    PaperProps={{ style: { margin: 0, maxWidth: 'none', width: '100%', height: '100%' } }}
                >
                    <DialogContent style={{ padding: 0 }}>
                        <CardMedia
                            component="img"
                            image={fullscreenProperty.image}
                            alt={fullscreenProperty.title}
                            style={{ width: '100%', height: '70vh', objectFit: 'cover' }}
                        />
                        <div style={{ padding: '20px' }}>
                            <Typography variant="h4" gutterBottom>
                                {fullscreenProperty.title}
                            </Typography>
                            <Typography variant="h6" color="textSecondary" gutterBottom>
                                ₹{(fullscreenProperty.price * 75).toLocaleString()}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Address: {fullscreenProperty.address}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Description: {fullscreenProperty.description}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Bedrooms: {fullscreenProperty.num_bedrooms}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Bathrooms: {fullscreenProperty.num_bathrooms}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Nearby Places: {fullscreenProperty.nearby}
                            </Typography>
                            {wishlist.includes(fullscreenProperty.id) && (
                                <>
                                    <Typography variant="body1" gutterBottom>
                                        Owner: {fullscreenProperty.owner_name}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        Contact: {fullscreenProperty.owner_phone}
                                    </Typography>
                                </>
                            )}
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => toggleFullscreen(null)} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
};

export default PropertyList;
