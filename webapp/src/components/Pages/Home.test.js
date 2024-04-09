import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Home from './Home';
import { BrowserRouter as Router } from "react-router-dom";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  }));

describe('Home component', () => {
  it('renders "INICIA SESIÓN" and "REGÍSTRATE" buttons when not logged in', () => {
    const { getByText } = render(<Router><Home isLogged={false} /></Router>);
    
    // Verifica que el título del juego esté presente
    expect(getByText('WIQ 5A')).toBeInTheDocument();

    // Verifica que los botones "INICIA SESIÓN" y "REGÍSTRATE" estén presentes
    expect(getByText('INICIA SESIÓN')).toBeInTheDocument();
    expect(getByText('REGÍSTRATE')).toBeInTheDocument();
  });

  it('renders "JUGAR" and "ESTADÍSTICAS" buttons when logged in', () => {
    const { getByText } = render(<Router><Home isLogged={true} /></Router>);
    
    // Verifica que el título del juego esté presente
    expect(getByText('WIQ 5A')).toBeInTheDocument();

    // Verifica que los botones "JUGAR" y "ESTADÍSTICAS" estén presentes
    expect(getByText('JUGAR')).toBeInTheDocument();
    expect(getByText('ESTADÍSTICAS')).toBeInTheDocument();
  });

  it('clicking "INICIA SESIÓN" button navigates to "/login"', () => {
    const { getByText } = render(<Router><Home isLogged={false} /></Router>);
    const button = getByText('INICIA SESIÓN');
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('clicking "REGÍSTRATE" button navigates to "/register"', () => {
    const { getByText } = render(<Router><Home isLogged={false} /></Router>);
    const button = getByText('REGÍSTRATE');
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith('/register');
  });

  it('clicking "JUGAR" button navigates to "/game"', () => {
    const { getByText } = render(<Router><Home isLogged={true} /></Router>);
    const button = getByText('JUGAR');
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith('/game');
  });

  it('clicking "ESTADÍSTICAS" button navigates to "/stats"', () => {
    const { getByText } = render(<Router><Home isLogged={true} /></Router>);
    const button = getByText('ESTADÍSTICAS');
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith('/stats');
  })

});