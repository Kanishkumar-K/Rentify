import React, { useEffect, useState } from 'react';
import axios from 'axios';
import bgi from './img/image4.png';
import {
    Card, CardContent, CardHeader, CardMedia, Typography, Button, Dialog, DialogContent, DialogActions, IconButton, Box
} from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Pagination from '@mui/material/Pagination';

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
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const userFullName = localStorage.getItem('full_name') || '';

    useEffect(() => {
        // Scroll to top on component mount
        window.scrollTo(0, 0);

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
        if (index === -1) {
            const newWishlist = [...wishlist, id];
            setWishlist(newWishlist);
            localStorage.setItem('wishlist', JSON.stringify(newWishlist));
        } else {
            const newWishlist = wishlist.filter(item => item !== id);
            setWishlist(newWishlist);
            localStorage.setItem('wishlist', JSON.stringify(newWishlist));
        }
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

    const filteredProperties = properties.filter(property => {
        return property.owner_name.toLowerCase().includes(userFullName.toLowerCase());
    });

    const indexOfLastProperty = currentPage * itemsPerPage;
    const indexOfFirstProperty = indexOfLastProperty - itemsPerPage;
    const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <div style={{ backgroundImage: `url(${bgi})`, backgroundColor: 'white', width: '100vw', minHeight: '100vh', marginLeft: '-590px', alignItems: 'center', paddingTop: '150px', marginBottom:'-50px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
                <h1>Property Listings</h1>
                <p>View your own property listings!</p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                {currentProperties.map((property) => (
                    <Card key={property.id} sx={{ flex: '0 0 calc(33.33% - 20px)', margin: '10px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', height: '100%' }}>
                        <CardHeader
                            title={<Typography variant="h6">{property.title}</Typography>}
                            subheader={<Typography variant="subtitle1">₹{(property.price * 75).toLocaleString()}</Typography>}
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
            <Pagination count={Math.ceil(filteredProperties.length / itemsPerPage)} page={currentPage} onChange={handlePageChange} style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }} />
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
