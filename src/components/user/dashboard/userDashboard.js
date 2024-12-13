import React from 'react';

const UserDashboard = ({ loggedInAccountNumber }) => {
  return (
    <div>
      <h1>User Dashboard</h1>
      <p>Welcome, your account number is: {loggedInAccountNumber}</p>
    </div>
  );
};

export default UserDashboard;

