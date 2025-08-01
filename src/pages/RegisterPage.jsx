import React, { useState } from 'react';
import { TextField, Button, Stack, Container, Typography } from '@mui/material';
import api from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent page reload
        try {
            await api.post('/auth/register', { email, username, password });
            alert('Registered successfully! Please log in.');
            navigate('/');
        } catch (error) {
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom mt={4}>
                Register
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
                        autoComplete="username"  // Optional
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                        fullWidth
                    />

                    <TextField
                        label="Password"
                        type="password"
                        autoComplete="new-password"  // Suggests a new password
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        fullWidth
                    />

                    <Button type="submit" variant="contained">
                        Register
                    </Button>
                    <Button variant="text" onClick={() => navigate('/')}>
                        Back to Login
                    </Button>
                </Stack>
            </form>
        </Container>
    );
}
