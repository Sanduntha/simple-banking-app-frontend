import React, { useState } from 'react'; 
import { TextField, Button, Typography, Box } from '@mui/material';
import Swal from 'sweetalert2';
import api from '../api/axiosInstance';

export default function TransferForm({ balance, onAction }) {
  const [amount, setAmount] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');

  const handleTransfer = async () => {
    const amt = parseFloat(amount);

    if (!recipientEmail.trim()) {
      Swal.fire('Invalid Recipient', 'Please enter recipient email.', 'warning');
      return;
    }

    if (isNaN(amt) || amt <= 0) {
      Swal.fire('Invalid Amount', 'Please enter a valid amount greater than zero.', 'warning');
      return;
    }

    if (balance < amt) {
      Swal.fire(
        'Insufficient Balance',
        `Your balance is only LKR ${balance.toFixed(2)}. Please enter a smaller amount or top-up.`,
        'error'
      );
      return;
    }

    try {
      const res = await api.post('/transactions/transfer', {
         targetEmail: recipientEmail.trim(),
        amount: amt,
      });

      const { newBalance } = res.data;

      Swal.fire('Success', `Transfer completed! New Balance: LKR ${newBalance.toFixed(2)}`, 'success');

      setAmount('');
      setRecipientEmail('');
      onAction(); 
    } catch (error) {
      console.error('Transfer failed:', error);

      if (error.response) {
        console.error('Error response:', error.response);

        if (error.response.status === 404) {
          Swal.fire('Recipient Not Found', 'The recipient email does not exist.', 'error');
        } else if (error.response.status === 400) {
          Swal.fire('Bad Request', error.response.data.message || 'Invalid transfer data.', 'error');
        } else {
          Swal.fire('Failed', 'Transfer failed. Please try again.', 'error');
        }
      } else {
        Swal.fire('Failed', 'Network error or server not responding.', 'error');
      }
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Transfer Funds</Typography>
      <TextField
        label="Recipient Email"
        value={recipientEmail}
        onChange={(e) => setRecipientEmail(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button variant="contained" fullWidth onClick={handleTransfer}>
        Transfer
      </Button>
    </Box>
  );
}
