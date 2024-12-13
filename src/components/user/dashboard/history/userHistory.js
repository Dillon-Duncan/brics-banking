import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';

const UserHistory = ({ loggedInAccountNumber }) => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!loggedInAccountNumber) {
        setError('Logged in account number is undefined');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:5000/api/transactions/user/${loggedInAccountNumber}/latest`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
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
      <div className="scrollable-list">
        <ListGroup as="ol" numbered>
          {transactions.map((transaction) => (
            <ListGroup.Item as="li" key={transaction._id}>
              <div className="transaction-details">
                <span className="transaction-from">From: {transaction.fromAccount}</span>
                <span className="transaction-to">To: {transaction.toAccount}</span>
                <span className="transaction-amount">Amount: {transaction.amount} {transaction.currency}</span>
                <span className="transaction-status">Status: {transaction.status}</span>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
};

export default UserHistory;

