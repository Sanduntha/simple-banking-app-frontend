import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import api from '../api/axiosInstance';

export default function TopUpForm({ onAction }) {
  const [amount, setAmount] = useState('');

  const handleTopUp = async () => {
    try {
      await api.post('/transactions/topup', { amount });
      alert('Top-up successful');
      setAmount('');
      onAction();
    } catch {
      alert('Top-up failed');
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
