import { Outlet, Link } from "react-router-dom";
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';

const Layout = () => {
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
                <Nav.Link href="login">Inicia Sesión</Nav.Link>
                <Nav.Link href="register">Regístrate</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

      <Outlet />
    </>
  )
};

export default Layout;