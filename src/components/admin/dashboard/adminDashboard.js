import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <Link to="/admin/dashboard/history">
          <button>Admin History</button>
        </Link>
        <Link to="/admin/dashboard/approve">
          <button>Admin Approve</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;

