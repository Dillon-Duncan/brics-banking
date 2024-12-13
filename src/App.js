import './App.css';
import { Route, Routes } from 'react-router-dom';

import UserHistory from './components/user/dashboard/history/userHistory';
import UserTransaction from './components/user/dashboard/transaction/userTransaction';
import UserDashboard from './components/user/dashboard/userDashboard';
import UserLogin from './components/user/login/userLogin';
import UserRegister from './components/user/register/userRegister';

import AdminApprove from './components/admin/dashboard/aprrove/adminApprove';
import AdminHistory from './components/admin/dashboard/history/adminHistory';
import AdminDashboard from './components/admin/dashboard/adminDashboard';
import AdminLogin from './components/admin/login/adminLogin';

import Header from './components/header/header';

import NoMatch from './components/nomatch/noMatch';

function App() {
  return (
    <>
    <Header />
    <Routes>
      
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/user/register" element={<UserRegister />} />
      
      <Route path="/user/dashboard" element={<UserDashboard />} />
      <Route path="/user/dashboard/history" element={<UserHistory />} />
      <Route path="/user/dashboard/transaction" element={<UserTransaction />} />
      
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
