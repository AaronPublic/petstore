import { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useCart } from '../context/CartContext';

const Tracking = () => {
  const { orders } = useCart();
  const [email, setEmail] = useState('');
  const [filteredOrders, setFilteredOrders] = useState(null);

  const handleTrack = () => {
    setFilteredOrders(orders.filter(o => o.email.toLowerCase() === email.toLowerCase()));
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>Track Your Order</Typography>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="body1" sx={{ mb: 2 }}>Enter your email address to see your order history:</Typography>
        <TextField 
          fullWidth 
          label="Email Address" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          sx={{ mb: 2 }} 
        />
        <Button variant="contained" fullWidth size="large" onClick={handleTrack}>Track Orders</Button>
      </Paper>

      {filteredOrders && (
        <Box sx={{ mt: 4 }}>
          {filteredOrders.length > 0 ? (
            <List>
              {filteredOrders.map(order => (
                <Paper key={order.id} sx={{ p: 2, mb: 2 }}>
                  <Typography variant="h6">Order {order.id}</Typography>
                  <Typography>Status: {order.status}</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2">Items: {order.items.join(', ')}</Typography>
                </Paper>
              ))}
            </List>
          ) : (
            <Typography sx={{ mt: 2, textAlign: 'center' }}>No orders found for this email.</Typography>
          )}
        </Box>
      )}
    </Container>
  );
};

export default Tracking;
