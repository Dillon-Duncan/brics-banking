import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import UserHistory from './components/user/dashboard/history/userHistory';
import UserTransaction from './components/user/dashboard/transaction/userTransaction';
import UserDashboard from './components/user/dashboard/userDashboard';
import UserLogin from './components/user/login/userLogin';
import UserRegister from './components/user/register/userRegister';

import AdminApprove from './components/admin/dashboard/approve/adminApprove';
import AdminHistory from './components/admin/dashboard/history/adminHistory';
import AdminDashboard from './components/admin/dashboard/adminDashboard';
import AdminLogin from './components/admin/login/adminLogin';

import Header from './components/header/header';
import Home from './components/home/home';

import NoMatch from './components/nomatch/noMatch';

function App() {
  const [loggedInAccountNumber, setLoggedInAccountNumber] = useState(null);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/login" element={<UserLogin setLoggedInAccountNumber={setLoggedInAccountNumber} />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/dashboard" element={<UserDashboard loggedInAccountNumber={loggedInAccountNumber} />} />
        <Route path="/user/dashboard/history" element={<UserHistory loggedInAccountNumber={loggedInAccountNumber} />} />
        <Route path="/user/dashboard/transaction" element={<UserTransaction loggedInAccountNumber={loggedInAccountNumber} />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/dashboard/approve" element={<AdminApprove />} />
        <Route path="/admin/dashboard/history" element={<AdminHistory />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
