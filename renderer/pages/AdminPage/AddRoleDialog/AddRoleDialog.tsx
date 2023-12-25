import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import React from 'react';
interface AddRoleDiloagProps {
  open: boolean;
  onClose: VoidFunction;
}
export default function AddRoleDialog({ onClose, open }: AddRoleDiloagProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={'lg'}>
      <DialogTitle>Добавить роль</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}
