import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import Swal from 'sweetalert2';
import api from '../api/axiosInstance';

export default function TransferForm({ onAction, balance }) {
  const [targetEmail, setTargetEmail] = useState('');
  const [amount, setAmount] = useState('');

  const handleTransfer = async () => {
    const amt = parseFloat(amount);
    if (!targetEmail) {
      Swal.fire('Missing Target Email', 'Please enter the target email.', 'warning');
      return;
    }
    if (isNaN(amt) || amt <= 0) {
      Swal.fire('Invalid Amount', 'Please enter a valid amount greater than zero.', 'warning');
      return;
    }
    if (balance < amt) {
      Swal.fire('Insufficient Balance', 'You do not have enough balance to make this transfer. Please recharge.', 'error');
      return;
    }

    try {
      await api.post('/transactions/transfer', { targetEmail, amount: amt });
      Swal.fire('Success', 'Transfer successful!', 'success');
      setTargetEmail('');
      setAmount('');
      onAction();
    } catch {
      Swal.fire('Failed', 'Transfer failed. Please try again.', 'error');
    }
  };

  return (
    <Box>
      <Typography variant="h6">Transfer Funds</Typography>
      <TextField
        label="Target Email"
        value={targetEmail}
        onChange={e => setTargetEmail(e.target.value)}
        fullWidth
      />
      <TextField
        label="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        fullWidth
        sx={{ mt: 1 }}
      />
      <Button variant="contained" onClick={handleTransfer} fullWidth sx={{ mt: 1 }}>
        Transfer
      </Button>
    </Box>
  );
}
