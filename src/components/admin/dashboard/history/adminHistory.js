import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLatestTransactions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/transactions/latest');
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
            <ul className="transaction-list">
                {transactions.map(transaction => (
                    <li key={transaction._id} className="transaction-item">
                        {transaction.fromAccount} to {transaction.toAccount} - {transaction.amount} {transaction.currency} - {transaction.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminHistory;

