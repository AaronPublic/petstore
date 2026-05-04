import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

const PetCard = ({ pet }) => {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      <CardMedia
        component="img"
        height="200"
        image={pet.imageUrl || 'https://via.placeholder.com/300?text=No+Image'}
        alt={pet.name}
        className="h-48 object-cover"
      />
      <CardContent className="flex-grow">
        <Typography gutterBottom variant="h5" component="div" className="font-bold text-gray-800">
          {pet.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="mb-2">
          {pet.breed} • {pet.age} years old
        </Typography>
        <Typography variant="h6" color="primary" className="font-bold">
          ${pet.price}
        </Typography>
      </CardContent>
      <CardActions className="p-4 pt-0">
        <Button 
          component={Link} 
          to={`/pets/${pet.id}`} 
          size="small" 
          variant="contained" 
          fullWidth
          className="bg-blue-600 hover:bg-blue-700"
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default PetCard;
