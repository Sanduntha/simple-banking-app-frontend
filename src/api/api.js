import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

export const api = axios.create({
  baseURL: API_BASE,
});

// Example function
export const login = (email, password) =>
  api.post('/auth/login', { email, password });

export const register = (email, password) =>
  api.post('/auth/register', { email, password, username: email });

export const topUp = (token, amount) =>
  api.post('/transactions/topup', { amount }, {
    headers: { Authorization: `Bearer ${token}` }
  });

// Add similar functions for payBill, transferFunds, getTransactions
