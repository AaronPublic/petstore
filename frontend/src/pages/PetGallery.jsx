import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, CircularProgress } from '@mui/material';
import petService from '../services/petService';
import PetCard from '../components/PetCard';
import FilterBar from '../components/FilterBar';

const PetGallery = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    fetchPets();
  }, [category]);

  const fetchPets = async () => {
    setLoading(true);
    try {
      const data = await petService.getAllPets(category);
      setPets(data);
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" className="py-12">
      <Box className="text-center mb-12">
        <Typography variant="h2" component="h1" className="font-bold text-blue-900 mb-4">
          PetStore
        </Typography>
        <Typography variant="h5" className="text-gray-600">
          Find your new best friend today!
        </Typography>
      </Box>

      <FilterBar activeCategory={category} onCategoryChange={setCategory} />

      {loading ? (
        <Box className="flex justify-center my-20">
          <CircularProgress size={60} />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {pets.length > 0 ? (
            pets.map((pet) => (
              <Grid item key={pet.id} xs={12} sm={6} md={4}>
                <PetCard pet={pet} />
              </Grid>
            ))
          ) : (
            <Box className="w-full text-center my-20">
              <Typography variant="h6" className="text-gray-500">
                No pets found in this category.
              </Typography>
            </Box>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default PetGallery;
