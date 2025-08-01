# 💻 Simple Finance Web App

This is a full-stack web application that allows users to manage their account balance, pay bills, transfer funds, and view transaction history.

## 🚀 Features

### 🔐 User Account
- Register and log in securely.
- Authentication is handled using token-based authentication.

### 💰 Account Top-Up
- Users can simulate a balance top-up by entering an amount.
- No real payment gateway used.

### 🧾 Pay Bills
- Users can select from hardcoded billers:
  - Electricity (10% charge)
  - Water (5% charge)
  - Internet (no extra charge)
- Bills are paid from user balance, charges applied accordingly.

### 🔄 Fund Transfer
- Transfer funds to another registered user using their email address.
- Sender and recipient balances are updated, and transactions saved.

### 📊 Transaction History
- Displays a history of all transactions:
  - Top-ups
  - Bill payments
  - Fund transfers

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Material UI (MUI)
- Axios
- SweetAlert2 for notifications
---
