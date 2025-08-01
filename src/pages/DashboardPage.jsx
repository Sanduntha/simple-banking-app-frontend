import React, { useEffect, useState } from 'react';
import { Typography, Container, Box, Button } from '@mui/material';
import Swal from 'sweetalert2';
import TopUpForm from '../components/TopUpForm';
import PayBillForm from '../components/PayBillForm';
import TransferForm from '../components/TransferForm';
import TransactionHistory from '../components/TransactionHistory';
import api from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom'; // for navigation

export default function DashboardPage() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  const fetchTransactions = async () => {
    try {
      const res = await api.get('/transactions/history');
      setTransactions(res.data);
    } catch {
      alert('Failed to fetch transactions');
    }
  };

  const fetchUserBalance = async () => {
    try {
      const res = await api.get('/user/profile'); // or /user/balance
      setBalance(res.data.balance);
    } catch {
      alert('Failed to fetch user balance');
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchUserBalance();
  }, []);

  const handleActionComplete = () => {
    fetchTransactions();
    fetchUserBalance();
  };

  useEffect(() => {
    if (balance <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Low balance',
        text: 'Your balance is zero or too low. Please recharge to continue using services.',
        confirmButtonText: 'OK',
      });
    }
  }, [balance]);

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Logout',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        navigate('/'); // Redirect to login page
      }
    });
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Dashboard</Typography>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <Typography variant="h6" color={balance <= 0 ? 'error' : 'primary'}>
        Current Balance: LKR{balance.toFixed(2)}
      </Typography>

      <Box mt={2}>
        <TopUpForm onAction={handleActionComplete} />
      </Box>
      <Box mt={2}>
        <PayBillForm onAction={handleActionComplete} balance={balance} />
      </Box>
      <Box mt={2}>
        <TransferForm onAction={handleActionComplete} balance={balance} />
      </Box>
      <Box mt={2}>
        <TransactionHistory transactions={transactions} />
      </Box>
    </Container>
  );
}
