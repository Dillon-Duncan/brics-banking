import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = ({ loggedInAccountNumber }) => {
  return (
    <div className="dashboard-container">
      <h1>User Dashboard</h1>
      <p>Welcome, your account number is: {loggedInAccountNumber}</p>
      <div className="dashboard-buttons">
        <Link to="/user/dashboard/transaction">
          <button className="dashboard-button">User Transaction</button>
        </Link>
        <Link to="/user/dashboard/history">
          <button className="dashboard-button">User History</button>
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;

