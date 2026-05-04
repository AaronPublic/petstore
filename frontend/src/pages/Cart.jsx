import { useState } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton, Button, Paper, Stack, Snackbar, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import CheckoutModal from '../components/CheckoutModal';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, placeOrder } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

  const handleCheckout = (details) => {
    placeOrder(details, cartItems);
    clearCart();
    setSuccess(true);
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>Your Cart</Typography>
      
      {cartItems.length === 0 ? (
        <Paper sx={{ p: 5, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>Your cart is empty.</Typography>
          <Button component={Link} to="/" variant="contained">Continue Shopping</Button>
        </Paper>
      ) : (
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <List>
            {cartItems.map((item, index) => (
              <ListItem key={index} divider>
                <ListItemAvatar>
                  <Avatar src={item.imageUrl} variant="rounded" sx={{ width: 60, height: 60, mr: 2 }} />
                </ListItemAvatar>
                <ListItemText 
                  primary={item.name} 
                  secondary={`$${item.price?.toFixed(2)}`} 
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
                <IconButton color="error" onClick={() => removeFromCart(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
          
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>Total: ${total.toFixed(2)}</Typography>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" color="error" onClick={clearCart}>Clear Cart</Button>
              <Button variant="contained" size="large" onClick={() => setCheckoutOpen(true)}>Checkout</Button>
            </Stack>
          </Box>
        </Paper>
      )}

      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} onConfirm={handleCheckout} />
      
      <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
        <Alert severity="success" sx={{ width: '100%' }}>Order placed successfully!</Alert>
      </Snackbar>
    </Container>
  );
};

export default Cart;
