import { useState, useEffect, useCallback } from 'react';
import { Grid, Typography, Box, CircularProgress, TextField, InputAdornment, Button, Stack, Container, Paper } from '@mui/material';
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

  const fetchPets = useCallback(async () => {
    setLoading(true);
    try {
      const data = await petService.getAllPets(category);
      setPets(data);
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchPets();
  }, [fetchPets]);

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
    <Box sx={{ pb: 10 }}>
      <Paper elevation={0} sx={{ py: 8, mb: 6, bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider', borderRadius: 0 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 1, letterSpacing: -1 }}>Find your new best friend.</Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>Discover our curated selection of pets waiting for their forever homes.</Typography>
          <Button variant="contained" size="large" color="primary" startIcon={<AddIcon />} onClick={() => setModalOpen(true)} sx={{ px: 4, py: 1.5, borderRadius: 2 }}>
            Add New Pet
          </Button>
        </Container>
      </Paper>

      <Container maxWidth="lg">
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', md: 'center' }} spacing={3} sx={{ mb: 4 }}>
          <Box sx={{ flexGrow: 1 }}>
            <FilterBar activeCategory={category} onCategoryChange={setCategory} />
          </Box>
          <TextField
            variant="outlined"
            placeholder="Search pets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: { xs: '100%', md: 300 }, bgcolor: 'background.paper' }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
            }}
          />
        </Stack>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
            <CircularProgress size={50} />
          </Box>
        ) : (
          <Grid container spacing={4} direction="row" alignItems="flex-start" justifyContent="flex-start">
            {filteredPets.length > 0 ? (
              filteredPets.map((pet) => (
                <Grid item key={pet.id} xs={12} sm={6} md={4}>
                  <PetCard pet={pet} onEdit={(p) => { setEditingPet(p); setModalOpen(true); }} onDelete={(id) => setDeleteId(id)} />
                </Grid>
              ))
            ) : (
              <Typography variant="h6" sx={{ width: '100%', textAlign: 'center', py: 10, color: 'text.secondary' }}>
                No pets found matching your criteria.
              </Typography>
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
