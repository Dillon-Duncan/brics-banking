import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserHistory = ({ loggedInAccountNumber }) => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!loggedInAccountNumber) {
        setError('Logged in account number is undefined');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:5000/api/transactions/user/${loggedInAccountNumber}/latest`);
        setTransactions(response.data);
      } catch (err) {
        setError('Error fetching transactions');
      }
    };

    fetchTransactions();
  }, [loggedInAccountNumber]);

  return (
    <div className="history-container">
      <h1>User History</h1>
      {error && <p className="error">{error}</p>}
      <ul className="transaction-list">
        {transactions.map((transaction) => (
          <li key={transaction._id} className="transaction-item">
            From: {transaction.fromAccount} - To: {transaction.toAccount} - Amount: {transaction.amount} {transaction.currency} - Status: {transaction.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserHistory;

