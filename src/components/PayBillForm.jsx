import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, Typography, Box } from '@mui/material';
import Swal from 'sweetalert2';
import api from '../api/axiosInstance';

export default function PayBillForm({ onAction, balance }) {
  const [amount, setAmount] = useState('');
  const [biller, setBiller] = useState('Electricity');

  const handlePayBill = async () => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      Swal.fire('Invalid Amount', 'Please enter a valid amount greater than zero.', 'warning');
      return;
    }

    // Calculate extra charge for Electricity and Water
    let charge = 0;
    if (biller === 'Electricity') {
      charge = amt * 0.10;
    } else if (biller === 'Water') {
      charge = amt * 0.05;
    }
    const total = amt + charge;

    if (balance < total) {
      Swal.fire('Insufficient Balance', `You need $${total.toFixed(2)} to pay this bill including charges. Please recharge.`, 'error');
      return;
    }

    try {
      await api.post('/transactions/paybill', { biller, amount: amt });
      Swal.fire('Success', 'Bill payment successful!', 'success');
      setAmount('');
      onAction();
    } catch {
      Swal.fire('Failed', 'Payment failed. Please try again.', 'error');
    }
  };

  return (
    <Box>
      <Typography variant="h6">Pay Bill</Typography>
      <Select value={biller} onChange={e => setBiller(e.target.value)} fullWidth>
        <MenuItem value="Electricity">Electricity</MenuItem>
        <MenuItem value="Water">Water</MenuItem>
        <MenuItem value="Internet">Internet</MenuItem>
      </Select>
      <TextField
        label="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        fullWidth
        sx={{ mt: 1 }}
      />
      <Button variant="contained" onClick={handlePayBill} fullWidth sx={{ mt: 1 }}>
        Pay Bill
      </Button>
    </Box>
  );
}
