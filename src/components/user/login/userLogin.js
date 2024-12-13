import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogin = ({ setLoggedInAccountNumber }) => {
  const [username, setUsername] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { username, accountNumber, password });
      setLoggedInAccountNumber(accountNumber);
      navigate('/user/dashboard');
    } catch (err) {
      setError('Invalid username, account number, or password');
    }
  };

  return (
    <div className="login-container">
      <h1>User Login</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
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
        <button type="submit" className="submit-button">Login</button>
      </form>
    </div>
  );
};

export default UserLogin;

