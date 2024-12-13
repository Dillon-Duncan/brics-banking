import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserTransaction = ({ loggedInAccountNumber }) => {
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('ZAR');
  const [swiftCode, setSwiftCode] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const transaction = {
        fromAccount: loggedInAccountNumber,
        toAccount,
        amount,
        currency,
        swiftCode,
        status: 'Pending',
      };
      await axios.post('http://localhost:5000/api/transactions', transaction);
      setStatus('Transaction submitted successfully');
    } catch (err) {
      setError('Error submitting transaction');
    }
  };

  return (
    <div className="transaction-container">
      <h1>User Transaction</h1>
      {status && <p className="status">{status}</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="transaction-form">
        <div className="form-group">
          <label>Recipient Account Number:</label>
          <input
            type="text"
            value={toAccount}
            onChange={(e) => setToAccount(e.target.value)}
            required
            pattern="^\d{10}$"
            title="Account number should be exactly 10 digits."
            placeholder="Enter recipient account number"
          />
        </div>
        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="1"
            step="0.01"
            title="Amount should be a positive number."
            placeholder="Enter amount"
          />
        </div>
        <div className="form-group">
          <label>Currency:</label>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)} required>
            <option value="ZAR">ZAR</option>
            <option value="BRL">BRL</option>
            <option value="RUB">RUB</option>
            <option value="INR">INR</option>
            <option value="CNY">CNY</option>
          </select>
        </div>
        <div className="form-group">
          <label>SWIFT Code:</label>
          <input
            type="text"
            value={swiftCode}
            onChange={(e) => setSwiftCode(e.target.value)}
            required
            pattern="^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$"
            title="SWIFT code should be 8 or 11 characters long and contain only uppercase letters and numbers."
            placeholder="Enter SWIFT code"
          />
        </div>
        <button type="submit" className="submit-button">Submit Transaction</button>
      </form>
    </div>
  );
};

export default UserTransaction;

