import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, MenuItem } from '@mui/material';

const PetFormModal = ({ open, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({ name: '', category: 'DOG', breed: '', age: '', price: '', imageUrl: '', description: '' });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ name: '', category: 'DOG', breed: '', age: '', price: '', imageUrl: '', description: '' });
    }
  }, [initialData, open]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialData ? 'Edit Pet' : 'Add New Pet'}</DialogTitle>
      <DialogContent>
        <TextField name="name" label="Name" fullWidth margin="dense" value={formData.name} onChange={handleChange} />
        <TextField name="category" label="Category" select fullWidth margin="dense" value={formData.category} onChange={handleChange}>
          {['DOG', 'CAT', 'BIRD', 'FISH'].map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
        </TextField>
        <TextField name="breed" label="Breed" fullWidth margin="dense" value={formData.breed} onChange={handleChange} />
        <TextField name="age" label="Age" type="number" fullWidth margin="dense" value={formData.age} onChange={handleChange} />
        <TextField name="price" label="Price" type="number" fullWidth margin="dense" value={formData.price} onChange={handleChange} />
        <TextField name="imageUrl" label="Image URL" fullWidth margin="dense" value={formData.imageUrl} onChange={handleChange} />
        <TextField name="description" label="Description" fullWidth margin="dense" multiline rows={3} value={formData.description} onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onSave(formData)} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PetFormModal;
