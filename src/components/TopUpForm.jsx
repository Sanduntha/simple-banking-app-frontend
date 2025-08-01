import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import api from '../api/axiosInstance';
import Swal from 'sweetalert2';

export default function TopUpForm({ onAction }) {
  const [amount, setAmount] = useState('');

const handleTopUp = async () => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      Swal.fire('Invalid Amount', 'Please enter a valid amount greater than zero.', 'warning');
      return;
    }

    try {
      await api.post('/transactions/topup', { amount: amt });
      Swal.fire('Success', 'Top-up successful!', 'success');
      setAmount('');
      onAction();
    } catch {
      Swal.fire('Failed', 'Top-up failed. Please try again.', 'error');
    }
  };

  return (
    <Box>
      <Typography variant="h6">Top-Up</Typography>
      <TextField label="Amount" value={amount} onChange={e => setAmount(e.target.value)} fullWidth />
      <Button variant="contained" onClick={handleTopUp} fullWidth sx={{ mt: 1 }}>Top-Up</Button>
    </Box>
  );
}
