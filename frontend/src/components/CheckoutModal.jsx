import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Stack } from '@mui/material';

const CheckoutModal = ({ open, onClose, onConfirm }) => {
  const [formData, setFormData] = useState({ fullName: '', email: '', address: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onConfirm(formData);
    onClose();
    setFormData({ fullName: '', email: '', address: '' });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Complete Your Purchase</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField name="fullName" label="Full Name" fullWidth value={formData.fullName} onChange={handleChange} />
          <TextField name="email" label="Email Address" type="email" fullWidth value={formData.email} onChange={handleChange} />
          <TextField name="address" label="Shipping Address" fullWidth multiline rows={3} value={formData.address} onChange={handleChange} />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" size="large">Place Order</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CheckoutModal;
