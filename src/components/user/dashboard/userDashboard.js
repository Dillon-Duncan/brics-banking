import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = ({ loggedInAccountNumber }) => {
  return (
    <div>
      <h1>User Dashboard</h1>
      <p>Welcome, your account number is: {loggedInAccountNumber}</p>
      <div>
        <Link to="/user/dashboard/transaction">
          <button>User Transaction</button>
        </Link>
        <Link to="/user/dashboard/history">
          <button>User History</button>
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;

