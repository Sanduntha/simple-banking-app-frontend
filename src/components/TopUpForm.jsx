import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import api from '../api/axiosInstance';
import Swal from 'sweetalert2';

export default function TopUpForm({ onAction }) {
  const [amount, setAmount] = useState('');

const handleTopUp = async () => {
  const amt = parseFloat(amount);

  if (isNaN(amt) || amt <= 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Invalid Amount',
      text: 'Please enter a valid amount greater than zero.',
    });
    return;
  }

  try {
    await api.post('/transactions/topup', { amount: amt });
    Swal.fire({
      icon: 'success',
      title: 'Top-up Successful!',
      text: `Your balance has been increased by $${amt.toFixed(2)}.`,
      timer: 1500,
      showConfirmButton: false,
    });
    setAmount('');
    onAction();
  } catch {
    Swal.fire({
      icon: 'error',
      title: 'Top-up Failed',
      text: 'Something went wrong. Please try again.',
    });
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
