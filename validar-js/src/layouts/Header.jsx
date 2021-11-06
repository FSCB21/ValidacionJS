import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import logo from "../img/Logo.png"

const Header = () => {
    return (
        <Navbar bg="info" variant="light">
            <Container>
                
                <Link className="navbar-brand" to="/">
                    <img
                    alt="Logo"
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    />
                    <b className="font-monospace">SurtiPapas</b>
                </Link>
                
                <Nav className="me-auto">
                    <Link className="nav-link" to="/productos">Productos</Link>
                </Nav>
                
            </Container>
        </Navbar>
    )
}

export default Header
