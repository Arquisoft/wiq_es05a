import { Outlet, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';



  const Layout = ({ isLogged, setIsLogged }) => {

    function onLogout(){
      localStorage.setItem('isLogged', JSON.stringify(false));
      setIsLogged(false);
    }

    
  return (
    <>
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="/">WIQ 5A</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="stats">Estadísticas</Nav.Link>
              </Nav>
              <Nav>
                {isLogged ? (
                  <>
                  <Nav.Link onClick={onLogout}>Cerrar sesión</Nav.Link>
                  </>
                ) : (
                  <>
                  <Link to="login" className="nav-link">Inicia Sesión</Link>
                  <Link to="register" className="nav-link">Regístrate</Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

      <Outlet />
    </>
  )
};

export default Layout;