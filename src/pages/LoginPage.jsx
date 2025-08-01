import React, { useState } from 'react';
import {
  TextField,
  Button,
  Stack,
  Container,
  Typography,
  Paper,
  Box,
  Avatar,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Swal from 'sweetalert2';
import api from '../api/axiosInstance';
import { saveToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      saveToken(res.data);
      Swal.fire({
        icon: 'success',
        title: 'Login successful!',
        timer: 1500,
        showConfirmButton: false,
      });
      navigate('/dashboard');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login failed',
        text: 'Invalid email or password. Please try again.',
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={10}
          sx={{
            p: 4,
            borderRadius: 3,
            textAlign: 'center',
          }}
        >
          <Avatar sx={{ bgcolor: '#2ebf91', width: 56, height: 56, margin: '0 auto' }}>
            <LockOutlinedIcon fontSize="large" />
          </Avatar>
          <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
            Welcome Back
          </Typography>
          <Typography variant="body2" sx={{ color: 'gray', mb: 2 }}>
            Please login to your account
          </Typography>

          <form onSubmit={handleLogin}>
            <Stack spacing={2}>
              <TextField
                label="Email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                fullWidth
              />
              <TextField
                label="Password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: '#2ebf91',
                  py: 1.5,
                  fontWeight: 'bold',
                  '&:hover': { bgcolor: '#29a67a' },
                }}
                fullWidth
              >
                Login
              </Button>
              <Button
                variant="text"
                onClick={() => navigate('/register')}
                fullWidth
              >
                Don't have an account? Register
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
