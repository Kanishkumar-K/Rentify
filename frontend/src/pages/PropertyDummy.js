import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { Card, CardHeader, CardMedia, CardContent, Typography, Box, FormControl, InputLabel, MenuItem, Select, Snackbar, Alert, Pagination } from '@mui/material';
import bgi from './img/image4.png';

const PropertyDummy = () => {
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
    const { user } = useContext(AuthContext);
    const [fullscreenProperty, setFullscreenProperty] = useState(null);
    const [sortOption, setSortOption] = useState('');
    const [filterLocation, setFilterLocation] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    useEffect(() => {
        axios.get('http://localhost:8000/api/properties/')
            .then((response) => {
                setProperties(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError('Failed to fetch properties');
                setLoading(false);
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

    return (
        <div style={{ backgroundImage: `url(${bgi})`, backgroundColor: 'white', width: '100vw', minHeight: '100vh', marginLeft:'-600px',alignItems: 'center', paddingTop: '250px', paddingBottom: '10px', marginBottom:'-50px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
                <h1>Property Listings</h1>
                <p>Please login to view Owner info!</p>
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
                {loading ? (
                    <Typography>Loading...</Typography>
                ) : error ? (
                    <Typography>{error}</Typography>
                ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                        {currentProperties.map((property) => (
                            <Card key={property.id} sx={{ flex: '1 0 30%', margin: '10px', maxWidth: '30%', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
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
                                <CardContent style={{ padding: '20px' }}>
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
                                    {!user && (
                                        <Link to="/login">
                                            <button style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>
                                                Login to view full info
                                            </button>
                                        </Link>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
                <Box display="flex" justifyContent="center" mt={4}>
                    <Pagination count={Math.ceil(filteredProperties.length / itemsPerPage)} page={currentPage} onChange={handlePageChange} color="primary" />
                </Box>
                <Snackbar open={showSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
};

export default PropertyDummy;
