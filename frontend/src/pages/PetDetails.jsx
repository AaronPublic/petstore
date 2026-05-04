import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Box, Button, Grid, Chip, Divider, CircularProgress, Snackbar, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import petService from '../services/petService';
import { useCart } from '../context/CartContext';

const PetDetails = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const data = await petService.getPetById(id);
        setPet(data);
      } catch (error) {
        console.error('Error fetching pet details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(pet);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!pet) {
    return (
      <Container sx={{ textAlign: 'center', py: 20 }}>
        <Typography variant="h5" color="error">Pet not found</Typography>
        <Button component={Link} to="/" sx={{ mt: 4 }}>Back to Gallery</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Button 
        component={Link} 
        to="/" 
        startIcon={<ArrowBackIcon />} 
        sx={{ mb: 4, color: 'primary.main', fontSize: '0.9rem' }}
      >
        Back to Gallery
      </Button>

      <Grid container spacing={4} alignItems="flex-start">
        {/* Left Column: Image */}
        <Grid item xs={12} md={5}>
          <Box sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: 2, bgcolor: 'grey.100', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
              src={pet.imageUrl || 'https://via.placeholder.com/800x600?text=No+Image'} 
              alt={pet.name} 
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </Box>
        </Grid>

        {/* Right Column: Info */}
        <Grid item xs={12} md={7}>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ mb: 3 }}>
              <Chip label={pet.category} color="primary" size="small" sx={{ mb: 1.5, fontWeight: 700 }} />
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                {pet.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2, fontStyle: 'italic' }}>
                {pet.breed}
              </Typography>
              <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
                ${pet.price?.toFixed(2)}
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>Details</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography color="text.secondary" variant="caption">Age</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{pet.age} years</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography color="text.secondary" variant="caption">Category</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{pet.category}</Typography>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ mb: 4, flexGrow: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Description</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                {pet.description || 'No description provided.'}
              </Typography>
            </Box>

            <Button 
              variant="contained" 
              onClick={handleAddToCart}
              sx={{ py: 1.5, fontWeight: 700, borderRadius: 2, boxShadow: 'none' }}
              fullWidth
            >
              Add to Cart
            </Button>
          </Box>
        </Grid>
      </Grid>
      
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {pet.name} added to cart!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PetDetails;
