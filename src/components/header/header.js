import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand to="/user/login">BRICS BANKING</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to='/user/login'>User Login</Nav.Link>
                        <Nav.Link as={Link} to='/user/register'>User Register</Nav.Link>

                        <Nav.Link as={Link} to='/user/dashboard'>User Dashboard</Nav.Link>
                        <Nav.Link as={Link} to='/user/dashboard/transaction'>User Transaction</Nav.Link>
                        <Nav.Link as={Link} to='/user/dashboard/history'>User History</Nav.Link>

                        <Nav.Link as={Link} to='/admin/login'>Admin Login</Nav.Link>

                        <Nav.Link as={Link} to='/admin/dashboard'>Admin Dashboard</Nav.Link>
                        <Nav.Link as={Link} to='/admin/dashboard/approve'>Admin Approve</Nav.Link>
                        <Nav.Link as={Link} to='/admin/dashboard/history'>Admin History</Nav.Link>



                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
