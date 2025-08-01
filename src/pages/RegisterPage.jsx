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
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { email, username, password });
      Swal.fire({
        icon: 'success',
        title: 'Registered Successfully!',
        text: 'You can now log in.',
        timer: 1500,
        showConfirmButton: false,
      });
      navigate('/');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'User already exists or invalid input.',
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
            Create Account
          </Typography>
          <Typography variant="body2" sx={{ color: 'gray', mb: 2 }}>
            Register to access the dashboard
          </Typography>

          <form onSubmit={handleRegister}>
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
                label="Username"
                autoComplete="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                fullWidth
              />
              <TextField
                label="Password"
                type="password"
                autoComplete="new-password"
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
                Register
              </Button>
              <Button
                variant="text"
                onClick={() => navigate('/')}
                fullWidth
              >
                Already have an account? Login
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
