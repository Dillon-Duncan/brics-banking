import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';

const AdminHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLatestTransactions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/transactions/latest', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setTransactions(response.data);
            } catch (error) {
                setError('Error fetching latest transactions');
                console.error('Error fetching latest transactions:', error);
            }
        };

        fetchLatestTransactions();
    }, []);

    return (
        <div className="history-container">
            <h1>Admin History</h1>
            {error && <p className="error">{error}</p>}
            <div className="scrollable-list">
                <ListGroup as="ol" numbered>
                    {transactions.map(transaction => (
                        <ListGroup.Item as="li" key={transaction._id}>
                            {transaction.fromAccount} to {transaction.toAccount} - {transaction.amount} {transaction.currency} - {transaction.status}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        </div>
    );
};

export default AdminHistory;

