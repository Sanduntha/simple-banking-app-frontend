import React, { useState } from 'react';
import { TextField, Button, Stack, Container, Typography } from '@mui/material';
import api from '../api/axiosInstance';
import { saveToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent form reload
        try {
            const res = await api.post('/auth/login', { email, password });
            saveToken(res.data); // Save token in localStorage/sessionStorage
            alert('Login successful!');
            navigate('/dashboard');
        } catch (error) {
            alert('Login failed. Check your credentials.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom mt={4}>
                Login
            </Typography>

            <form onSubmit={handleLogin}>
                <Stack spacing={2}>
                    <TextField
                        label="Email"
                        type="email"
                        autoComplete="email"  // Add this line
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        fullWidth
                    />

                    <TextField
                        label="Password"
                        type="password"
                        autoComplete="current-password"  // Add this line
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        fullWidth
                    />

                    <Button type="submit" variant="contained">
                        Login
                    </Button>
                    <Button variant="text" onClick={() => navigate('/register')}>
                        Don't have an account? Register
                    </Button>
                </Stack>
            </form>
        </Container>
    );
}
