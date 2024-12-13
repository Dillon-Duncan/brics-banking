import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-buttons">
        <Link to="/admin/dashboard/history">
          <button className="dashboard-button">Admin History</button>
        </Link>
        <Link to="/admin/dashboard/approve">
          <button className="dashboard-button">Admin Approve</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;

