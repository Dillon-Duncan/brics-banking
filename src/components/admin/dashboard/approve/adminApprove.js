import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminApprove = () => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPendingTransactions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/transactions/pending');
                setTransactions(response.data);
            } catch (error) {
                setError('Error fetching pending transactions');
                console.error('Error fetching pending transactions:', error);
            }
        };

        fetchPendingTransactions();
    }, []);

    const handleApprove = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/transactions/${id}/status`, { status: 'Approved' });
            setTransactions(transactions.map(transaction => 
                transaction._id === id ? { ...transaction, status: 'Approved' } : transaction
            ));
        } catch (error) {
            setError('Error approving transaction');
            console.error('Error approving transaction:', error);
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/transactions/${id}/status`, { status: 'Rejected' });
            setTransactions(transactions.map(transaction => 
                transaction._id === id ? { ...transaction, status: 'Rejected' } : transaction
            ));
        } catch (error) {
            setError('Error rejecting transaction');
            console.error('Error rejecting transaction:', error);
        }
    };

    return (
        <div>
            <h1>Admin Approve</h1>
            {error && <p>{error}</p>}
            <ul>
                {transactions.map(transaction => (
                    <li key={transaction._id}>
                        {transaction.fromAccount} to {transaction.toAccount} - {transaction.amount} {transaction.currency} - {transaction.status}
                        {transaction.status === 'Pending' && (
                            <div>
                                <button onClick={() => handleApprove(transaction._id)}>Approve</button>
                                <button onClick={() => handleReject(transaction._id)}>Reject</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminApprove;
