import React from 'react';
import { Box, Typography, Paper, Stack } from '@mui/material';

export default function TransactionHistory({ transactions }) {
  if (!transactions.length) {
    return (
      <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
        No transactions available.
      </Typography>
    );
  }

  return (
    <Stack spacing={2}>
      {transactions.map((tx, index) => {
        const typeName = tx.type?.name || tx.transactionType || tx.type || 'Unknown';
        const amount = tx.amount ?? 0;
        const timestamp = tx.timestamp ? new Date(tx.timestamp).toLocaleString() : 'Unknown time';

        return (
          <Paper
            key={index}
            elevation={3}
            sx={{
              p: 2,
              borderRadius: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              bgcolor: index % 2 === 0 ? 'grey.50' : 'grey.100',
              '&:hover': {
                boxShadow: 6,
                transform: 'scale(1.01)',
                transition: 'all 0.2s ease-in-out',
              },
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                flex: '1 1 30%',
                textTransform: 'capitalize',
              }}
            >
              {typeName}
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 'bold',
                color: typeName.toLowerCase().includes('debit') ? 'error.main' : 'success.main',
                flex: '1 1 30%',
                textAlign: 'center',
              }}
            >
              ${amount.toFixed(2)}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                flex: '1 1 40%',
                textAlign: 'right',
                fontSize: '0.85rem',
              }}
            >
              {timestamp}
            </Typography>
          </Paper>
        );
      })}
    </Stack>
  );
}
