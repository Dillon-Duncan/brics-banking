import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './header.css';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleBrandClick = () => {
        if (location.pathname.startsWith('/user')) {
            navigate('/user/dashboard');
        } else if (location.pathname.startsWith('/admin')) {
            navigate('/admin/dashboard');
        } else {
            navigate('/');
        }
    };

    const handleLogout = () => {
        // Clear any authentication tokens or user data here
        navigate('/');
    };

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand onClick={handleBrandClick} style={{ cursor: 'pointer' }}>BRICS BANKING</Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to='/user/register' className='nav-link'>Register</Nav.Link>
                        <Nav.Link onClick={handleLogout} className='nav-link logout-link'>Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
