import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { logout } from '../../services/services';



const Header = () => {

    const user = JSON.parse(localStorage.getItem("user"));
    const userFullName = user ? user.person.firstname + " " + user.person.lastName : null;

    return (
        <>
            {/*  <div className="bg-primary">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#"><Logo logo="Projaz Electronics"></Logo></a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <form className="d-flex flex-grow-1">
                                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                </form>
                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-center">
                                    {!userFullName && <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Account
                                        </a>
                                        <ul className="dropdown-menu text-center bg-light" aria-labelledby="navbarDropdown">
                                            <li><a className="dropdown-item" href="#">Login</a></li>
                                            <li><a className="dropdown-item" href="#">Sign Up</a></li>
                                        </ul>
                                    </li>}
                                    {userFullName && <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {userFullName}
                                        </a>
                                        <ul className="dropdown-menu text-center bg-light" aria-labelledby="navbarDropdown">
                                            <li><a className="dropdown-item" href="#">Orders</a></li>
                                            <li><a className="dropdown-item" href="#">Log out</a></li>
                                        </ul>
                                    </li>}
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Carrito</a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div> */}


            <Navbar bg="primary" expand='lg' className="mb-3" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="/">Electronics Ecommerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${'lg'}`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${'lg'}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${'lg'}`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>
                                Options
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href="/">Home</Nav.Link>
                                {userFullName && (
                                    <NavDropdown
                                        title={userFullName}
                                        id={`offcanvasNavbarDropdown-expand-${'lg'}`}
                                    >
                                        < NavDropdown.Item href="/account">Account</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={logout}>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                )}
                                {!userFullName && (
                                    <NavDropdown
                                        title='Account'
                                        id={`offcanvasNavbarDropdown-expand-${'lg'}`}
                                    >
                                        < NavDropdown.Item href="/login">Login</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href='/signup'>
                                            SignUp
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                )}


                            </Nav>
                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-light">Search</Button>
                            </Form>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar >

        </>
    );
}

export default Header;