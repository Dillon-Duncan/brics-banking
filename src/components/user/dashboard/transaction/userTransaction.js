import React, { useState } from 'react';
import axios from 'axios';

const UserTransaction = ({ loggedInAccountNumber }) => {
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('ZAR');
  const [swiftCode, setSwiftCode] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

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
    <div>
      <h1>User Transaction</h1>
      {status && <p>{status}</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Recipient Account Number:</label>
          <input type="text" value={toAccount} onChange={(e) => setToAccount(e.target.value)} required />
        </div>
        <div>
          <label>Amount:</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </div>
        <div>
          <label>Currency:</label>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)} required>
            <option value="ZAR">ZAR</option>
            <option value="BRL">BRL</option>
            <option value="RUB">RUB</option>
            <option value="INR">INR</option>
            <option value="CNY">CNY</option>
          </select>
        </div>
        <div>
          <label>SWIFT Code:</label>
          <input type="text" value={swiftCode} onChange={(e) => setSwiftCode(e.target.value)} required />
        </div>
        <button type="submit">Submit Transaction</button>
      </form>
    </div>
  );
};

export default UserTransaction;

