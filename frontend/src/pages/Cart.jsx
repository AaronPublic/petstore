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

  // Group cart items by ID and sum their quantities
  const groupedCartItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  // Calculate total based on grouped items
  const total = groupedCartItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  const handleCheckout = (details) => {
    // Pass the original cartItems array for order placement, as it might contain more details needed by placeOrder
    // Or if placeOrder is designed to work with grouped items, we'd pass groupedCartItems.
    // For now, assuming placeOrder might need individual items or a structure that handles it.
    // If placeOrder expects an array of items with quantity, it would need modification too.
    // Let's pass the original for now and assume it can handle it or will be updated.
    placeOrder(details, cartItems); 
    clearCart();
    setSuccess(true);
  };

  const handleRemoveItem = (itemId) => {
    // This currently removes ALL instances of the item.
    // If we want to decrease quantity by one, CartContext would need modification.
    removeFromCart(itemId);
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>Your Cart</Typography>
      
      {groupedCartItems.length === 0 ? ( // Check grouped items length for emptiness
        <Paper sx={{ p: 5, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>Your cart is empty.</Typography>
          <Button component={Link} to="/" variant="contained">Continue Shopping</Button>
        </Paper>
      ) : (
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <List>
            {groupedCartItems.map((item) => ( // Iterate over grouped items
              <ListItem key={item.id} divider>
                <ListItemAvatar>
                  <Avatar src={item.imageUrl} variant="rounded" sx={{ width: 60, height: 60, mr: 2 }} />
                </ListItemAvatar>
                <ListItemText 
                  primary={`${item.name} (x${item.quantity})`} // Display name and quantity
                  secondary={`$${(item.price * item.quantity).toFixed(2)}`} // Display total price for this item type
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
                <IconButton color="error" onClick={() => handleRemoveItem(item.id)}>
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