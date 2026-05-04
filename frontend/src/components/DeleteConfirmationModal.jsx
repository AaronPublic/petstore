import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const DeleteConfirmationModal = ({ open, onClose, onConfirm, petName }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to remove <strong>{petName}</strong> from your inventory? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={onConfirm} color="error" variant="contained" autoFocus>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
