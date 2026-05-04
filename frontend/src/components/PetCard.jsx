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
    flexDirection: 'row', 
    height: 200,
    borderRadius: 3,
    border: '1px solid',
    borderColor: 'divider',
    boxShadow: 'none',
    transition: '0.3s',
    '&:hover': { boxShadow: 4, borderColor: 'primary.main' }
    }}>
    <Box sx={{ position: 'relative', width: 200, flexShrink: 0, overflow: 'hidden' }}>
      <CardMedia
        component="img"
        image={pet.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'}
        alt={pet.name}
        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 0.5 }}>
        <IconButton onClick={() => onEdit(pet)} sx={{ bgcolor: 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: 'white' } }} size="small"><EditIcon /></IconButton>
        <IconButton onClick={() => onDelete(pet.id)} sx={{ bgcolor: 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: 'white' } }} color="error" size="small"><DeleteIcon /></IconButton>
      </Box>
    </Box>
    <CardContent sx={{ flexGrow: 1, p: 2.5, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>
        {pet.category}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
        {pet.name}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {pet.breed} • {pet.age} yrs
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ 
        display: '-webkit-box', 
        WebkitLineClamp: 2, 
        WebkitBoxOrient: 'vertical', 
        overflow: 'hidden' 
      }}>
        {pet.description || 'No description available.'}
      </Typography>
      <Typography variant="h5" color="primary" sx={{ fontWeight: 800, mt: 1 }}>
        ${pet.price?.toFixed(2)}
      </Typography>
    </CardContent>
    <CardActions sx={{ p: 2.5, justifyContent: 'center', width: 180 }}>
      <Button 
        variant="contained" 
        onClick={() => addToCart(pet)} 
        fullWidth 
        size="medium"
        sx={{ borderRadius: 2, fontWeight: 600, boxShadow: 'none' }}
      >
        Add to Cart
      </Button>
    </CardActions>
    </Card>  );
};

export default PetCard;
