import React from 'react';
import { Box, Typography } from '@mui/material';

export default function TransactionHistory({ transactions }) {
  return (
    <Box>
      <Typography variant="h6">Transaction History</Typography>
      {transactions.map((tx, index) => (
        <Box key={index} p={1} borderBottom="1px solid #ccc">
          <Typography>
            {tx.type.name} - ${tx.amount} - {new Date(tx.timestamp).toLocaleString()}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
