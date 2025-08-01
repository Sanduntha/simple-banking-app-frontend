import React, { useEffect, useState } from 'react';
import {
  Typography,
  Container,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Chip,
  Alert,
} from '@mui/material';
import Swal from 'sweetalert2';
import TopUpForm from '../components/TopUpForm';
import PayBillForm from '../components/PayBillForm';
import TransferForm from '../components/TransferForm';
import TransactionHistory from '../components/TransactionHistory';
import api from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddCardIcon from '@mui/icons-material/AddCard';
import PaymentIcon from '@mui/icons-material/Payment';
import SendIcon from '@mui/icons-material/Send';

export default function DashboardPage() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [username, setUsername] = useState('');
  const [openTopUp, setOpenTopUp] = useState(false);
  const [openPayBill, setOpenPayBill] = useState(false);
  const [openTransfer, setOpenTransfer] = useState(false);
  const navigate = useNavigate();

  const fetchTransactions = async () => {
    try {
      const res = await api.get('/transactions/history');
      setTransactions(res.data);
    } catch {
      Swal.fire('Error', 'Failed to fetch transactions', 'error');
    }
  };
const fetchUserProfile = async () => {
  try {
    const res = await api.get('/user/profile');
    console.log('Fetched profile:', res.data);
    setBalance(res.data.balance);
    setUsername(res.data.username);
  } catch {
    Swal.fire('Error', 'Failed to fetch user profile', 'error');
  }
};

  useEffect(() => {
    fetchTransactions();
    fetchUserProfile();
  }, []);

  const handleActionComplete = () => {
    fetchTransactions();
    fetchUserProfile();
  };

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
        navigate('/');
      }
    });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        background:
          'linear-gradient(135deg, rgba(46,191,145,0.15) 0%, rgba(17,88,82,0.1) 100%)',
        py: 5,
      }}
    >
      <Container maxWidth="md">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
          px={2}
        >
          <Box display="flex" alignItems="center" gap={1.5}>
            <Avatar sx={{ bgcolor: '#2ebf91', width: 56, height: 56 }}>
              <AccountCircleIcon fontSize="large" />
            </Avatar>
            <Typography variant="h5" fontWeight="bold" color="text.primary">
              Hello, {username || 'User'}
            </Typography>
          </Box>
          <Button
            variant="outlined"
            color="error"
            onClick={handleLogout}
            sx={{
              fontWeight: 'bold',
              borderWidth: 2,
              '&:hover': { borderWidth: 2 },
            }}
          >
            Logout
          </Button>
        </Box>

        <Card
          elevation={6}
          sx={{
            borderRadius: 3,
            mb: 4,
            px: 3,
            py: 2,
            bgcolor: 'background.paper',
            boxShadow:
              '0 4px 10px rgb(46 191 145 / 0.2), 0 1px 3px rgb(0 0 0 / 0.1)',
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={2}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <AccountBalanceWalletIcon sx={{ fontSize: 36, color: '#2ebf91' }} />
              <Typography
                variant="h6"
                color={balance <= 0 ? 'error' : 'primary'}
                sx={{ fontWeight: 'bold' }}
              >
                Current Balance:{' '}
                <Chip
                  label={`LKR ${balance.toFixed(2)}`}
                  color={balance <= 0 ? 'error' : 'success'}
                  sx={{ fontWeight: 'bold', fontSize: 18, ml: 1, py: 0.5 }}
                />
              </Typography>
            </Box>

            <Grid container spacing={2} sx={{ maxWidth: 480 }}>
              <Grid item xs={12} sm={4}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    bgcolor: '#2ebf91',
                    fontWeight: 'bold',
                    py: 1.5,
                    '&:hover': { bgcolor: '#28a37a' },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                  }}
                  onClick={() => setOpenTopUp(true)}
                >
                  <AddCardIcon />
                  Top-Up
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    bgcolor: '#2ebf91',
                    fontWeight: 'bold',
                    py: 1.5,
                    '&:hover': { bgcolor: '#28a37a' },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                  }}
                  onClick={() => setOpenPayBill(true)}
                >
                  <PaymentIcon />
                  Pay Bill
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    bgcolor: '#2ebf91',
                    fontWeight: 'bold',
                    py: 1.5,
                    '&:hover': { bgcolor: '#28a37a' },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                  }}
                  onClick={() => setOpenTransfer(true)}
                >
                  <SendIcon />
                  Transfer
                </Button>
              </Grid>
            </Grid>
          </Box>

          {balance < 10 && (
            <Alert
              severity="warning"
              sx={{
                mt: 3,
                fontWeight: 'bold',
                borderRadius: 2,
                bgcolor: '#fffbe6',
              }}
            >
              Your balance is low (LKR {balance.toFixed(2)}). Please top-up to continue using services.
            </Alert>
          )}
        </Card>

        <Card
          elevation={6}
          sx={{
            borderRadius: 3,
            bgcolor: 'background.paper',
            boxShadow:
              '0 4px 10px rgb(0 0 0 / 0.1), 0 1px 3px rgb(0 0 0 / 0.05)',
          }}
        >
          <CardContent sx={{ maxHeight: '400px', overflowY: 'auto' }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Transaction History
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <TransactionHistory transactions={transactions} />
          </CardContent>
        </Card>

        <Dialog open={openTopUp} onClose={() => setOpenTopUp(false)} fullWidth maxWidth="sm">
          <DialogTitle>Top-Up Balance</DialogTitle>
          <DialogContent dividers>
            <TopUpForm onAction={() => { handleActionComplete(); setOpenTopUp(false); }} />
          </DialogContent>
        </Dialog>

        <Dialog open={openPayBill} onClose={() => setOpenPayBill(false)} fullWidth maxWidth="sm">
          <DialogTitle>Pay a Bill</DialogTitle>
          <DialogContent dividers>
            <PayBillForm balance={balance} onAction={() => { handleActionComplete(); setOpenPayBill(false); }} />
          </DialogContent>
        </Dialog>

        <Dialog open={openTransfer} onClose={() => setOpenTransfer(false)} fullWidth maxWidth="sm">
          <DialogTitle>Transfer Funds</DialogTitle>
          <DialogContent dividers>
            <TransferForm balance={balance} onAction={() => { handleActionComplete(); setOpenTransfer(false); }} />
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
}
