import { Outlet, Link } from "react-router-dom";
import React from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import PropTypes from 'prop-types'

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

  const Layout = ({ isLogged, setIsLogged }) => {

    function onLogout(){
      localStorage.setItem('isLogged', JSON.stringify(false));
      setIsLogged(false);
    }

  return (
    <>
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="/">QUIZZ MASTER</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              { isLogged ? (<Nav className="me-auto">
                <Nav.Link href="game">Nueva Partida</Nav.Link>
                <Nav.Link href="stats">Estadísticas</Nav.Link>
              </Nav>) : <Nav className="me-auto"></Nav>
              }
              <Nav>
                <Nav.Link href={`${apiEndpoint}/api-doc`} target="_blanck">API</Nav.Link>
              </Nav>
              <Nav>
                {isLogged ? (
                  <Nav.Link onClick={onLogout}>Cerrar sesión</Nav.Link>
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

Layout.propTypes = {
  isLogged: PropTypes.bool,
  setIsLogged: PropTypes.func
}

export default Layout;