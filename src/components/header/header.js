import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand to="/user/login">BRICS BANKING</Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to='/user/login' className='nav-link'>User Login</Nav.Link>
                        <Nav.Link as={Link} to='/user/register' className='nav-link'>User Register</Nav.Link>

                        <Nav.Link as={Link} to='/user/dashboard' className='nav-link'>User Dashboard</Nav.Link>
                        <Nav.Link as={Link} to='/user/dashboard/transaction' className='nav-link'>User Transaction</Nav.Link>
                        <Nav.Link as={Link} to='/user/dashboard/history' className='nav-link'>User History</Nav.Link>

                        <Nav.Link as={Link} to='/admin/login' className='nav-link-admin'>Admin Login</Nav.Link>

                        <Nav.Link as={Link} to='/admin/dashboard' className='nav-link-admin'>Admin Dashboard</Nav.Link>
                        <Nav.Link as={Link} to='/admin/dashboard/approve' className='nav-link-admin'>Admin Approve</Nav.Link>
                        <Nav.Link as={Link} to='/admin/dashboard/history' className='nav-link-admin'>Admin History</Nav.Link>



                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
