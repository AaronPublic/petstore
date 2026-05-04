import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Box, Button, Grid, Chip, Divider, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import petService from '../services/petService';

const PetDetails = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <Box className="flex justify-center items-center min-h-screen">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!pet) {
    return (
      <Container className="text-center py-20">
        <Typography variant="h5" color="error">Pet not found</Typography>
        <Button component={Link} to="/" className="mt-4">Back to Gallery</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className="py-12">
      <Button 
        component={Link} 
        to="/" 
        startIcon={<ArrowBackIcon />} 
        className="mb-8 text-blue-600"
      >
        Back to Gallery
      </Button>

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Box className="rounded-xl overflow-hidden shadow-2xl">
            <img 
              src={pet.imageUrl || 'https://via.placeholder.com/600x400?text=No+Image'} 
              alt={pet.name} 
              className="w-full h-auto object-cover"
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box className="flex flex-col h-full">
            <Box className="mb-6">
              <Chip label={pet.category} color="primary" className="mb-4" />
              <Typography variant="h2" className="font-bold text-gray-900 mb-2">
                {pet.name}
              </Typography>
              <Typography variant="h5" color="textSecondary" className="mb-4 italic">
                {pet.breed}
              </Typography>
              <Typography variant="h3" color="primary" className="font-bold">
                ${pet.price}
              </Typography>
            </Box>

            <Divider className="mb-6" />

            <Box className="mb-8">
              <Typography variant="h6" className="font-semibold mb-2">Details</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography color="textSecondary">Age</Typography>
                  <Typography variant="body1" className="font-medium">{pet.age} years</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography color="textSecondary">Category</Typography>
                  <Typography variant="body1" className="font-medium">{pet.category}</Typography>
                </Grid>
              </Grid>
            </Box>

            <Box className="mb-8 flex-grow">
              <Typography variant="h6" className="font-semibold mb-2">Description</Typography>
              <Typography variant="body1" className="text-gray-700 leading-relaxed">
                {pet.description || 'No description provided.'}
              </Typography>
            </Box>

            <Button 
              variant="contained" 
              size="large" 
              className="bg-green-600 hover:bg-green-700 py-4 text-xl font-bold rounded-lg shadow-lg"
              fullWidth
            >
              Adopt {pet.name}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PetDetails;
