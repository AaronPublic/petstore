import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, CircularProgress, TextField, InputAdornment, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import petService from '../services/petService';
import PetCard from '../components/PetCard';
import FilterBar from '../components/FilterBar';
import PetFormModal from '../components/PetFormModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

const PetGallery = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

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

  const handleSave = async (petData) => {
    if (editingPet) await petService.updatePet(editingPet.id, petData);
    else await petService.createPet(petData);
    setModalOpen(false);
    setEditingPet(null);
    fetchPets();
  };

  const handleDelete = async () => {
    await petService.deletePet(deleteId);
    setDeleteId(null);
    fetchPets();
  };

  const filteredPets = pets.filter(pet => 
    pet.name.toLowerCase().includes(search.toLowerCase()) || 
    pet.breed.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box className="bg-gray-50 min-h-screen">
      <Container maxWidth="xl" className="py-12">
        <Box className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <Box>
            <Typography variant="h2" component="h1" className="font-extrabold text-gray-900 tracking-tight">
              Our Little Friends
            </Typography>
            <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={() => setModalOpen(true)} className="mt-4 rounded-xl py-2 px-6">
              Add New Pet
            </Button>
          </Box>
          <TextField
            variant="outlined"
            placeholder="Search by name or breed..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 bg-white"
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
            }}
          />
        </Box>

        <FilterBar activeCategory={category} onCategoryChange={setCategory} />

        {loading ? (
          <Box className="flex justify-center my-32">
            <CircularProgress size={60} thickness={4} />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {filteredPets.length > 0 ? (
              filteredPets.map((pet) => (
                <Grid item key={pet.id} xs={12} sm={6} lg={4}>
                  <PetCard pet={pet} onEdit={(p) => { setEditingPet(p); setModalOpen(true); }} onDelete={(id) => setDeleteId(id)} />
                </Grid>
              ))
            ) : (
              <Box className="w-full text-center my-20">
                <Typography variant="h5" className="text-gray-400 font-medium">
                  No pets found.
                </Typography>
              </Box>
            )}
          </Grid>
        )}
      </Container>
      <PetFormModal open={modalOpen} onClose={() => { setModalOpen(false); setEditingPet(null); }} onSave={handleSave} initialData={editingPet} />
      <DeleteConfirmationModal 
        open={!!deleteId} 
        onClose={() => setDeleteId(null)} 
        onConfirm={handleDelete} 
        petName={pets.find(p => p.id === deleteId)?.name || 'this pet'} 
      />
    </Box>
  );
};

export default PetGallery;
