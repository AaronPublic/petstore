import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions, Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const PetCard = ({ pet, onEdit, onDelete }) => {
  return (
    <Card className="h-full flex flex-col hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 rounded-2xl overflow-hidden relative">
      <Box className="absolute top-2 right-2 z-10 bg-white/80 rounded-lg shadow-sm">
        <IconButton onClick={() => onEdit(pet)} color="primary"><EditIcon /></IconButton>
        <IconButton onClick={() => onDelete(pet.id)} color="error"><DeleteIcon /></IconButton>
      </Box>
      <CardMedia
        component="img"
        height="240"
        image={pet.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'}
        alt={pet.name}
        className="h-60 object-cover"
      />
      <CardContent className="flex-grow p-5">
        <Box className="flex justify-between items-start mb-2">
          <Typography variant="h5" className="font-bold text-gray-900 tracking-tight">
            {pet.name}
          </Typography>
          <Typography variant="body2" className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
            {pet.category}
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary" className="mb-4">
          {pet.breed} • {pet.age} years old
        </Typography>
        <Typography variant="h5" color="primary" className="font-extrabold text-2xl">
          ${pet.price?.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions className="p-5 pt-0">
        <Button 
          component={Link} 
          to={`/pets/${pet.id}`} 
          variant="contained" 
          fullWidth
          className="bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-bold shadow-md shadow-blue-200"
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default PetCard;
