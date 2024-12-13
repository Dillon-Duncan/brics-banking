import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to BRICS BANKING</h1>
            <div className="home-buttons">
                <Link to="/user/login">
                    <button className="home-button">User Login</button>
                </Link>
                <Link to="/admin/login">
                    <button className="home-button">Admin Login</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
