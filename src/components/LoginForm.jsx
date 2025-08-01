import React, { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';
import api from '../api/axiosInstance';
import { saveToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { email, password });
      saveToken(res.data);
      alert('Login successful');
      navigate('/dashboard');
    } catch {
      alert('Login failed');
    }
  };

  return (
    <Stack spacing={2}>
      <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <Button variant="contained" onClick={handleLogin}>Login</Button>
      <Button variant="outlined" onClick={() => navigate('/register')}>Register</Button>
    </Stack>
  );
}
