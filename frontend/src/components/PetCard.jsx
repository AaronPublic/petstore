import { Card, CardContent, CardMedia, Typography, Button, CardActions, Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../context/CartContext';

const PetCard = ({ pet, onEdit, onDelete }) => {
  const { addToCart } = useCart();

  return (
    <Card sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      borderRadius: 4,
      transition: '0.3s',
      '&:hover': { boxShadow: 6 }
    }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="240"
          image={pet.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'}
          alt={pet.name}
          sx={{ objectFit: 'cover' }}
        />
        <Box sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'background.paper', borderRadius: 2 }}>
          <IconButton onClick={() => onEdit(pet)} color="primary" size="small"><EditIcon /></IconButton>
          <IconButton onClick={() => onDelete(pet.id)} color="error" size="small"><DeleteIcon /></IconButton>
        </Box>
      </Box>
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {pet.name}
          </Typography>
          <Typography variant="caption" sx={{ bgcolor: 'action.hover', px: 1.5, py: 0.5, borderRadius: 1 }}>
            {pet.category}
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {pet.breed} • {pet.age} years old
        </Typography>
        <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
          ${pet.price?.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 3, pt: 0, gap: 1 }}>
        <Button 
          component={Link} 
          to={`/pets/${pet.id}`} 
          variant="outlined" 
          fullWidth
          sx={{ borderRadius: 2, py: 1 }}
        >
          Details
        </Button>
        <Button 
          variant="contained" 
          startIcon={<ShoppingCartIcon />}
          onClick={() => addToCart(pet)}
          fullWidth
          sx={{ borderRadius: 2, py: 1 }}
        >
          Add
        </Button>
      </CardActions>
    </Card>
  );
};

export default PetCard;
