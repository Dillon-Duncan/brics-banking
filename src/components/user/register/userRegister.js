import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {
  const [username, setUsername] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currency, setCurrency] = useState('ZAR');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users', { username, accountNumber, email, password, currency });
      navigate('/user/login');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="register-container">
      <h1>User Registration</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            pattern="^[a-zA-Z0-9_]{3,15}$"
            title="Username should be 3-15 characters long and can contain letters, numbers, and underscores."
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group">
          <label>Account Number:</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
            pattern="^\d{10}$"
            title="Account number should be exactly 10 digits."
            placeholder="Enter your account number"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            title="Password must be at least 8 characters long and contain at least one letter and one number."
            placeholder="Enter your password"
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
        <button type="submit" className="submit-button">Register</button>
      </form>
    </div>
  );
};

export default UserRegister;

