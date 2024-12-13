import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';

const AdminApprove = () => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPendingTransactions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/transactions/pending', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
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
            await axios.put(`http://localhost:5000/api/transactions/${id}/status`, { status: 'Approved' }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
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
            await axios.put(`http://localhost:5000/api/transactions/${id}/status`, { status: 'Rejected' }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setTransactions(transactions.map(transaction => 
                transaction._id === id ? { ...transaction, status: 'Rejected' } : transaction
            ));
        } catch (error) {
            setError('Error rejecting transaction');
            console.error('Error rejecting transaction:', error);
        }
    };

    return (
        <div className="approve-container">
            <h1>Admin Approve</h1>
            {error && <p className="error">{error}</p>}
            <ListGroup as="ol" numbered>
                {transactions.map(transaction => (
                    <ListGroup.Item as="li" key={transaction._id}>
                        {transaction.fromAccount} to {transaction.toAccount} - {transaction.amount} {transaction.currency} - {transaction.status}
                        {transaction.status === 'Pending' && (
                            <div className="action-buttons">
                                <button onClick={() => handleApprove(transaction._id)} className="approve-button">Approve</button>
                                <button onClick={() => handleReject(transaction._id)} className="reject-button">Reject</button>
                            </div>
                        )}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default AdminApprove;
